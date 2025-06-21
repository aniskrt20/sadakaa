class StoragePermissionService {
  private static instance: StoragePermissionService;
  
  private constructor() {}
  
  static getInstance(): StoragePermissionService {
    if (!StoragePermissionService.instance) {
      StoragePermissionService.instance = new StoragePermissionService();
    }
    return StoragePermissionService.instance;
  }

  // التحقق من دعم Storage API
  isStorageAPISupported(): boolean {
    return 'storage' in navigator && 'persist' in navigator.storage;
  }

  // التحقق من حالة الصلاحيات الحالية
  async getStoragePermissionStatus(): Promise<{
    persistent: boolean;
    quota: number;
    usage: number;
    available: number;
  }> {
    try {
      const estimate = await navigator.storage.estimate();
      const persistent = await navigator.storage.persisted();
      
      const quota = estimate.quota || 0;
      const usage = estimate.usage || 0;
      const available = quota - usage;
      
      return {
        persistent,
        quota,
        usage,
        available
      };
    } catch (error) {
      console.error('خطأ في الحصول على حالة التخزين:', error);
      return {
        persistent: false,
        quota: 0,
        usage: 0,
        available: 0
      };
    }
  }

  // طلب صلاحيات التخزين المستمر
  async requestPersistentStorage(): Promise<boolean> {
    try {
      if (!this.isStorageAPISupported()) {
        console.warn('Storage API غير مدعوم في هذا المتصفح');
        return false;
      }

      // التحقق من الحالة الحالية
      const isPersistent = await navigator.storage.persisted();
      if (isPersistent) {
        console.log('التخزين المستمر مفعل بالفعل');
        return true;
      }

      // طلب التخزين المستمر
      const granted = await navigator.storage.persist();
      
      if (granted) {
        console.log('تم منح صلاحيات التخزين المستمر');
        localStorage.setItem('storage-permission-granted', 'true');
        localStorage.setItem('storage-permission-date', new Date().toISOString());
      } else {
        console.log('تم رفض صلاحيات التخزين المستمر');
        localStorage.setItem('storage-permission-granted', 'false');
      }
      
      return granted;
    } catch (error) {
      console.error('خطأ في طلب صلاحيات التخزين:', error);
      return false;
    }
  }

  // تقدير المساحة المطلوبة لتحميل سورة
  estimateChapterSize(versesCount: number): number {
    // تقدير تقريبي: كل آية تحتاج حوالي 500 بايت (نص عربي + بيانات وصفية)
    const averageBytesPerVerse = 500;
    const chapterMetadata = 1000; // بيانات السورة الأساسية
    
    return (versesCount * averageBytesPerVerse) + chapterMetadata;
  }

  // تقدير المساحة المطلوبة لتحميل عدة سور
  estimateMultipleChaptersSize(chapters: Array<{ verses_count: number }>): number {
    return chapters.reduce((total, chapter) => {
      return total + this.estimateChapterSize(chapter.verses_count);
    }, 0);
  }

  // التحقق من توفر مساحة كافية
  async checkAvailableSpace(requiredBytes: number): Promise<{
    hasEnoughSpace: boolean;
    availableBytes: number;
    requiredBytes: number;
    shortageBytes: number;
  }> {
    try {
      const status = await this.getStoragePermissionStatus();
      const hasEnoughSpace = status.available >= requiredBytes;
      const shortageBytes = hasEnoughSpace ? 0 : requiredBytes - status.available;
      
      return {
        hasEnoughSpace,
        availableBytes: status.available,
        requiredBytes,
        shortageBytes
      };
    } catch (error) {
      console.error('خطأ في التحقق من المساحة المتاحة:', error);
      return {
        hasEnoughSpace: false,
        availableBytes: 0,
        requiredBytes,
        shortageBytes: requiredBytes
      };
    }
  }

  // تنسيق حجم البيانات للعرض
  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 بايت';
    
    const k = 1024;
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // تنظيف البيانات القديمة لتوفير مساحة
  async cleanupOldData(): Promise<number> {
    try {
      let freedBytes = 0;
      
      // تنظيف cache القديم
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const cacheName of cacheNames) {
          if (cacheName.includes('old') || cacheName.includes('temp')) {
            await caches.delete(cacheName);
            freedBytes += 1024 * 1024; // تقدير 1MB لكل cache
          }
        }
      }
      
      // تنظيف localStorage من البيانات القديمة
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('temp-') || key.includes('cache-'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        freedBytes += 1024; // تقدير 1KB لكل مفتاح
      });
      
      console.log(`تم تنظيف ${this.formatBytes(freedBytes)} من البيانات القديمة`);
      return freedBytes;
    } catch (error) {
      console.error('خطأ في تنظيف البيانات القديمة:', error);
      return 0;
    }
  }

  // التحقق من إمكانية التحميل مع التنظيف التلقائي
  async canDownloadWithCleanup(requiredBytes: number): Promise<{
    canDownload: boolean;
    needsCleanup: boolean;
    availableAfterCleanup: number;
  }> {
    const spaceCheck = await this.checkAvailableSpace(requiredBytes);
    
    if (spaceCheck.hasEnoughSpace) {
      return {
        canDownload: true,
        needsCleanup: false,
        availableAfterCleanup: spaceCheck.availableBytes
      };
    }
    
    // محاولة التنظيف
    const freedBytes = await this.cleanupOldData();
    const newSpaceCheck = await this.checkAvailableSpace(requiredBytes);
    
    return {
      canDownload: newSpaceCheck.hasEnoughSpace,
      needsCleanup: true,
      availableAfterCleanup: newSpaceCheck.availableBytes
    };
  }

  // إعداد مراقب لاستخدام التخزين
  setupStorageMonitoring(): void {
    // مراقبة دورية لاستخدام التخزين
    setInterval(async () => {
      try {
        const status = await this.getStoragePermissionStatus();
        const usagePercentage = (status.usage / status.quota) * 100;
        
        // تحذير عند امتلاء 80% من المساحة
        if (usagePercentage > 80) {
          console.warn(`تحذير: تم استخدام ${usagePercentage.toFixed(1)}% من مساحة التخزين`);
          
          // إشعار المستخدم
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('تحذير مساحة التخزين', {
              body: `تم استخدام ${usagePercentage.toFixed(1)}% من مساحة التخزين. قد تحتاج لحذف بعض البيانات.`,
              icon: '/lovable-uploads/e28c9759-fede-434b-bb05-27c249e13798.png'
            });
          }
        }
      } catch (error) {
        console.error('خطأ في مراقبة التخزين:', error);
      }
    }, 5 * 60 * 1000); // كل 5 دقائق
  }
}

export const storagePermissionService = StoragePermissionService.getInstance();