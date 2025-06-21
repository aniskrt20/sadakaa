
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuranApiChapter } from "@/services/api/quranApiService";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Loader, BookOpen, Sparkles, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import VerseAudioPlayer from "@/components/quran/VerseAudioPlayer";
import SurahAudioPlayer from "@/components/quran/SurahAudioPlayer";

const QuranSurahPage = () => {
  const { surahId } = useParams<{ surahId: string }>();
  const navigate = useNavigate();
  const surahNumber = surahId ? parseInt(surahId) : 1;
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  
  const { data, isLoading, error } = useQuranApiChapter(surahNumber);

  const handleBack = () => {
    navigate("/quran");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Modern Loading Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/20 to-orange-500/20"></div>
          
          <div className="relative z-10 px-6 py-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBack}
                  className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/30">
                    <ChevronRight size={20} />
                  </div>
                  <span className="font-medium text-lg">العودة</span>
                </button>
                
                <div className="text-center text-white">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Sparkles className="text-yellow-300 animate-pulse" size={28} />
                    <h1 className="text-4xl font-bold arabic-text bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                      جاري التحميل
                    </h1>
                    <Sparkles className="text-yellow-300 animate-pulse animation-delay-2000" size={28} />
                  </div>
                </div>
                
                <div className="w-20"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-400 rounded-full animate-spin animation-delay-2000"></div>
          </div>
          <span className="mt-6 text-gray-600 text-lg font-medium">جاري تحميل السورة الكريمة...</span>
        </div>
        
        <div className="pb-20">
          <BottomNavigation />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Modern Error Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500"></div>
          
          <div className="relative z-10 px-6 py-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBack}
                  className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/30">
                    <ChevronRight size={20} />
                  </div>
                  <span className="font-medium text-lg">العودة</span>
                </button>
                
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold arabic-text">خطأ في التحميل</h1>
                </div>
                
                <div className="w-20"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-white" size={24} />
                </div>
                <p className="text-red-600 mb-2 text-lg font-medium">حدث خطأ أثناء تحميل السورة</p>
                <p className="text-gray-500 mb-4">يرجى المحاولة مرة أخرى لاحقاً</p>
                <Button 
                  onClick={handleBack}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-8 py-3 font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  العودة للمصحف
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="pb-20">
          <BottomNavigation />
        </div>
      </div>
    );
  }

  const { chapter, verses } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Modern Floating Header */}
      <div className="relative">
        {/* Background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pink-500/20 to-orange-500/20"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 px-6 py-10">
          <div className="max-w-6xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBack}
                className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/30">
                  <ChevronRight size={20} />
                </div>
                <span className="font-medium text-lg">العودة</span>
              </button>
              
              <div className="text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="text-yellow-300 animate-pulse" size={28} />
                  <h1 className="text-4xl font-bold arabic-text bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    {chapter.name_arabic}
                  </h1>
                  <Sparkles className="text-yellow-300 animate-pulse animation-delay-2000" size={28} />
                </div>
                <p className="text-white/80 text-lg font-medium">
                  {chapter.translated_name.name} • {chapter.verses_count} آية • {chapter.revelation_place === "makkah" ? "مكية" : "مدنية"}
                </p>
              </div>
              
              <div className="w-20"></div>
            </div>

            {/* Surah Info Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl">
                <div className="text-center text-white">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{chapter.id}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold arabic-text bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-2">
                        سورة {chapter.name_arabic}
                      </h2>
                      <p className="text-white/90 text-lg">{chapter.translated_name.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center shadow-md">
                        <Heart className="text-white" size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                      <BookOpen className="text-yellow-300" size={18} />
                      <span className="font-medium">{chapter.verses_count} آية</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                      <Star className="text-blue-300" size={18} />
                      <span className="font-medium">{chapter.revelation_place === "makkah" ? "مكية" : "مدنية"}</span>
                    </div>
                  </div>

                  {/* Surah Audio Player */}
                  <SurahAudioPlayer 
                    surahNumber={surahNumber} 
                    surahName={chapter.name_arabic}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Modern Verses Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
          <Card className="relative bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {verses && verses.length > 0 && (
                <>
                  {/* Bismillah - Only show if chapter.bismillah_pre is true and not Al-Fatiha */}
                  {chapter.bismillah_pre && surahNumber !== 1 && (
                    <div className="text-center mb-10">
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20"></div>
                        <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                          <h2 className="text-3xl font-bold arabic-text text-emerald-800 leading-relaxed">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </h2>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Verses */}
                  <div className="space-y-8">
                    {verses.map((verse, index) => {
                      const verseText = verse.text_uthmani;
                      const isHighlighted = highlightedVerse === verse.id;

                      return (
                        <div 
                          key={verse.id} 
                          id={`verse-${verse.id}`}
                          className={`group relative cursor-pointer transition-all duration-500 ${
                            isHighlighted ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                          }`} 
                          onClick={() => {}}
                        >
                          <div className={`absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 ${
                            isHighlighted ? 'opacity-100 from-yellow-400/30 to-orange-400/30' : ''
                          }`}></div>
                          <div className={`relative bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-100/50 group-hover:border-purple-200 transition-all duration-300 ${
                            isHighlighted ? 'border-yellow-300 bg-gradient-to-r from-yellow-50/80 to-orange-50/80' : ''
                          }`}>
                            <div className="flex items-start gap-4">
                              {/* Verse Number */}
                              <div className="relative">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${
                                  isHighlighted ? 'from-yellow-500 to-orange-500' : ''
                                }`}>
                                  <span className="text-white font-bold text-sm">{verse.id}</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <Sparkles size={8} className="text-white" />
                                </div>
                              </div>
                              
                              {/* Verse Text */}
                              <div className="flex-1 text-right">
                                <p className={`arabic-text text-2xl leading-loose text-gray-800 group-hover:text-purple-800 transition-colors duration-300 ${
                                  isHighlighted ? 'text-yellow-900 font-semibold' : ''
                                }`}>
                                  {verseText}
                                </p>
                              </div>
                              
                              {/* Action Icons */}
                              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <VerseAudioPlayer 
                                  surahNumber={surahNumber} 
                                  verseNumber={verse.id} 
                                  size="sm"
                                />
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer">
                                  <Heart className="text-white" size={14} />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {index < verses.length - 1 && (
                            <div className="flex justify-center my-6">
                              <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="pb-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default QuranSurahPage;
