import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { mobileService } from './services/mobile-service'
import { storagePermissionService } from './services/storage-permission-service'

// تهيئة خدمات التطبيق المحمول
if (mobileService.isNativePlatform()) {
  console.log('Running on:', mobileService.getPlatform());
}

// تسجيل service workers والمزامنة الدورية
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // تسجيل service worker الرئيسي المحدث
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
        // تم إزالة `updateViaCache: 'none'` لمنع إعادة التحميل المتكرر
      });
      
      console.log('Enhanced SW registered: ', registration);

      // تسجيل Firebase messaging service worker
      try {
        const messagingRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Firebase Messaging SW registered: ', messagingRegistration);
      } catch (firebaseError) {
        console.warn('Firebase Messaging SW registration failed (this is OK if not using Firebase):', firebaseError);
      }
      
      // انتظار تفعيل Service Worker
      await navigator.serviceWorker.ready;
      
      // تهيئة خدمات الإشعارات المحسنة
      const { enhancedNotificationService } = await import('./services/enhanced-notification-service');
      await enhancedNotificationService.startAllServices();
      
      // تهيئة خدمة صلاحيات التخزين
      await storagePermissionService.setupStorageMonitoring();
      
      console.log('All enhanced services initialized successfully');
      
      // إرسال حالة التهيئة للتطبيق
      window.dispatchEvent(new CustomEvent('serviceWorkerReady', {
        detail: { registration, enhanced: true }
      }));
      
    } catch (registrationError) {
      // تحسين معالجة الأخطاء للبيئات التي لا تدعم Service Workers
      const errorMessage = registrationError instanceof Error ? registrationError.message : String(registrationError);
      
      if (errorMessage.includes('StackBlitz') || errorMessage.includes('not yet supported')) {
        console.info('ℹ️ Service Workers are not supported in this development environment (StackBlitz). This is expected and the app will work normally without offline features.');
      } else {
        console.error('SW registration failed: ', registrationError);
      }
      
      // fallback: تهيئة خدمات أساسية بدون service worker
      try {
        const { enhancedNotificationService } = await import('./services/enhanced-notification-service');
        await enhancedNotificationService.requestPermission();
        console.log('Basic notification service initialized as fallback');
      } catch (fallbackError) {
        console.warn('Fallback initialization failed (this is OK in development environments):', fallbackError);
      }
    }
  });

  // معالجة تحديثات Service Worker (تعطيل reload التلقائي)
  let isReloading = false;
  // ❌ تم تعطيل إعادة التحميل التلقائي عند كل تغيير في controller (كان هذا سبب التحديث المستمر)
    // navigator.serviceWorker.addEventListener('controllerchange', () => {
    //   if (isReloading) {
    //     console.log('Reload already triggered, skipping subsequent calls.');
    //     return;
    //   }
    //   isReloading = true;
    //   console.log('Service Worker controller changed - reloading app');
    //   window.location.reload();
    // });

// ✅ يمكنك في المستقبل عمل إشعار أن هناك تحديث متوفر وتسمح للمستخدم بالضغط على زر "تحديث" يدوي فقط إن أردت.


  // معالجة رسائل من Service Worker
  navigator.serviceWorker.addEventListener('message', (event) => {
    const { type, data } = event.data || {};
    
    switch (type) {
      case 'BACKGROUND_SYNC_COMPLETE':
        console.log('Background sync completed at:', new Date(data.timestamp));
        window.dispatchEvent(new CustomEvent('backgroundSyncComplete', { detail: data }));
        break;
        
      case 'PRAYER_TIMES_UPDATED':
        console.log('Prayer times updated from background sync');
        window.dispatchEvent(new CustomEvent('prayerTimesUpdated', { detail: data }));
        break;
        
      case 'CACHE_STATUS':
        console.log('Cache status received:', data);
        window.dispatchEvent(new CustomEvent('cacheStatusUpdate', { detail: data }));
        break;
        
      default:
        console.log('Unknown message from SW:', type, data);
    }
  });

  // معالجة أحداث الشبكة
  window.addEventListener('online', () => {
    console.log('Network restored');
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'MANUAL_SYNC',
        timestamp: Date.now()
      });
    }
  });

  window.addEventListener('offline', () => {
    console.log('Network lost - switching to offline mode');
  });
} else {
  console.info('ℹ️ Service Workers are not supported in this browser/environment. The app will work normally without offline features.');
}

// تهيئة إعدادات PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  console.log('PWA install prompt available');
  
  // حفظ الحدث لاستخدامه لاحقاً
  (window as any).deferredPrompt = e;
  
  // إشعار التطبيق بإمكانية التثبيت
  window.dispatchEvent(new CustomEvent('pwaInstallAvailable'));
});

window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully');
  (window as any).deferredPrompt = null;
  
  // إشعار التطبيق بالتثبيت
  window.dispatchEvent(new CustomEvent('pwaInstalled'));
});

// تشغيل التطبيق
createRoot(document.getElementById("root")!).render(<App />);

console.log('Sadaqa Jariya App v1.2.0 - Enhanced PWA with Storage Permissions initialized');