
import { NotificationSettings } from '@/types/notifications';

class SettingsService {
  updateNotificationSettings(settings: NotificationSettings): void {
    localStorage.setItem('notification-settings', JSON.stringify({
      ...settings,
      lastUpdated: new Date().toISOString()
    }));
    
    console.log('Notification settings updated:', settings);
  }

  getNotificationSettings(): NotificationSettings {
    const defaultSettings: NotificationSettings = {
      enabled: true,
      prayerAlerts: true,
      reminderAlerts: true,
      soundEnabled: true,
      vibrationEnabled: true
    };

    try {
      const saved = localStorage.getItem('notification-settings');
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Failed to get notification settings:', error);
    }

    return defaultSettings;
  }
}

export const settingsService = new SettingsService();
