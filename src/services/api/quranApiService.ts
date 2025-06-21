
import { useQuery } from "@tanstack/react-query";

// Types for the new Quran API
export interface QuranApiVerse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  text_simple: string;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
  page_number: number;
  words: Array<{
    id: number;
    position: number;
    text_uthmani: string;
    text_simple: string;
    page_number: number;
    line_number: number;
    audio_url?: string;
  }>;
}

export interface QuranApiChapter {
  id: number;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface QuranApiChapterResponse {
  chapter: QuranApiChapter;
  verses: QuranApiVerse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page?: number;
    prev_page?: number;
    total_pages: number;
    total_records: number;
  };
}

export interface QuranApiChaptersResponse {
  chapters: QuranApiChapter[];
}

// Fallback types for alquran.cloud API
interface AlQuranCloudVerse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

interface AlQuranCloudSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: AlQuranCloudVerse[];
}

interface AlQuranCloudResponse {
  code: number;
  status: string;
  data: {
    surahs: AlQuranCloudSurah[];
  };
}

// Base URLs
const QURAN_API_BASE = "https://api.quranapi.pages.dev";
const FALLBACK_API_BASE = "https://api.alquran.cloud/v1";

// Convert AlQuran.cloud data to our format
const convertAlQuranCloudToOurFormat = (data: AlQuranCloudResponse): QuranApiChaptersResponse => {
  const chapters = data.data.surahs.map(surah => ({
    id: surah.number,
    name_simple: surah.englishName,
    name_complex: surah.englishName,
    name_arabic: surah.name,
    revelation_place: surah.revelationType.toLowerCase(),
    revelation_order: surah.number,
    bismillah_pre: surah.number !== 1 && surah.number !== 9,
    verses_count: surah.ayahs.length,
    pages: [],
    translated_name: {
      language_name: "english",
      name: surah.englishNameTranslation
    }
  }));
  
  return { chapters };
};

const convertAlQuranCloudChapterToOurFormat = (surah: AlQuranCloudSurah): QuranApiChapterResponse => {
  const chapter: QuranApiChapter = {
    id: surah.number,
    name_simple: surah.englishName,
    name_complex: surah.englishName,
    name_arabic: surah.name,
    revelation_place: surah.revelationType.toLowerCase(),
    revelation_order: surah.number,
    bismillah_pre: surah.number !== 1 && surah.number !== 9,
    verses_count: surah.ayahs.length,
    pages: [],
    translated_name: {
      language_name: "english",
      name: surah.englishNameTranslation
    }
  };

  const verses: QuranApiVerse[] = surah.ayahs.map(ayah => ({
    id: ayah.numberInSurah,
    verse_key: `${surah.number}:${ayah.numberInSurah}`,
    text_uthmani: ayah.text,
    text_simple: ayah.text,
    juz_number: ayah.juz,
    hizb_number: ayah.hizbQuarter,
    rub_number: ayah.ruku,
    page_number: ayah.page,
    words: []
  }));

  return {
    chapter,
    verses,
    pagination: {
      per_page: verses.length,
      current_page: 1,
      total_pages: 1,
      total_records: verses.length
    }
  };
};

// Fetch all chapters with fallback
export const fetchQuranApiChapters = async (): Promise<QuranApiChaptersResponse> => {
  try {
    console.log("Trying primary API...");
    const response = await fetch(`${QURAN_API_BASE}/chapters`);
    if (!response.ok) {
      throw new Error(`Primary API failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Primary API failed, using fallback...", error);
    // Fallback to alquran.cloud
    const response = await fetch(`${FALLBACK_API_BASE}/quran/quran-uthmani`);
    if (!response.ok) {
      throw new Error(`Fallback API also failed: ${response.statusText}`);
    }
    const data: AlQuranCloudResponse = await response.json();
    return convertAlQuranCloudToOurFormat(data);
  }
};

// Fetch specific chapter with verses and fallback
export const fetchQuranApiChapter = async (chapterId: number): Promise<QuranApiChapterResponse> => {
  try {
    console.log(`Trying primary API for chapter ${chapterId}...`);
    const response = await fetch(`${QURAN_API_BASE}/chapters/${chapterId}/verses`);
    if (!response.ok) {
      throw new Error(`Primary API failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Primary API failed, using fallback...", error);
    // Fallback to alquran.cloud
    const response = await fetch(`${FALLBACK_API_BASE}/quran/quran-uthmani`);
    if (!response.ok) {
      throw new Error(`Fallback API also failed: ${response.statusText}`);
    }
    const data: AlQuranCloudResponse = await response.json();
    const surah = data.data.surahs.find(s => s.number === chapterId);
    if (!surah) {
      throw new Error(`Chapter ${chapterId} not found`);
    }
    return convertAlQuranCloudChapterToOurFormat(surah);
  }
};

// React Query hooks
export const useQuranApiChapters = () => {
  return useQuery({
    queryKey: ["quranapi-chapters"],
    queryFn: fetchQuranApiChapters,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuranApiChapter = (chapterId: number) => {
  return useQuery({
    queryKey: ["quranapi-chapter", chapterId],
    queryFn: () => fetchQuranApiChapter(chapterId),
    enabled: chapterId > 0 && chapterId <= 114,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
