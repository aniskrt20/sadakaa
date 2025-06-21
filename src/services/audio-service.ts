
class AudioService {
  private audio: HTMLAudioElement | null = null;

  // تشغيل صوت الأذان
  async playAdhanAudio(): Promise<void> {
    try {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }

      // نستخدم ملف الأذان الجديد
      this.audio = new Audio('/mecca_athan.mp3');
      this.audio.volume = 0.8;
      this.audio.loop = false;
      
      // معالجة أخطاء التشغيل
      this.audio.onerror = (error) => {
        console.error('Adhan audio error:', error);
      };
      
      this.audio.onended = () => {
        console.log('Adhan playback completed');
        this.audio = null;
      };
      
      await this.audio.play();
      
    } catch (error) {
      console.error('Failed to play adhan audio:', error);
      throw error;
    }
  }

  // إيقاف الأذان
  stopAdhan(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      console.log('Adhan stopped');
    }
  }
}

export const audioService = new AudioService();
