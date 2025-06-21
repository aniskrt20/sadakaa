
// Base API configuration
export const BASE_URL = "https://mp3quran.net/api/v3";

export const fetchApi = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
  let url = `${BASE_URL}/${endpoint}`;
  
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  const data = await response.json();
  return data;
};
