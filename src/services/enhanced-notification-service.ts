
import { periodicSyncService } from './periodic-sync-service';
import { ExtendedNotificationOptions, NotificationSettings } from '@/types/notifications';
import { audioService } from './audio-service';
import { pushService } from './push-service';
import { settingsService } from './settings-service';

class EnhancedNotificationService {
  private notificationQueue: Array<{
    title: string;
    body: string;
    timestamp: number;
    options?: ExtendedNotificationOptions;
  }> = [];
  private isServiceWorkerReady = false;

  constructor() {
    this.initializeService();
  }

  // تهيئة الخدمة
  private async initializeService(): Promise<void> {
    try {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.ready;
        this.isServiceWorkerReady = true;
        console.log('Enhanced notification service initialized');
        
        await this.processQueuedNotifications();
      }
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
    }
  }

  // تحقق من دعم الإشعارات المحسن
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  // تحقق من دعم Push Notifications
  isPushSupported(): boolean {
    return pushService.isPushSupported();
  }

  // تحقق من إمكانية تثبيت PWA
  isPWAInstallable(): boolean {
    return 'serviceWorker' in navigator && 
           'BeforeInstallPromptEvent' in window;
  }

  // تحقق من تثبيت PWA
  isPWAInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }

  // الحصول على حالة الإذن مع تفاصيل إضافية
  getPermissionStatus(): {
    permission: NotificationPermission;
    pushSupported: boolean;
    serviceWorkerReady: boolean;
  } {
    return {
      permission: this.isSupported() ? Notification.permission : 'denied',
      pushSupported: this.isPushSupported(),
      serviceWorkerReady: this.isServiceWorkerReady
    };
  }

  // طلب إذن الإشعارات مع إرشادات للمستخدم
  async requestPermission(): Promise<{
    granted: boolean;
    permission: NotificationPermission;
    message: string;
  }> {
    if (!this.isSupported()) {
      return {
        granted: false,
        permission: 'denied',
        message: 'المتصفح لا يدعم الإشعارات'
      };
    }

    if (Notification.permission === 'granted') {
      return {
        granted: true,
        permission: 'granted',
        message: 'الإذن ممنوح مسبقاً'
      };
    }

    if (Notification.permission === 'denied') {
      return {
        granted: false,
        permission: 'denied',
        message: 'تم رفض الإذن. يرجى تفعيل الإشعارات من إعدادات المتصفح'
      };
    }

    try {
      const permission = await Notification.requestPermission();
      
      const result = {
        granted: permission === 'granted',
        permission: permission,
        message: permission === 'granted' 
          ? 'تم منح الإذن بنجاح' 
          : 'تم رفض الإذن'
      };

      localStorage.setItem('notification-permission', permission);
      localStorage.setItem('notification-permission-date', new Date().toISOString());

      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return {
        granted: false,
        permission: 'denied',
        message: 'فشل في طلب الإذن'
      };
    }
  }

  // إرسال إشعار محسن مع retry logic
  async sendNotification(
    title: string, 
    body: string, 
    options: ExtendedNotificationOptions = {}
  ): Promise<boolean> {
    try {
      const permissionResult = await this.requestPermission();
      
      if (!permissionResult.granted) {
        console.warn('Cannot send notification: permission denied');
        return false;
      }

      const notificationOptions: ExtendedNotificationOptions = {
        body,
        icon: '/lovable-uploads/ae3b276d-9725-433a-a054-3ade1f8e843b.png',
        badge: '/lovable-uploads/ae3b276d-9725-433a-a054-3ade1f8e843b.png',
        tag: 'sadaqa-notification',
        requireInteraction: false,
        silent: false,
        dir: 'rtl',
        lang: 'ar',
        timestamp: Date.now(),
        ...options
      };

      if ('vibrate' in navigator && options.vibrate) {
        (notificationOptions as any).vibrate = options.vibrate;
      }

      if (this.isServiceWorkerReady && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SCHEDULE_NOTIFICATION',
          data: {
            title,
            body,
            timestamp: Date.now(),
            options: notificationOptions
          }
        });
      } else {
        const notification = new Notification(title, notificationOptions);
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        
        setTimeout(() => notification.close(), 10000);
      }

      console.log('Notification sent successfully:', title);
      return true;

    } catch (error) {
      console.error('Failed to send notification:', error);
      
      this.notificationQueue.push({
        title,
        body,
        timestamp: Date.now() + 60000,
        options
      });
      
      return false;
    }
  }

  // جدولة إشعار لوقت محدد
  async scheduleNotification(
    title: string, 
    body: string, 
    timestamp: number,
    options: ExtendedNotificationOptions = {}
  ): Promise<boolean> {
    try {
      if (timestamp <= Date.now()) {
        return await this.sendNotification(title, body, options);
      }

      if (this.isServiceWorkerReady && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SCHEDULE_NOTIFICATION',
          data: { title, body, timestamp, options }
        });
        
        console.log(`Notification scheduled for: ${new Date(timestamp).toLocaleString('ar')}`);
        return true;
      } else {
        const delay = timestamp - Date.now();
        setTimeout(() => {
          this.sendNotification(title, body, options);
        }, delay);
        
        return true;
      }
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return false;
    }
  }

  // تشغيل الأذان مع إشعار
  async playAdhan(prayerName: string, prayerNameAr: string): Promise<void> {
    try {
      await this.sendNotification(
        `حان وقت ${prayerNameAr} 🕌`,
        `حان الآن وقت صلاة ${prayerNameAr}. جعلها الله في ميزان حسناتك`,
        {
          tag: 'prayer-time',
          requireInteraction: true,
          vibrate: [200, 100, 200],
          data: {
            type: 'prayer',
            prayer: prayerName,
            prayerAr: prayerNameAr
          }
        }
      );

      await audioService.playAdhanAudio();
      
      console.log(`Adhan played for ${prayerNameAr}`);
    } catch (error) {
      console.error('Error playing adhan:', error);
      
      await this.sendNotification(
        `حان وقت ${prayerNameAr}`,
        `تعذر تشغيل الأذان، لكن حان وقت صلاة ${prayerNameAr}`
      );
    }
  }

  // إيقاف الأذان
  stopAdhan(): void {
    audioService.stopAdhan();
  }

  // معالجة الإشعارات المؤجلة
  private async processQueuedNotifications(): Promise<void> {
    if (this.notificationQueue.length === 0) return;

    const now = Date.now();
    const readyNotifications = this.notificationQueue.filter(n => n.timestamp <= now);
    
    for (const notification of readyNotifications) {
      try {
        await this.sendNotification(
          notification.title, 
          notification.body, 
          notification.options
        );
      } catch (error) {
        console.error('Failed to process queued notification:', error);
      }
    }
    
    this.notificationQueue = this.notificationQueue.filter(n => n.timestamp > now);
  }

  // تسجيل اشتراك Push
  async subscribeToPush(): Promise<PushSubscription | null> {
    return pushService.subscribeToPush();
  }

  // تحديث إعدادات الإشعارات
  updateNotificationSettings(settings: NotificationSettings): void {
    settingsService.updateNotificationSettings(settings);
  }

  // الحصول على إعدادات الإشعارات
  getNotificationSettings(): NotificationSettings {
    return settingsService.getNotificationSettings();
  }

  // تشخيص حالة الإشعارات
  async getDiagnosticInfo(): Promise<{
    browserSupport: boolean;
    permission: NotificationPermission;
    serviceWorkerStatus: string;
    pushSupport: boolean;
    hasSubscription: boolean;
    settings: any;
  }> {
    let serviceWorkerStatus = 'not-supported';
    let hasSubscription = false;

    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        serviceWorkerStatus = registration.active ? 'active' : 'inactive';
        
        if (this.isPushSupported()) {
          const subscription = await registration.pushManager.getSubscription();
          hasSubscription = !!subscription;
        }
      } catch (error) {
        serviceWorkerStatus = 'error';
      }
    }

    return {
      browserSupport: this.isSupported(),
      permission: this.isSupported() ? Notification.permission : 'denied',
      serviceWorkerStatus,
      pushSupport: this.isPushSupported(),
      hasSubscription,
      settings: this.getNotificationSettings()
    };
  }

  // بدء جميع الخدمات
  async startAllServices(): Promise<void> {
    try {
      await periodicSyncService.start();
      console.log('Periodic sync service started');

      await this.subscribeToPush();
      
      console.log('All notification services started successfully');
    } catch (error) {
      console.error('Failed to start notification services:', error);
    }
  }

  // إيقاف جميع الخدمات
  async stopAllServices(): Promise<void> {
    try {
      this.stopAdhan();
      await periodicSyncService.stop();
      this.notificationQueue = [];
      
      console.log('All notification services stopped');
    } catch (error) {
      console.error('Failed to stop notification services:', error);
    }
  }

  // إرسال إشعار تجريبي
  async sendTestNotification(): Promise<boolean> {
    return await this.sendNotification(
      'إشعار تجريبي 🧪',
      'تم تفعيل خدمة الإشعارات بنجاح! يمكنك الآن استقبال تنبيهات أوقات الصلاة والأذكار.',
      {
        tag: 'test-notification',
        requireInteraction: true,
        vibrate: [200, 100, 200]
      }
    );
  }
}

export const enhancedNotificationService = new EnhancedNotificationService();
