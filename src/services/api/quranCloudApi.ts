import { useQuery } from "@tanstack/react-query";

// Types for the Quran API responses
export interface QuranCloudSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

export interface QuranData {
  code: number;
  status: string;
  data: {
    surahs: QuranCloudSurah[];
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
      format: string;
      type: string;
    };
  };
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { recommended: boolean; obligatory: boolean };
}

// Base API URL
const API_BASE_URL = "https://api.alquran.cloud/v1";

// API functions to fetch Quran data
export const fetchQuranData = async (edition: string = "quran-uthmani"): Promise<QuranData> => {
  const response = await fetch(`${API_BASE_URL}/quran/${edition}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Quran data: ${response.statusText}`);
  }
  return await response.json();
};

export const fetchSurah = async (surahNumber: number, edition: string = "quran-uthmani"): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${edition}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch surah: ${response.statusText}`);
  }
  return await response.json();
};

// React Query hooks for data fetching
export const useQuranData = (edition: string = "quran-uthmani") => {
  return useQuery({
    queryKey: ["quran", edition],
    queryFn: () => fetchQuranData(edition),
  });
};

export const useSurah = (surahNumber: number, edition: string = "quran-uthmani") => {
  return useQuery({
    queryKey: ["surah", surahNumber, edition],
    queryFn: () => fetchSurah(surahNumber, edition),
  });
};
