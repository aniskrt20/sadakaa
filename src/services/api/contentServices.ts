
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "./baseApi";
import { Language, Tafsir, Tadabor } from "./types";

interface TafasirResponse {
  tafasir: Tafsir[];
}

interface TadaborResponse {
  tadabors: Tadabor[];
}

interface LanguagesResponse {
  languages: Language[];
}

// API functions for Content-related endpoints
export const fetchTafasir = async (): Promise<Tafsir[]> => {
  const data = await fetchApi<TafasirResponse>("tafasir");
  return data.tafasir;
};

export const fetchTadabor = async (): Promise<Tadabor[]> => {
  const data = await fetchApi<TadaborResponse>("tadabor");
  return data.tadabors;
};

export const fetchLanguages = async (): Promise<Language[]> => {
  const data = await fetchApi<LanguagesResponse>("languages");
  return data.languages;
};

// React Query hooks
export const useTafasir = () => {
  return useQuery({
    queryKey: ["tafasir"],
    queryFn: fetchTafasir,
  });
};

export const useTadabor = () => {
  return useQuery({
    queryKey: ["tadabor"],
    queryFn: fetchTadabor,
  });
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });
};
