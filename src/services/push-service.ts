
class PushService {
  isPushSupported(): boolean {
    return 'serviceWorker' in navigator && 
           'PushManager' in window && 
           'Notification' in window;
  }

  // تسجيل اشتراك Push
  async subscribeToPush(): Promise<PushSubscription | null> {
    try {
      if (!this.isPushSupported()) {
        console.warn('Push notifications not supported');
        return null;
      }

      const registration = await navigator.serviceWorker.ready;
      
      let subscription = await registration.pushManager.getSubscription();
      
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            'your-vapid-public-key' // استبدل بـ VAPID key الخاص بك
          )
        });
        
        console.log('New push subscription created');
      } else {
        console.log('Using existing push subscription');
      }
      
      localStorage.setItem('push-subscription', JSON.stringify(subscription));
      
      return subscription;
      
    } catch (error) {
      console.error('Failed to subscribe to push:', error);
      return null;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const pushService = new PushService();
