
import React, { useEffect, useState } from "react";
import { useGeoLocation } from "@/hooks/use-location";
import { getHijriDate } from "@/data/prayers";
import { MapPin, Moon, Loader2 } from "lucide-react";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "صدقة جارية" }) => {
  const { location, loading } = useGeoLocation();
  const [hijriDate, setHijriDate] = useState<string>("");
  const [isLoadingDate, setIsLoadingDate] = useState<boolean>(true);
  
  useEffect(() => {
    // Function to update the Hijri date
    const updateHijriDate = async () => {
      setIsLoadingDate(true);
      try {
        const date = await getHijriDate();
        setHijriDate(date);
      } catch (error) {
        console.error("Error updating Hijri date:", error);
      } finally {
        setIsLoadingDate(false);
      }
    };
    
    // Update Hijri date immediately
    updateHijriDate();
    
    // Set up a daily refresh for the Hijri date
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Set timeout to update at midnight, then set interval for daily updates
    const timer = setTimeout(() => {
      updateHijriDate();
      // After the first update, set up a daily interval
      const dailyInterval = setInterval(updateHijriDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full islamic-header text-white p-6 rounded-b-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-islamic-secondary/50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-islamic-secondary/30"></div>
      
      <div className="text-center pb-4 relative z-10">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center justify-center mt-2 text-sm opacity-80">
          <MapPin size={16} className="mr-1" />
          <span>
            {loading ? (
              <span className="flex items-center">
                جاري تحديد الموقع... <Loader2 size={12} className="ml-1 animate-spin" />
              </span>
            ) : location?.error ? (
              <span>تعذر تحديد الموقع</span>
            ) : location?.latitude ? (
              <span>تم تحديد الموقع بنجاح</span>
            ) : (
              <span>يرجى السماح بتحديد الموقع</span>
            )}
          </span>
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-center">
          <div className="islamic-divider w-3/4 my-2">
            <div className="islamic-divider-center"></div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="arabic-text text-xl mt-3">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</h2>
          <p className="text-sm mt-2 arabic-text flex items-center justify-center">
            <Moon size={14} className="mx-1 text-islamic-secondary" />
            {isLoadingDate ? (
              <span className="flex items-center">
                جاري تحميل التاريخ... <Loader2 size={10} className="mr-1 animate-spin" />
              </span>
            ) : hijriDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
