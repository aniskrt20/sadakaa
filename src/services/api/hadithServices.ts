
import { fetchApi } from './baseApi';

export interface HadithApiResponse {
  code: number;
  message: string;
  data: {
    available: number;
    hadiths: Hadith[];
  };
}

export interface Hadith {
  number: number;
  arab: string;
  id: string;
}

export interface HadithBookResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    requested: number;
    hadiths: Hadith[];
  };
}

export const HADITH_BOOKS = [
  { id: 'muslim', name: 'صحيح مسلم' },
  { id: 'bukhari', name: 'صحيح البخاري' },
  { id: 'tirmidzi', name: 'جامع الترمذي' },
  { id: 'ibnu-majah', name: 'سنن ابن ماجه' },
  { id: 'nasai', name: 'سنن النسائي' },
] as const;

export type HadithBook = typeof HADITH_BOOKS[number]['id'];

export const fetchHadithsByBook = async (book: HadithBook = 'bukhari', page: number = 1, limit: number = 20): Promise<HadithBookResponse> => {
  try {
    // Calculate range based on page and limit
    const start = (page - 1) * limit + 1;
    const end = start + limit - 1;
    
    const url = `https://api.hadith.gading.dev/books/${book}?range=${start}-${end}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hadiths: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure the data structure is complete before returning
    if (!data || !data.data) {
      throw new Error("Invalid response format from API");
    }
    
    // Make sure data has all required fields with proper defaults
    return {
      code: data.code || 200,
      message: data.message || "",
      data: {
        name: data.data?.name || "",
        id: data.data?.id || book,
        available: data.data?.available || 0,
        requested: data.data?.requested || 0,
        hadiths: Array.isArray(data.data?.hadiths) ? data.data.hadiths : []
      }
    };
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    // Return a default response structure on error
    return {
      code: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      data: {
        name: HADITH_BOOKS.find(b => b.id === book)?.name || "",
        id: book,
        available: 0,
        requested: 0,
        hadiths: []
      }
    };
  }
};

// New function to search hadiths
export const searchHadiths = async (book: HadithBook = 'bukhari', query: string): Promise<HadithBookResponse> => {
  try {
    // Construct the search URL - Note: The API doesn't have a search endpoint,
    // so we'll fetch a larger number of hadiths and filter them client-side
    const url = `https://api.hadith.gading.dev/books/${book}?range=1-100`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to search hadiths: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure the data structure is complete
    if (!data || !data.data) {
      throw new Error("Invalid response format from API");
    }
    
    // Filter hadiths that contain the search query (in Arabic text)
    const filteredHadiths = Array.isArray(data.data?.hadiths) 
      ? data.data.hadiths.filter(hadith => 
          hadith.arab.toLowerCase().includes(query.toLowerCase()) ||
          hadith.id.toLowerCase().includes(query.toLowerCase())
        )
      : [];
    
    // Return the filtered results with the same structure
    return {
      code: data.code || 200,
      message: `Found ${filteredHadiths.length} results for "${query}"`,
      data: {
        name: data.data?.name || "",
        id: data.data?.id || book,
        available: filteredHadiths.length,
        requested: filteredHadiths.length,
        hadiths: filteredHadiths
      }
    };
  } catch (error) {
    console.error("Error searching hadiths:", error);
    // Return a default response structure on error
    return {
      code: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      data: {
        name: HADITH_BOOKS.find(b => b.id === book)?.name || "",
        id: book,
        available: 0,
        requested: 0,
        hadiths: []
      }
    };
  }
};

// Export the hadith service in the API index
export * from './hadithServices';
