import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  HardDrive,
  Wifi,
  WifiOff,
  RefreshCw,
  Database,
  Check,
  Shield
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { offlineStorageService } from "@/services/offline-storage-service";
import { storagePermissionService } from "@/services/storage-permission-service";
import { useQuranApiChapters } from "@/services/api/quranApiService";
import StoragePermissionDialog from "@/components/storage/StoragePermissionDialog";

interface DownloadProgress {
  chapterId: number;
  chapterName: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
}

interface OfflineDownloadManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OfflineDownloadManager: React.FC<OfflineDownloadManagerProps> = ({
  open,
  onOpenChange
}) => {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [downloadedChapters, setDownloadedChapters] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [storageInfo, setStorageInfo] = useState({ used: 0, quota: 0 });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isValidating, setIsValidating] = useState(false);
  const [storagePermissionOpen, setStoragePermissionOpen] = useState(false);
  const [estimatedDownloadSize, setEstimatedDownloadSize] = useState(0);
  
  const { data: chaptersData, isLoading } = useQuranApiChapters();
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (open) {
      loadDownloadedChapters();
      loadStorageInfo();
      validateDatabase();
    }
  }, [open]);

  useEffect(() => {
    // حساب حجم التحميل المقدر عند تغيير السور المختارة
    if (chaptersData?.chapters && selectedChapters.length > 0) {
      const selectedChapterData = chaptersData.chapters.filter(chapter => 
        selectedChapters.includes(chapter.id)
      );
      const estimatedSize = storagePermissionService.estimateMultipleChaptersSize(selectedChapterData);
      setEstimatedDownloadSize(estimatedSize);
    } else {
      setEstimatedDownloadSize(0);
    }
  }, [selectedChapters, chaptersData]);

  const validateDatabase = async () => {
    setIsValidating(true);
    try {
      const isValid = await offlineStorageService.validateDatabase();
      if (!isValid) {
        toast({
          title: "تحذير",
          description: "قد تكون هناك مشكلة في قاعدة البيانات المحلية",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('خطأ في التحقق من قاعدة البيانات:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const loadDownloadedChapters = async () => {
    try {
      const downloaded = await offlineStorageService.getDownloadedChapters();
      console.log('السور المحملة:', downloaded);
      setDownloadedChapters(downloaded);
      
      // التحقق من صحة البيانات المحملة
      const validChapters = [];
      for (const chapterId of downloaded) {
        const isValid = await offlineStorageService.isChapterDownloaded(chapterId);
        if (isValid) {
          validChapters.push(chapterId);
        }
      }
      
      if (validChapters.length !== downloaded.length) {
        console.log('تحديث قائمة السور المحملة بعد التحقق');
        await offlineStorageService.updateDownloadedChapters(validChapters);
        setDownloadedChapters(validChapters);
      }
      
    } catch (error) {
      console.error('خطأ في تحميل قائمة السور المحملة:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل قائمة السور المحملة",
        variant: "destructive"
      });
    }
  };

  const loadStorageInfo = async () => {
    try {
      const info = await offlineStorageService.getStorageSize();
      setStorageInfo(info);
    } catch (error) {
      console.error('خطأ في تحميل معلومات التخزين:', error);
    }
  };

  const handleChapterSelect = (chapterId: number, checked: boolean) => {
    if (checked) {
      setSelectedChapters(prev => [...prev, chapterId]);
    } else {
      setSelectedChapters(prev => prev.filter(id => id !== chapterId));
    }
  };

  const handleSelectAll = () => {
    if (!chaptersData?.chapters) return;
    
    const allChapterIds = chaptersData.chapters.map(chapter => chapter.id);
    const undownloadedChapters = allChapterIds.filter(id => !downloadedChapters.includes(id));
    
    if (selectedChapters.length === undownloadedChapters.length) {
      setSelectedChapters([]);
    } else {
      setSelectedChapters(undownloadedChapters);
    }
  };

  const checkStorageBeforeDownload = async () => {
    if (selectedChapters.length === 0) {
      toast({
        title: "لم يتم اختيار سور",
        description: "يرجى اختيار السور التي تريد تحميلها",
        variant: "destructive"
      });
      return false;
    }

    if (!isOnline) {
      toast({
        title: "لا يوجد اتصال بالإنترنت",
        description: "يرجى التأكد من الاتصال بالإنترنت لتحميل السور",
        variant: "destructive"
      });
      return false;
    }

    // التحقق من المساحة المتاحة
    const spaceCheck = await storagePermissionService.checkAvailableSpace(estimatedDownloadSize);
    
    if (!spaceCheck.hasEnoughSpace) {
      // محاولة التنظيف التلقائي
      const cleanupResult = await storagePermissionService.canDownloadWithCleanup(estimatedDownloadSize);
      
      if (!cleanupResult.canDownload) {
        toast({
          title: "مساحة غير كافية",
          description: `تحتاج إلى ${storagePermissionService.formatBytes(spaceCheck.shortageBytes)} إضافية`,
          variant: "destructive"
        });
        
        // فتح نافذة إدارة التخزين
        setStoragePermissionOpen(true);
        return false;
      }
    }

    // التحقق من صلاحيات التخزين المستمر
    const storageStatus = await storagePermissionService.getStoragePermissionStatus();
    if (!storageStatus.persistent) {
      // فتح نافذة طلب الصلاحيات
      setStoragePermissionOpen(true);
      return false;
    }

    return true;
  };

  const handleDownload = async () => {
    const canProceed = await checkStorageBeforeDownload();
    if (!canProceed) return;

    setIsDownloading(true);
    setOverallProgress(0);

    try {
      await offlineStorageService.downloadMultipleChapters(
        selectedChapters,
        (overall, current) => {
          setOverallProgress(overall);
          setDownloadProgress(current);
        }
      );

      toast({
        title: "تم التحميل بنجاح",
        description: `تم تحميل ${selectedChapters.length} سورة للاستخدام بدون اتصال`,
      });

      setSelectedChapters([]);
      await loadDownloadedChapters();
      await loadStorageInfo();

    } catch (error) {
      console.error('خطأ في التحميل:', error);
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل السور. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
      setDownloadProgress(null);
      setOverallProgress(0);
    }
  };

  const handleDeleteChapter = async (chapterId: number) => {
    try {
      await offlineStorageService.deleteChapter(chapterId);
      await loadDownloadedChapters();
      await loadStorageInfo();
      
      toast({
        title: "تم الحذف",
        description: "تم حذف السورة من التخزين المحلي",
      });
    } catch (error) {
      console.error('خطأ في الحذف:', error);
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء حذف السورة",
        variant: "destructive"
      });
    }
  };

  const handleClearAll = async () => {
    try {
      await offlineStorageService.clearAllData();
      await loadDownloadedChapters();
      await loadStorageInfo();
      
      toast({
        title: "تم مسح جميع البيانات",
        description: "تم حذف جميع السور المحملة",
      });
    } catch (error) {
      console.error('خطأ في المسح:', error);
      toast({
        title: "خطأ في المسح",
        description: "حدث خطأ أثناء مسح البيانات",
        variant: "destructive"
      });
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const chapters = chaptersData?.chapters || [];
  const undownloadedChapters = chapters.filter(chapter => !downloadedChapters.includes(chapter.id));

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl flex items-center gap-3">
              <Download className="text-blue-500" size={24} />
              إدارة التحميل للاستخدام بدون اتصال
              {isValidating && <RefreshCw className="animate-spin text-gray-400" size={16} />}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* معلومات الحالة */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isOnline ? (
                      <Wifi className="text-green-500" size={20} />
                    ) : (
                      <WifiOff className="text-red-500" size={20} />
                    )}
                    <span className="font-medium">
                      {isOnline ? "متصل" : "غير متصل"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">حالة الاتصال</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="font-medium">{downloadedChapters.length}</span>
                  </div>
                  <p className="text-sm text-gray-600">سورة محملة</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <HardDrive className="text-blue-500" size={20} />
                    <span className="font-medium">{formatBytes(storageInfo.used)}</span>
                  </div>
                  <p className="text-sm text-gray-600">مساحة مستخدمة</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Database className="text-purple-500" size={20} />
                    <span className="font-medium">{chapters.length}</span>
                  </div>
                  <p className="text-sm text-gray-600">إجمالي السور</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="text-orange-500" size={20} />
                    <span className="font-medium text-xs">صلاحيات</span>
                  </div>
                  <p className="text-sm text-gray-600">التخزين</p>
                </CardContent>
              </Card>
            </div>

            {/* معلومات التحميل المقدر */}
            {estimatedDownloadSize > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">حجم التحميل المقدر</p>
                      <p className="text-sm text-gray-600">{selectedChapters.length} سورة مختارة</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        {storagePermissionService.formatBytes(estimatedDownloadSize)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* شريط التحميل */}
            {isDownloading && (
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">التقدم الإجمالي</span>
                      <span className="text-sm text-gray-600">{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} className="w-full" />
                    
                    {downloadProgress && (
                      <div className="flex items-center gap-2 text-sm">
                        {downloadProgress.status === 'downloading' && (
                          <RefreshCw className="animate-spin" size={16} />
                        )}
                        {downloadProgress.status === 'completed' && (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                        {downloadProgress.status === 'error' && (
                          <AlertCircle className="text-red-500" size={16} />
                        )}
                        <span>
                          {downloadProgress.chapterName} - {downloadProgress.progress}%
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* أزرار التحكم */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleSelectAll}
                variant="outline"
                disabled={isDownloading || undownloadedChapters.length === 0}
              >
                {selectedChapters.length === undownloadedChapters.length ? "إلغاء تحديد الكل" : "تحديد الكل"}
              </Button>
              
              <Button
                onClick={() => setStoragePermissionOpen(true)}
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <Shield size={16} className="ml-2" />
                إدارة صلاحيات التخزين
              </Button>
              
              <Button
                onClick={handleDownload}
                disabled={isDownloading || selectedChapters.length === 0 || !isOnline}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Download size={16} className="ml-2" />
                تحميل السور المختارة ({selectedChapters.length})
              </Button>
              
              <Button
                onClick={loadDownloadedChapters}
                variant="outline"
                disabled={isDownloading}
              >
                <RefreshCw size={16} className="ml-2" />
                تحديث القائمة
              </Button>
              
              <Button
                onClick={handleClearAll}
                variant="destructive"
                disabled={isDownloading || downloadedChapters.length === 0}
              >
                <Trash2 size={16} className="ml-2" />
                مسح جميع البيانات
              </Button>
            </div>

            {/* قائمة السور */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">السور المتاحة للتحميل</h3>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
                  <p>جاري تحميل قائمة السور...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {chapters.map((chapter) => {
                    const isDownloaded = downloadedChapters.includes(chapter.id);
                    const isSelected = selectedChapters.includes(chapter.id);
                    
                    return (
                      <Card key={chapter.id} className={`${isDownloaded ? 'bg-green-50 border-green-200' : ''}`}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {!isDownloaded && (
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={(checked) => 
                                    handleChapterSelect(chapter.id, checked as boolean)
                                  }
                                  disabled={isDownloading}
                                />
                              )}
                              
                              <div>
                                <h4 className="font-medium arabic-text">{chapter.name_arabic}</h4>
                                <p className="text-sm text-gray-600">
                                  {chapter.translated_name.name} • {chapter.verses_count} آية
                                </p>
                                <p className="text-xs text-gray-500">
                                  حجم مقدر: {storagePermissionService.formatBytes(
                                    storagePermissionService.estimateChapterSize(chapter.verses_count)
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {isDownloaded ? (
                                <>
                                  <div className="flex items-center gap-1 text-green-600">
                                    <Check size={16} />
                                    <span className="text-xs">محملة</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteChapter(chapter.id)}
                                    disabled={isDownloading}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </>
                              ) : (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  غير محملة
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* نافذة صلاحيات التخزين */}
      <StoragePermissionDialog
        open={storagePermissionOpen}
        onOpenChange={setStoragePermissionOpen}
        onPermissionGranted={() => {
          setStoragePermissionOpen(false);
          // يمكن المتابعة مع التحميل الآن
          if (selectedChapters.length > 0) {
            handleDownload();
          }
        }}
        requiredSpace={estimatedDownloadSize}
        estimatedDownloadSize={estimatedDownloadSize}
      />
    </>
  );
};

export default OfflineDownloadManager;