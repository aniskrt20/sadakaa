
class PeriodicSyncService {
  private isSupported: boolean = false;
  private fallbackInterval: number | null = null;
  
  constructor() {
    this.isSupported = 'serviceWorker' in navigator && 'periodicSync' in window.ServiceWorkerRegistration.prototype;
  }

  // تسجيل المزامنة الدورية
  async registerPeriodicSync(): Promise<void> {
    try {
      if (this.isSupported) {
        const registration = await navigator.serviceWorker.ready;
        
        // تسجيل مزامنة دورية لجلب أوقات الصلاة كل 24 ساعة
        await (registration as any).periodicSync.register('fetch-prayer-times', {
          minInterval: 24 * 60 * 60 * 1000 // 24 ساعة
        });
        
        // تسجيل مزامنة دورية لجلب الأحاديث الجديدة كل 12 ساعة
        await (registration as any).periodicSync.register('fetch-hadith-updates', {
          minInterval: 12 * 60 * 60 * 1000 // 12 ساعة
        });
        
        // تسجيل مزامنة دورية لجلب الأذكار الجديدة كل أسبوع
        await (registration as any).periodicSync.register('fetch-adhkar-updates', {
          minInterval: 7 * 24 * 60 * 60 * 1000 // أسبوع
        });
        
        console.log('Periodic sync registered successfully');
      } else {
        // استخدام fallback مع setInterval للمتصفحات غير المدعومة
        this.setupFallbackSync();
      }
    } catch (error) {
      console.error('Failed to register periodic sync:', error);
      // في حالة فشل التسجيل، استخدم fallback
      this.setupFallbackSync();
    }
  }

  // إعداد مزامنة احتياطية للمتصفحات غير المدعومة
  private setupFallbackSync(): void {
    console.log('Setting up fallback periodic sync');
    
    // تحديث كل 6 ساعات كـ fallback
    this.fallbackInterval = window.setInterval(() => {
      this.triggerManualSync();
    }, 6 * 60 * 60 * 1000); // 6 ساعات
  }

  // تشغيل مزامنة يدوية
  private async triggerManualSync(): Promise<void> {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // إشعار service worker بالتحديث
        navigator.serviceWorker.controller.postMessage({
          type: 'MANUAL_SYNC',
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Manual sync failed:', error);
    }
  }

  // التحقق من دعم المزامنة الدورية
  isPeriodicSyncSupported(): boolean {
    return this.isSupported;
  }

  // إلغاء المزامنة الدورية
  async unregisterPeriodicSync(): Promise<void> {
    try {
      if (this.isSupported) {
        const registration = await navigator.serviceWorker.ready;
        const tags = await (registration as any).periodicSync.getTags();
        
        for (const tag of tags) {
          await (registration as any).periodicSync.unregister(tag);
        }
        
        console.log('Periodic sync unregistered');
      }
      
      if (this.fallbackInterval) {
        clearInterval(this.fallbackInterval);
        this.fallbackInterval = null;
      }
    } catch (error) {
      console.error('Failed to unregister periodic sync:', error);
    }
  }

  // بدء خدمة المزامنة الدورية
  async start(): Promise<void> {
    await this.registerPeriodicSync();
  }

  // إيقاف خدمة المزامنة الدورية
  async stop(): Promise<void> {
    await this.unregisterPeriodicSync();
  }
}

export const periodicSyncService = new PeriodicSyncService();
