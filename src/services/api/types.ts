
export interface Moshaf {
  id: number;
  name: string;
  server: string;
  surah_total: number;
  moshaf_type: string;
  quality: string;
  reciters: Reciter[];
}

export interface Surah {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
  makkia: number;
  ayat: number;
}

export interface Riwayah {
  id: number;
  name: string;
  letter: string;
  count: number;
}

export interface Reciter {
  id: number;
  name: string;
  letter: string;
  moshaf: Moshaf[];
}

export interface RadioStation {
  id: number;
  name: string;
  url: string;
}

export interface LiveTV {
  id: number;
  name: string;
  url: string;
}

export interface Tafsir {
  id: number;
  name: string;
  language: string;
  book_name: string;
  url: string;
}

export interface Tadabor {
  id: number;
  title: string;
  content: string;
  surah: string;
  ayah: string;
}

export interface VideoType {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  title: string;
  url: string;
  date: string;
  video_type_id: number;
  video_type_name: string;
}

export interface Language {
  id: number;
  name: string;
  code: string;
  reciters_url: string;
  surah_url: string;
  riwayat_url: string;
}

export interface ReciterParams {
  language?: string;
  reciter_id?: number;
  rewaya?: number;
  surah?: number;
}
