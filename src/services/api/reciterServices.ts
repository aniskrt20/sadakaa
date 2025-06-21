
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "./baseApi";
import { Reciter, ReciterParams, Riwayah } from "./types";

interface RecitersResponse {
  reciters: Reciter[];
}

interface RiwayatResponse {
  riwayat: Riwayah[];
}

// API functions for Reciter-related endpoints
export const fetchReciters = async (params?: ReciterParams): Promise<Reciter[]> => {
  const queryParams: Record<string, string> = {};
  
  if (params?.language) queryParams.language = params.language;
  if (params?.reciter_id) queryParams.reciter_id = params.reciter_id.toString();
  if (params?.rewaya) queryParams.rewaya = params.rewaya.toString();
  if (params?.surah) queryParams.surah = params.surah.toString();
  
  const data = await fetchApi<RecitersResponse>("reciters", queryParams);
  return data.reciters;
};

export const fetchRiwayat = async (): Promise<Riwayah[]> => {
  const data = await fetchApi<RiwayatResponse>("riwayat");
  return data.riwayat;
};

export const fetchRecentReads = async (): Promise<Reciter[]> => {
  const data = await fetchApi<RecitersResponse>("recent_reads");
  return data.reciters;
};

// React Query hooks
export const useReciters = (params?: ReciterParams) => {
  return useQuery({
    queryKey: ["reciters", params],
    queryFn: () => fetchReciters(params),
  });
};

export const useRiwayat = () => {
  return useQuery({
    queryKey: ["riwayat"],
    queryFn: fetchRiwayat,
  });
};

export const useRecentReads = () => {
  return useQuery({
    queryKey: ["recent_reads"],
    queryFn: fetchRecentReads,
  });
};
