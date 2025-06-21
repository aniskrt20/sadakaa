
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "./baseApi";
import { Moshaf, Surah } from "./types";

interface MoshafResponse {
  moshafs: Moshaf[];
}

interface SuwarResponse {
  suwar: Surah[];
}

interface AyatTimingResponse {
  times: number[];
}

// API functions for Quran-related endpoints
export const fetchMoshaf = async (): Promise<Moshaf[]> => {
  const data = await fetchApi<MoshafResponse>("moshaf");
  return data.moshafs;
};

export const fetchSuwar = async (): Promise<Surah[]> => {
  const data = await fetchApi<SuwarResponse>("suwar");
  return data.suwar;
};

export const fetchAyatTiming = async (reciterID: number, surahID: number) => {
  const data = await fetchApi<AyatTimingResponse>("ayat_timing", {
    reciter: reciterID.toString(),
    surah: surahID.toString()
  });
  return data.times;
};

// React Query hooks
export const useMoshaf = () => {
  return useQuery({
    queryKey: ["moshaf"],
    queryFn: fetchMoshaf,
  });
};

export const useSuwar = () => {
  return useQuery({
    queryKey: ["suwar"],
    queryFn: fetchSuwar,
  });
};

export const useAyatTiming = (reciterID: number, surahID: number) => {
  return useQuery({
    queryKey: ["ayat_timing", reciterID, surahID],
    queryFn: () => fetchAyatTiming(reciterID, surahID),
  });
};

// Add new API functions for QuranPedia
export const fetchAllVerses = async (surahID: number): Promise<any> => {
  const response = await fetch(`https://api.quranpedia.net/api/v1/verses/by_surah/${surahID}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch verses for surah ${surahID}`);
  }
  const data = await response.json();
  return data.data;
};

export const useAllVerses = (surahID: number) => {
  return useQuery({
    queryKey: ["verses", surahID],
    queryFn: () => fetchAllVerses(surahID),
  });
};
