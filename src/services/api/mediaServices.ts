import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "./baseApi";
import { LiveTV, RadioStation, Video, VideoType } from "./types";

interface LiveTVResponse {
  livetv: LiveTV[];
}

interface RadiosResponse {
  radios: RadioStation[];
}

interface VideoTypesResponse {
  video_types: VideoType[];
}

interface VideosResponse {
  videos: Video[];
}

// API functions for Media-related endpoints
export const fetchLiveTV = async (): Promise<LiveTV[]> => {
  // Fetch data from API
  const data = await fetchApi<LiveTVResponse>("live-tv");
  
  // No additional channels added manually
  return data.livetv;
};

export const fetchRadios = async (): Promise<RadioStation[]> => {
  const data = await fetchApi<RadiosResponse>("radios");
  return data.radios;
};

export const fetchVideoTypes = async (language?: string): Promise<VideoType[]> => {
  const params = language ? { language } : undefined;
  const data = await fetchApi<VideoTypesResponse>("video_types", params);
  return data.video_types;
};

export const fetchVideos = async (): Promise<Video[]> => {
  const data = await fetchApi<VideosResponse>("videos");
  return data.videos;
};

// React Query hooks
export const useLiveTV = () => {
  return useQuery({
    queryKey: ["live_tv"],
    queryFn: fetchLiveTV,
  });
};

export const useRadios = () => {
  return useQuery({
    queryKey: ["radios"],
    queryFn: fetchRadios,
  });
};

export const useVideoTypes = (language?: string) => {
  return useQuery({
    queryKey: ["video_types", language],
    queryFn: () => fetchVideoTypes(language),
  });
};

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
};
