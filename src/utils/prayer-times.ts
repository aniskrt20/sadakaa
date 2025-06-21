
import { PrayerTime, getDefaultPrayerTimes } from "../data/prayers";

// Function to fetch prayer times from aladhan.com API based on user's location
export const fetchPrayerTimes = async (latitude?: number, longitude?: number): Promise<PrayerTime[]> => {
  try {
    // Use default coordinates if location is not available
    const lat = latitude || 36.753; // Default to Algiers coordinates
    const lng = longitude || 3.058;

    console.log(`Fetching prayer times for coordinates: ${lat}, ${lng}`);
    
    // Get current date for API request
    const date = new Date();
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    const year = date.getFullYear();
    
    // Using Islamic Finder settings for Algeria: University of Islamic Sciences, Karachi
    // method=1 with adjustment parameters that match Islamic Finder settings
    const response = await fetch(
      `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=1&tune=0,0,0,0,0,0,0,0,0`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch prayer times: ${response.status}`);
    }

    const data = await response.json();
    console.log("Prayer times API response:", data);
    
    // Check if API returned valid data with the correct structure
    if (!data || !data.data || !data.data.length) {
      throw new Error('Invalid response from prayer times API');
    }

    // Get today's date to find the correct day in the month data
    const day = date.getDate() - 1; // API returns an array of days (0-indexed)
    const todayData = data.data[day];
    
    if (!todayData || !todayData.timings) {
      throw new Error('Could not find today\'s prayer times in API response');
    }

    // Map API response to our PrayerTime interface
    // aladhan.com returns times with timezone info like "04:05 (GMT+1)"
    // We need to extract just the time part
    return [
      { name: "Fajr", nameAr: "الفجر", time: formatTimeFromAladhan(todayData.timings.Fajr) },
      { name: "Sunrise", nameAr: "الشروق", time: formatTimeFromAladhan(todayData.timings.Sunrise) },
      { name: "Dhuhr", nameAr: "الظهر", time: formatTimeFromAladhan(todayData.timings.Dhuhr) },
      { name: "Asr", nameAr: "العصر", time: formatTimeFromAladhan(todayData.timings.Asr) },
      { name: "Maghrib", nameAr: "المغرب", time: formatTimeFromAladhan(todayData.timings.Maghrib) },
      { name: "Isha", nameAr: "العشاء", time: formatTimeFromAladhan(todayData.timings.Isha) }
    ];
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    
    // Return default prayer times from our local data in case of error
    return getDefaultPrayerTimes();
  }
};

// Helper function to format time from aladhan.com API (format: "04:05 (GMT+1)")
const formatTimeFromAladhan = (timeString: string): string => {
  if (!timeString) return "00:00";
  
  // Extract just the time part before the space (ignoring timezone info)
  const timePart = timeString.split(' ')[0];
  
  // If we have a valid time format, return it
  if (timePart && timePart.includes(':')) {
    const [hours, minutes] = timePart.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  return "00:00";
};

// Keep the original formatTime function for backward compatibility
const formatTime = (timeString: string): string => {
  if (!timeString) return "00:00";
  
  // The API response time might be in different formats, handle accordingly
  // Assuming format like "5:30 AM" or "17:30"
  if (timeString.includes('AM') || timeString.includes('PM')) {
    const [timePart, period] = timeString.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    let formattedHours = hours;
    if (period === 'PM' && hours < 12) {
      formattedHours = hours + 12;
    } else if (period === 'AM' && hours === 12) {
      formattedHours = 0;
    }
    
    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  // If already in 24-hour format, just ensure it's properly formatted
  const [hours, minutes] = timeString.split(':').map(Number);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
