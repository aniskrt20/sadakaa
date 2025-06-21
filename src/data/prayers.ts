
export interface PrayerTime {
  name: string;
  nameAr: string;
  time: string;
}

export const getDefaultPrayerTimes = (): PrayerTime[] => {
  return [
    { name: "Fajr", nameAr: "الفجر", time: "05:12" },
    { name: "Sunrise", nameAr: "الشروق", time: "06:32" },
    { name: "Dhuhr", nameAr: "الظهر", time: "12:15" },
    { name: "Asr", nameAr: "العصر", time: "15:45" },
    { name: "Maghrib", nameAr: "المغرب", time: "18:11" },
    { name: "Isha", nameAr: "العشاء", time: "19:41" }
  ];
};

// Improved function to get Hijri date directly from API
export const getHijriDate = async (): Promise<string> => {
  try {
    // Get current date
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    // Use aladhan.com API to get accurate Hijri date
    const response = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Hijri date');
    }
    
    const data = await response.json();
    
    if (!data || !data.data || !data.data.hijri) {
      throw new Error('Invalid response from Hijri date API');
    }
    
    const hijri = data.data.hijri;
    
    // Convert numbers to Arabic numerals
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const hijriDayArabic = hijri.day.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
    const hijriYearArabic = hijri.year.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
    
    // Get Arabic month name
    const hijriMonthArabic = hijri.month.ar;
    
    return `${hijriDayArabic} ${hijriMonthArabic} ${hijriYearArabic}`;
    
  } catch (error) {
    console.error("Error fetching Hijri date:", error);
    
    // Fallback to approximation calculation if API fails
    return getApproximateHijriDate();
  }
};

// Fallback function for Hijri date calculation if API fails
const getApproximateHijriDate = (): string => {
  // Use the previous approximation method
  const today = new Date();
  
  // Get Gregorian date components
  const gregorianYear = today.getFullYear();
  const gregorianMonth = today.getMonth();
  const gregorianDay = today.getDate();
  
  // More accurate conversion formula based on astronomical calculations
  // This is an approximation that's more accurate than a simple formula
  let hijriYear = Math.floor(gregorianYear - 622 + ((gregorianYear - 622) / 32));
  
  // Calculate approximate days since start of Gregorian year
  const daysInMonth = [31, (gregorianYear % 4 === 0 && (gregorianYear % 100 !== 0 || gregorianYear % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dayOfYear = gregorianDay;
  for (let i = 0; i < gregorianMonth; i++) {
    dayOfYear += daysInMonth[i];
  }
  
  // Adjust the calculation based on the lunar calendar (approximately 354.367 days per year)
  // Each Hijri year is about 11 days shorter than Gregorian
  const hijriDayOfYear = Math.floor(dayOfYear + 10 + ((gregorianYear - 622) * 11) % 30);
  
  // Determine Hijri month and day
  const hijriMonthLength = 29.5; // Average days in Hijri month
  let hijriMonth = Math.floor(hijriDayOfYear / hijriMonthLength);
  const hijriDay = Math.floor(hijriDayOfYear - (hijriMonth * hijriMonthLength)) || 1;
  
  // Adjust month (0-based to 1-based) and handle overflow
  hijriMonth = (hijriMonth % 12) || 12;
  if (hijriMonth > 12) {
    hijriMonth = 1;
    hijriYear += 1;
  }
  
  // Arabic month names
  const hijriMonthNames = [
    "محرم", "صفر", "ربيع الأول", "ربيع الثاني", 
    "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
    "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
  ];
  
  // Convert numbers to Arabic numerals
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const hijriDayArabic = hijriDay.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
  const hijriYearArabic = hijriYear.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
  
  return `${hijriDayArabic} ${hijriMonthNames[hijriMonth - 1]} ${hijriYearArabic}`;
};
