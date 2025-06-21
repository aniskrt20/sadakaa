import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { 
  HardDrive, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Download,
  Trash2,
  RefreshCw
} from "lucide-react";
import { storagePermissionService } from "@/services/storage-permission-service";
import { useToast } from "@/components/ui/use-toast";

interface StoragePermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPermissionGranted?: () => void;
  requiredSpace?: number;
  estimatedDownloadSize?: number;
}

const StoragePermissionDialog: React.FC<StoragePermissionDialogProps> = ({
  open,
  onOpenChange,
  onPermissionGranted,
  requiredSpace = 0,
  estimatedDownloadSize = 0
}) => {
  const [storageStatus, setStorageStatus] = useState({
    persistent: false,
    quota: 0,
    usage: 0,
    available: 0
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadStorageStatus();
      setIsSupported(storagePermissionService.isStorageAPISupported());
    }
  }, [open]);

  const loadStorageStatus = async () => {
    try {
      const status = await storagePermissionService.getStoragePermissionStatus();
      setStorageStatus(status);
    } catch (error) {
      console.error('خطأ في تحميل حالة التخزين:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل معلومات التخزين",
        variant: "destructive"
      });
    }
  };

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const granted = await storagePermissionService.requestPersistentStorage();
      
      if (granted) {
        toast({
          title: "تم منح الصلاحيات",
          description: "تم منح صلاحيات التخزين المستمر بنجاح",
        });
        
        await loadStorageStatus();
        onPermissionGranted?.();
      } else {
        toast({
          title: "تم رفض الصلاحيات",
          description: "لم يتم منح صلاحيات التخزين المستمر. قد يتم حذف البيانات المحملة عند إغلاق المتصفح.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء طلب صلاحيات التخزين",
        variant: "destructive"
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCleanupStorage = async () => {
    setIsCleaning(true);
    try {
      const freedBytes = await storagePermissionService.cleanupOldData();
      
      toast({
        title: "تم التنظيف",
        description: `تم تحرير ${storagePermissionService.formatBytes(freedBytes)} من المساحة`,
      });
      
      await loadStorageStatus();
    } catch (error) {
      toast({
        title: "خطأ في التنظيف",
        description: "حدث خطأ أثناء تنظيف البيانات القديمة",
        variant: "destructive"
      });
    } finally {
      setIsCleaning(false);
    }
  };

  const usagePercentage = storageStatus.quota > 0 ? (storageStatus.usage / storageStatus.quota) * 100 : 0;
  const hasEnoughSpace = storageStatus.available >= requiredSpace;

  if (!isSupported) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl flex items-center gap-3">
              <AlertTriangle className="text-orange-500" size={24} />
              غير مدعوم
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <p className="text-gray-600">
                  متصفحك لا يدعم Storage API. ستعمل ميزة التحميل بدون اتصال ولكن قد يتم حذف البيانات عند إغلاق المتصفح.
                </p>
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              متابعة بدون صلاحيات
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-xl flex items-center gap-3">
            <Shield className="text-blue-500" size={24} />
            صلاحيات التخزين
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* حالة الصلاحيات الحالية */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">حالة التخزين المستمر</h3>
                <div className="flex items-center gap-2">
                  {storageStatus.persistent ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="text-green-600 font-medium">مفعل</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="text-orange-500" size={20} />
                      <span className="text-orange-600 font-medium">غير مفعل</span>
                    </>
                  )}
                </div>
              </div>
              
              {!storageStatus.persistent && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-orange-800">
                    بدون التخزين المستمر، قد يتم حذف البيانات المحملة عند إغلاق المتصفح أو عند امتلاء الذاكرة.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* معلومات استخدام المساحة */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <HardDrive className="text-blue-500" size={20} />
                <h3 className="font-semibold">استخدام مساحة التخزين</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>المستخدم: {storagePermissionService.formatBytes(storageStatus.usage)}</span>
                  <span>المتاح: {storagePermissionService.formatBytes(storageStatus.available)}</span>
                </div>
                
                <Progress value={usagePercentage} className="w-full" />
                
                <div className="text-xs text-gray-500 text-center">
                  {usagePercentage.toFixed(1)}% من {storagePermissionService.formatBytes(storageStatus.quota)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* معلومات التحميل المطلوب */}
          {estimatedDownloadSize > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="text-purple-500" size={20} />
                  <h3 className="font-semibold">معلومات التحميل</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>حجم التحميل المقدر:</span>
                    <span className="font-medium">{storagePermissionService.formatBytes(estimatedDownloadSize)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>المساحة المطلوبة:</span>
                    <span className="font-medium">{storagePermissionService.formatBytes(requiredSpace)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>حالة المساحة:</span>
                    <span className={`font-medium ${hasEnoughSpace ? 'text-green-600' : 'text-red-600'}`}>
                      {hasEnoughSpace ? 'متوفرة' : 'غير كافية'}
                    </span>
                  </div>
                </div>
                
                {!hasEnoughSpace && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                    <p className="text-sm text-red-800">
                      المساحة المتاحة غير كافية. يرجى تنظيف البيانات القديمة أو تحرير مساحة إضافية.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* أزرار التحكم */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!storageStatus.persistent && (
              <Button
                onClick={handleRequestPermission}
                disabled={isRequesting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isRequesting ? (
                  <>
                    <RefreshCw className="animate-spin ml-2" size={16} />
                    جاري الطلب...
                  </>
                ) : (
                  <>
                    <Shield className="ml-2" size={16} />
                    طلب صلاحيات التخزين
                  </>
                )}
              </Button>
            )}
            
            <Button
              onClick={handleCleanupStorage}
              disabled={isCleaning}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              {isCleaning ? (
                <>
                  <RefreshCw className="animate-spin ml-2" size={16} />
                  جاري التنظيف...
                </>
              ) : (
                <>
                  <Trash2 className="ml-2" size={16} />
                  تنظيف البيانات القديمة
                </>
              )}
            </Button>
            
            <Button
              onClick={loadStorageStatus}
              variant="outline"
              className="border-gray-300"
            >
              <RefreshCw className="ml-2" size={16} />
              تحديث المعلومات
            </Button>
            
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              إغلاق
            </Button>
          </div>

          {/* نصائح للمستخدم */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">نصائح لإدارة التخزين:</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• منح صلاحيات التخزين المستمر يضمن عدم حذف البيانات المحملة</li>
                <li>• تنظيف البيانات القديمة بانتظام يحرر مساحة إضافية</li>
                <li>• يمكنك حذف السور المحملة من إدارة التحميل عند عدم الحاجة إليها</li>
                <li>• التطبيق يعمل بدون صلاحيات ولكن قد تفقد البيانات المحملة</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoragePermissionDialog;