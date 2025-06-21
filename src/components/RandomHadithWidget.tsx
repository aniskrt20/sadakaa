
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchHadithsByBook, HADITH_BOOKS, HadithBook } from "@/services/api/hadithServices";
import { Book, RefreshCw, Clock } from "lucide-react";

const RandomHadithWidget = () => {
  const [currentHadith, setCurrentHadith] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  const getRandomHadith = async () => {
    try {
      setIsLoading(true);
      
      // Get random book
      const randomBookIndex = Math.floor(Math.random() * HADITH_BOOKS.length);
      const randomBook = HADITH_BOOKS[randomBookIndex];
      
      // Get random page (1-50 to ensure we get data)
      const randomPage = Math.floor(Math.random() * 50) + 1;
      
      const response = await fetchHadithsByBook(randomBook.id as HadithBook, randomPage, 10);
      
      if (response.data.hadiths && response.data.hadiths.length > 0) {
        // Get random hadith from the page
        const randomHadithIndex = Math.floor(Math.random() * response.data.hadiths.length);
        const randomHadith = response.data.hadiths[randomHadithIndex];
        
        setCurrentHadith({
          ...randomHadith,
          bookName: randomBook.name
        });
      }
    } catch (error) {
      console.error("Error fetching random hadith:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    getRandomHadith();
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          getRandomHadith();
          return 120; // Reset to 2 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-emerald-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <Book className="text-white" size={20} />
            </div>
            حديث عشوائي
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-emerald-600">
            <Clock size={16} />
            <span>التحديث خلال: {formatTime(timeLeft)}</span>
            <button
              onClick={getRandomHadith}
              disabled={isLoading}
              className="p-1 rounded-full hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            <span className="mr-3 text-gray-600">جاري تحميل حديث جديد...</span>
          </div>
        ) : currentHadith ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <p className="text-right arabic-text text-lg leading-loose text-gray-800 font-medium">
                {currentHadith.arab}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Book size={16} />
                <span className="arabic-text">{currentHadith.bookName}</span>
              </div>
              <div className="text-emerald-600 font-medium">
                حديث رقم: {currentHadith.number}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>لا يمكن تحميل الحديث في الوقت الحالي</p>
            <button
              onClick={getRandomHadith}
              className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm underline"
            >
              إعادة المحاولة
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RandomHadithWidget;
