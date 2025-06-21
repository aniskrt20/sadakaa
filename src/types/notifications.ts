
export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[];
  actions?: NotificationAction[];
  timestamp?: number;
}

export interface NotificationSettings {
  enabled: boolean;
  prayerAlerts: boolean;
  reminderAlerts: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}
