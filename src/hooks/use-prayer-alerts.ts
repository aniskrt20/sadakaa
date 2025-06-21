
// حذف كل وظائف المنبه والصوت والاحتفاظ فقط بحساب الصلاة القادمة (إن كان مطلوبًا للأكواد الأخرى)
import { useEffect, useRef, useState } from 'react';
import { PrayerTime } from '@/data/prayers';

interface UsePrayerAlertsProps {
  prayerTimes: PrayerTime[];
  isEnabled: boolean;
}

export const usePrayerAlerts = ({ prayerTimes, isEnabled }: UsePrayerAlertsProps) => {
  const [nextAlert, setNextAlert] = useState<PrayerTime | null>(null);

  useEffect(() => {
    if (!isEnabled || prayerTimes.length === 0) {
      setNextAlert(null);
      return;
    }
    // حساب الصلاة القادمة فقط بدون أي إشعارات أو صوت
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    let foundNext = false;
    for (const prayer of prayerTimes) {
      if (prayer.time > currentTime && !foundNext) {
        setNextAlert(prayer);
        foundNext = true;
      }
    }
    if (!foundNext && prayerTimes.length > 0) {
      setNextAlert(prayerTimes[0]);
    }
  }, [prayerTimes, isEnabled]);

  // لم تعد هناك أي وظائف مرتبطة بالأذان
  return {
    nextAlert
  };
};
