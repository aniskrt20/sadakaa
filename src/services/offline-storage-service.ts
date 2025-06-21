interface OfflineQuranData {
  chapters: any[];
  verses: { [chapterId: number]: any[] };
  lastUpdated: string;
  downloadedChapters: number[];
}

interface DownloadProgress {
  chapterId: number;
  chapterName: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
}

class OfflineStorageService {
  private dbName = 'QuranOfflineDB';
  private dbVersion = 2; // زيادة رقم الإصدار
  private db: IDBDatabase | null = null;

  async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => {
        console.error('خطأ في فتح قاعدة البيانات:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        console.log('تم فتح قاعدة البيانات بنجاح');
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        console.log('تحديث قاعدة البيانات...');
        
        // حذف المخازن القديمة إذا كانت موجودة
        if (db.objectStoreNames.contains('chapters')) {
          db.deleteObjectStore('chapters');
        }
        if (db.objectStoreNames.contains('verses')) {
          db.deleteObjectStore('verses');
        }
        if (db.objectStoreNames.contains('metadata')) {
          db.deleteObjectStore('metadata');
        }
        
        // إنشاء مخزن للسور
        const chaptersStore = db.createObjectStore('chapters', { keyPath: 'id' });
        chaptersStore.createIndex('name', 'name_arabic', { unique: false });
        
        // إنشاء مخزن للآيات
        const versesStore = db.createObjectStore('verses', { keyPath: 'chapterId' });
        versesStore.createIndex('chapterId', 'chapterId', { unique: true });
        
        // إنشاء مخزن للبيانات الوصفية
        const metadataStore = db.createObjectStore('metadata', { keyPath: 'key' });
        
        console.log('تم إنشاء مخازن قاعدة البيانات');
      };
    });
  }

  async ensureDBReady(): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }
  }

  async saveChapter(chapter: any): Promise<void> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['chapters'], 'readwrite');
      const store = transaction.objectStore('chapters');
      
      // تأكد من وجود البيانات المطلوبة
      const chapterData = {
        id: chapter.id,
        name_arabic: chapter.name_arabic || `السورة ${chapter.id}`,
        name_simple: chapter.name_simple || chapter.englishName || '',
        translated_name: chapter.translated_name || { name: '' },
        verses_count: chapter.verses_count || chapter.numberOfAyahs || 0,
        revelation_place: chapter.revelation_place || chapter.revelationType || 'makkah',
        bismillah_pre: chapter.bismillah_pre !== false,
        savedAt: new Date().toISOString()
      };
      
      const request = store.put(chapterData);
      
      request.onsuccess = () => {
        console.log(`تم حفظ السورة ${chapter.id} بنجاح`);
        resolve();
      };
      
      request.onerror = () => {
        console.error(`خطأ في حفظ السورة ${chapter.id}:`, request.error);
        reject(request.error);
      };
    });
  }

  async saveVerses(chapterId: number, verses: any[]): Promise<void> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['verses'], 'readwrite');
      const store = transaction.objectStore('verses');
      
      const versesData = {
        chapterId,
        verses: verses.map(verse => ({
          id: verse.id || verse.numberInSurah,
          text_uthmani: verse.text_uthmani || verse.text,
          text_simple: verse.text_simple || verse.text,
          verse_key: verse.verse_key || `${chapterId}:${verse.id || verse.numberInSurah}`,
          juz_number: verse.juz_number || verse.juz || 1,
          page_number: verse.page_number || verse.page || 1
        })),
        savedAt: new Date().toISOString()
      };
      
      const request = store.put(versesData);
      
      request.onsuccess = () => {
        console.log(`تم حفظ آيات السورة ${chapterId} بنجاح (${verses.length} آية)`);
        resolve();
      };
      
      request.onerror = () => {
        console.error(`خطأ في حفظ آيات السورة ${chapterId}:`, request.error);
        reject(request.error);
      };
    });
  }

  async getChapter(chapterId: number): Promise<any | null> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['chapters'], 'readonly');
      const store = transaction.objectStore('chapters');
      const request = store.get(chapterId);
      
      request.onsuccess = () => {
        const result = request.result;
        console.log(`استرجاع السورة ${chapterId}:`, result ? 'موجودة' : 'غير موجودة');
        resolve(result || null);
      };
      
      request.onerror = () => {
        console.error(`خطأ في استرجاع السورة ${chapterId}:`, request.error);
        reject(request.error);
      };
    });
  }

  async getVerses(chapterId: number): Promise<any[] | null> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['verses'], 'readonly');
      const store = transaction.objectStore('verses');
      const request = store.get(chapterId);
      
      request.onsuccess = () => {
        const result = request.result;
        const verses = result ? result.verses : null;
        console.log(`استرجاع آيات السورة ${chapterId}:`, verses ? `${verses.length} آية` : 'غير موجودة');
        resolve(verses);
      };
      
      request.onerror = () => {
        console.error(`خطأ في استرجاع آيات السورة ${chapterId}:`, request.error);
        reject(request.error);
      };
    });
  }

  async getDownloadedChapters(): Promise<number[]> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['metadata'], 'readonly');
      const store = transaction.objectStore('metadata');
      const request = store.get('downloadedChapters');
      
      request.onsuccess = () => {
        const result = request.result;
        const chapters = result ? result.value : [];
        console.log('السور المحملة:', chapters);
        resolve(chapters);
      };
      
      request.onerror = () => {
        console.error('خطأ في استرجاع قائمة السور المحملة:', request.error);
        resolve([]); // إرجاع مصفوفة فارغة في حالة الخطأ
      };
    });
  }

  async updateDownloadedChapters(chapterIds: number[]): Promise<void> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['metadata'], 'readwrite');
      const store = transaction.objectStore('metadata');
      
      const data = {
        key: 'downloadedChapters',
        value: [...new Set(chapterIds)], // إزالة التكرارات
        lastUpdated: new Date().toISOString()
      };
      
      const request = store.put(data);
      
      request.onsuccess = () => {
        console.log('تم تحديث قائمة السور المحملة:', chapterIds);
        resolve();
      };
      
      request.onerror = () => {
        console.error('خطأ في تحديث قائمة السور المحملة:', request.error);
        reject(request.error);
      };
    });
  }

  async downloadChapter(chapterId: number, onProgress?: (progress: number) => void): Promise<void> {
    try {
      console.log(`بدء تحميل السورة ${chapterId}`);
      onProgress?.(5);

      // التحقق من وجود السورة مسبقاً
      const existingChapter = await this.getChapter(chapterId);
      if (existingChapter) {
        console.log(`السورة ${chapterId} موجودة مسبقاً`);
        onProgress?.(100);
        return;
      }

      onProgress?.(10);
      
      // تحميل بيانات السورة من API الأساسي
      let chapterData, versesData;
      
      try {
        console.log(`تحميل بيانات السورة ${chapterId} من API الأساسي`);
        const chapterResponse = await fetch(`https://api.quranapi.pages.dev/chapters/${chapterId}/verses`);
        
        if (!chapterResponse.ok) {
          throw new Error('فشل API الأساسي');
        }
        
        const data = await chapterResponse.json();
        chapterData = data.chapter;
        versesData = data.verses;
        
        onProgress?.(60);
        
      } catch (error) {
        console.log('فشل API الأساسي، استخدام API البديل...');
        
        // استخدام API البديل
        const fallbackResponse = await fetch(`https://api.alquran.cloud/v1/surah/${chapterId}/quran-uthmani`);
        if (!fallbackResponse.ok) {
          throw new Error('فشل في جميع مصادر البيانات');
        }
        
        const fallbackData = await fallbackResponse.json();
        const surah = fallbackData.data;
        
        // تحويل البيانات إلى التنسيق المطلوب
        chapterData = {
          id: surah.number,
          name_arabic: surah.name,
          name_simple: surah.englishName,
          translated_name: { name: surah.englishNameTranslation },
          verses_count: surah.ayahs.length,
          revelation_place: surah.revelationType.toLowerCase(),
          bismillah_pre: surah.number !== 1 && surah.number !== 9
        };
        
        versesData = surah.ayahs.map(ayah => ({
          id: ayah.numberInSurah,
          text_uthmani: ayah.text,
          text_simple: ayah.text,
          verse_key: `${surah.number}:${ayah.numberInSurah}`,
          juz_number: ayah.juz,
          page_number: ayah.page
        }));
        
        onProgress?.(60);
      }
      
      if (!chapterData || !versesData) {
        throw new Error('لم يتم الحصول على البيانات');
      }
      
      onProgress?.(70);
      
      // حفظ البيانات محلياً
      await this.saveChapter(chapterData);
      onProgress?.(85);
      
      await this.saveVerses(chapterId, versesData);
      onProgress?.(95);
      
      // تحديث قائمة السور المحملة
      const downloadedChapters = await this.getDownloadedChapters();
      if (!downloadedChapters.includes(chapterId)) {
        downloadedChapters.push(chapterId);
        await this.updateDownloadedChapters(downloadedChapters);
      }
      
      onProgress?.(100);
      console.log(`تم تحميل السورة ${chapterId} بنجاح`);
      
    } catch (error) {
      console.error(`خطأ في تحميل السورة ${chapterId}:`, error);
      throw new Error(`فشل في تحميل السورة ${chapterId}: ${error.message}`);
    }
  }

  async downloadMultipleChapters(
    chapterIds: number[], 
    onProgress?: (overall: number, current: DownloadProgress) => void
  ): Promise<void> {
    const total = chapterIds.length;
    let completed = 0;
    
    console.log(`بدء تحميل ${total} سورة`);
    
    for (let i = 0; i < chapterIds.length; i++) {
      const chapterId = chapterIds[i];
      const overallProgress = Math.round((completed / total) * 100);
      
      try {
        onProgress?.(overallProgress, {
          chapterId,
          chapterName: `السورة ${chapterId}`,
          progress: 0,
          status: 'downloading'
        });
        
        await this.downloadChapter(chapterId, (progress) => {
          onProgress?.(overallProgress, {
            chapterId,
            chapterName: `السورة ${chapterId}`,
            progress,
            status: 'downloading'
          });
        });
        
        completed++;
        
        onProgress?.(Math.round((completed / total) * 100), {
          chapterId,
          chapterName: `السورة ${chapterId}`,
          progress: 100,
          status: 'completed'
        });
        
      } catch (error) {
        console.error(`فشل تحميل السورة ${chapterId}:`, error);
        onProgress?.(overallProgress, {
          chapterId,
          chapterName: `السورة ${chapterId}`,
          progress: 0,
          status: 'error'
        });
      }
    }
    
    onProgress?.(100, {
      chapterId: 0,
      chapterName: 'اكتمل التحميل',
      progress: 100,
      status: 'completed'
    });
    
    console.log(`تم الانتهاء من تحميل ${completed} من ${total} سورة`);
  }

  async isChapterDownloaded(chapterId: number): Promise<boolean> {
    try {
      const downloadedChapters = await this.getDownloadedChapters();
      const isDownloaded = downloadedChapters.includes(chapterId);
      
      // التحقق الإضافي من وجود البيانات فعلياً
      if (isDownloaded) {
        const chapter = await this.getChapter(chapterId);
        const verses = await this.getVerses(chapterId);
        return !!(chapter && verses && verses.length > 0);
      }
      
      return false;
    } catch (error) {
      console.error(`خطأ في التحقق من تحميل السورة ${chapterId}:`, error);
      return false;
    }
  }

  async deleteChapter(chapterId: number): Promise<void> {
    await this.ensureDBReady();
    
    return new Promise(async (resolve, reject) => {
      try {
        const transaction = this.db!.transaction(['chapters', 'verses', 'metadata'], 'readwrite');
        
        // حذف السورة
        transaction.objectStore('chapters').delete(chapterId);
        
        // حذف الآيات
        transaction.objectStore('verses').delete(chapterId);
        
        transaction.oncomplete = async () => {
          try {
            // تحديث قائمة السور المحملة
            const downloadedChapters = await this.getDownloadedChapters();
            const updatedChapters = downloadedChapters.filter(id => id !== chapterId);
            await this.updateDownloadedChapters(updatedChapters);
            
            console.log(`تم حذف السورة ${chapterId} بنجاح`);
            resolve();
          } catch (error) {
            console.error(`خطأ في تحديث قائمة السور بعد الحذف:`, error);
            resolve(); // نكمل حتى لو فشل تحديث القائمة
          }
        };
        
        transaction.onerror = () => {
          console.error(`خطأ في حذف السورة ${chapterId}:`, transaction.error);
          reject(transaction.error);
        };
        
      } catch (error) {
        console.error(`خطأ في حذف السورة ${chapterId}:`, error);
        reject(error);
      }
    });
  }

  async clearAllData(): Promise<void> {
    await this.ensureDBReady();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['chapters', 'verses', 'metadata'], 'readwrite');
      
      let completed = 0;
      const total = 3;
      
      const checkComplete = () => {
        completed++;
        if (completed === total) {
          console.log('تم مسح جميع البيانات المحلية');
          resolve();
        }
      };
      
      transaction.objectStore('chapters').clear().onsuccess = checkComplete;
      transaction.objectStore('verses').clear().onsuccess = checkComplete;
      transaction.objectStore('metadata').clear().onsuccess = checkComplete;
      
      transaction.onerror = () => {
        console.error('خطأ في مسح البيانات:', transaction.error);
        reject(transaction.error);
      };
    });
  }

  async getStorageSize(): Promise<{ used: number; quota: number }> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          quota: estimate.quota || 0
        };
      }
    } catch (error) {
      console.error('خطأ في حساب حجم التخزين:', error);
    }
    
    return { used: 0, quota: 0 };
  }

  // دالة للتحقق من صحة قاعدة البيانات
  async validateDatabase(): Promise<boolean> {
    try {
      await this.ensureDBReady();
      
      // اختبار بسيط للتأكد من عمل قاعدة البيانات
      const transaction = this.db!.transaction(['metadata'], 'readonly');
      const store = transaction.objectStore('metadata');
      
      return new Promise((resolve) => {
        const request = store.count();
        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(false);
      });
      
    } catch (error) {
      console.error('خطأ في التحقق من قاعدة البيانات:', error);
      return false;
    }
  }
}

export const offlineStorageService = new OfflineStorageService();