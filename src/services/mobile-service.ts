
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';

export class MobileService {
  private static instance: MobileService;

  private constructor() {
    this.initializeMobileFeatures();
  }

  static getInstance(): MobileService {
    if (!MobileService.instance) {
      MobileService.instance = new MobileService();
    }
    return MobileService.instance;
  }

  private async initializeMobileFeatures() {
    if (Capacitor.isNativePlatform()) {
      await this.setupStatusBar();
      await this.hideSplashScreen();
      this.setupAppListeners();
    }
  }

  private async setupStatusBar() {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#059669' });
    } catch (error) {
      console.warn('StatusBar not available:', error);
    }
  }

  private async hideSplashScreen() {
    try {
      // إخفاء شاشة البداية بعد تحميل التطبيق
      setTimeout(async () => {
        await SplashScreen.hide();
      }, 2000);
    } catch (error) {
      console.warn('SplashScreen not available:', error);
    }
  }

  private setupAppListeners() {
    // مراقبة حالة التطبيق
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    // مراقبة الروابط العميقة
    App.addListener('appUrlOpen', (event) => {
      console.log('App opened via URL:', event.url);
    });

    // مراقبة زر الرجوع في Android
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  }

  isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  getPlatform(): string {
    return Capacitor.getPlatform();
  }
}

export const mobileService = MobileService.getInstance();
