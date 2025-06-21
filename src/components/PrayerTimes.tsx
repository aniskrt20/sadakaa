import React, { useEffect, useState, useCallback } from "react";
import { PrayerTime } from "@/data/prayers";
import { fetchPrayerTimes } from "@/utils/prayer-times";
import { useGeoLocation } from "@/hooks/use-location";
import { usePrayerAlerts } from "@/hooks/use-prayer-alerts";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Clock, RefreshCw, MapPin, Bell } from "lucide-react";
import { toast } from "sonner";

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { location, loading: locationLoading } = useGeoLocation();

  // استخدام hook لحساب الصلاة القادمة فقط
  const { nextAlert } = usePrayerAlerts({
    prayerTimes,
    isEnabled: true // نعتبر أن الحساب دائماً شغال لعرض الصلاة القادمة فقط
  });

  const getPrayerTimes = useCallback(async () => {
    try {
      setIsRefreshing(true);
      
      const times = await fetchPrayerTimes(
        location?.latitude,
        location?.longitude
      );
      
      setPrayerTimes(times);
      determineNextPrayer(times);
      
      if (location?.latitude && location?.longitude) {
        toast.success("تم تحديث مواقيت الصلاة حسب موقعك");
      } else {
        toast.info("تم تحديث مواقيت الصلاة باستخدام الإعدادات الافتراضية للجزائر");
      }
    } catch (error) {
      console.error("Error setting prayer times:", error);
      toast.error("حدث خطأ في تحديث مواقيت الصلاة");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [location]);

  useEffect(() => {
    if (!locationLoading) {
      getPrayerTimes();
    }
  }, [location, locationLoading, getPrayerTimes]);

  const determineNextPrayer = (times: PrayerTime[]) => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    let foundNext = false;
    for (const prayer of times) {
      if (prayer.time > currentTime) {
        setNextPrayer(prayer.name);
        foundNext = true;
        break;
      }
    }

    if (!foundNext && times.length > 0) {
      setNextPrayer(times[0].name);
    }
  };

  const handleRefresh = () => {
    getPrayerTimes();
  };

  // إزالة كل وظائف التنبيهات/الأذان/الصوت/زر التشغيل/التبديل
  // ولن نعرض سوى مواقيت الصلاة فقط

  const isPWAInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white arabic-text">أوقات الصلاة</h2>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {locationLoading ? "جاري تحديد الموقع..." : 
                   location?.latitude ? "تم تحديد الموقع" : "الموقع الافتراضي"}
                </span>
                {isPWAInstalled() && (
                  <span className="mr-2 px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                    PWA
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* تم حذف جميع الأزرار الخاصة بالأذان والتنبيه */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {/* تحديث مواقيت الصلاة */}
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="group p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all duration-300 disabled:opacity-50"
              aria-label="تحديث مواقيت الصلاة"
            >
              <RefreshCw className={`h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 transition-colors ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* عرض الصلاة القادمة (اختياري) */}
        {nextAlert && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 arabic-text">الصلاة القادمة</p>
                <p className="text-lg font-bold arabic-text">{nextAlert.nameAr} - {nextAlert.time}</p>
              </div>
              <Bell className="h-6 w-6 opacity-60" />
            </div>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 arabic-text">جاري تحميل أوقات الصلاة...</p>
          </div>
        </div>
      ) : prayerTimes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {prayerTimes.map((prayer, index) => (
            <div
              key={prayer.name}
              className={`relative overflow-hidden rounded-2xl p-4 text-center transition-all duration-500 transform hover:scale-105 group ${
                prayer.name === nextPrayer
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/30 scale-105"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {prayer.name === nextPrayer && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
              )}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm arabic-text font-medium opacity-90">{prayer.nameAr}</p>
                </div>
                
                <p className={`text-xl font-bold ${
                  prayer.name === nextPrayer ? "text-white" : "text-gray-900 dark:text-white"
                }`}>
                  {prayer.time}
                </p>
                {prayer.name === nextPrayer && (
                  <div className="mt-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full arabic-text">الصلاة القادمة</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 arabic-text mb-4">لا توجد معلومات عن أوقات الصلاة متاحة</p>
          <button 
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors" 
            onClick={handleRefresh}
          >
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;
