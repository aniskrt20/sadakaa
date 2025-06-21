import React, { useState } from "react";
import { useQuranData } from "@/services/api/quranCloudApi";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ChevronRight, Search, BookOpen, Star, Sparkles, Volume2, Heart, Download } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import OfflineDownloadManager from "@/components/quran/OfflineDownloadManager";

const FullQuranPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadManagerOpen, setDownloadManagerOpen] = useState(false);
  const { data: quranData, isLoading, error } = useQuranData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const itemsPerPage = 12;

  const handleSurahClick = (surahNumber: number) => {
    toast({
      title: "جاري الفتح",
      description: "جاري فتح السورة",
    });
    navigate(`/quran/surah/${surahNumber}`);
  };

  let filteredSurahs = [];
  let totalPages = 0;

  if (quranData && quranData.data && quranData.data.surahs) {
    filteredSurahs = quranData.data.surahs.filter(
      (surah) =>
        surah.name.includes(searchQuery) ||
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.number.toString().includes(searchQuery)
    );

    // Pagination
    totalPages = Math.ceil(filteredSurahs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    filteredSurahs = filteredSurahs.slice(startIndex, startIndex + itemsPerPage);
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="mt-6">
        <PaginationContent className="gap-2">
          {Array.from({ length: Math.min(totalPages, 7) }, (_, index) => {
            let pageNumber;
            if (totalPages <= 7) {
              pageNumber = index + 1;
            } else if (currentPage <= 4) {
              pageNumber = index + 1;
              if (index === 6) pageNumber = totalPages;
              if (index === 5) return (
                <PaginationItem key="ellipsis-1">
                  <PaginationLink className="bg-white/20 backdrop-blur-sm border-white/30 text-white">...</PaginationLink>
                </PaginationItem>
              );
            } else if (currentPage >= totalPages - 3) {
              pageNumber = totalPages - 6 + index;
              if (index === 0) pageNumber = 1;
              if (index === 1) return (
                <PaginationItem key="ellipsis-2">
                  <PaginationLink className="bg-white/20 backdrop-blur-sm border-white/30 text-white">...</PaginationLink>
                </PaginationItem>
              );
            } else {
              if (index === 0) pageNumber = 1;
              else if (index === 1) return (
                <PaginationItem key="ellipsis-3">
                  <PaginationLink className="bg-white/20 backdrop-blur-sm border-white/30 text-white">...</PaginationLink>
                </PaginationItem>
              );
              else if (index === 5) return (
                <PaginationItem key="ellipsis-4">
                  <PaginationLink className="bg-white/20 backdrop-blur-sm border-white/30 text-white">...</PaginationLink>
                </PaginationItem>
              );
              else if (index === 6) pageNumber = totalPages;
              else pageNumber = currentPage + index - 3;
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink 
                  isActive={currentPage === pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`rounded-xl transition-all duration-300 ${
                    currentPage === pageNumber 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-0" 
                      : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>
    );
  };

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
              <Link to="/" className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/30">
                  <ChevronRight size={20} />
                </div>
                <span className="font-medium text-lg">العودة</span>
              </Link>
              
              <div className="text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="text-yellow-300 animate-pulse" size={28} />
                  <h1 className="text-4xl font-bold arabic-text bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    المصحف الكامل
                  </h1>
                  <Sparkles className="text-yellow-300 animate-pulse animation-delay-2000" size={28} />
                </div>
                <p className="text-white/80 text-lg font-medium">جميع سور القرآن الكريم</p>
              </div>
              
              <div className="w-20"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Modern Search and Download Button */}
        <div className="relative group mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-700"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur opacity-20"></div>
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" size={22} />
                    <Input
                      type="text"
                      placeholder="ابحث عن السورة التي تريدها..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-14 py-4 rounded-xl border-0 bg-white/90 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-300 text-lg text-right"
                    />
                  </div>
                </div>
              </div>
              
              {/* زر التحميل للاستخدام بدون اتصال */}
              <Button
                onClick={() => setDownloadManagerOpen(true)}
                className="rounded-xl px-6 py-4 font-medium transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Download size={20} className="ml-2" />
                تحميل للاستخدام بدون اتصال
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-400 rounded-full animate-spin animation-delay-2000"></div>
            </div>
            <span className="mt-6 text-gray-600 text-lg font-medium">جاري تحميل المصحف الكامل...</span>
          </div>
        ) : error ? (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-white" size={24} />
                </div>
                <p className="text-red-600 mb-2 text-lg font-medium">حدث خطأ أثناء تحميل المصحف</p>
                <p className="text-gray-500">يرجى المحاولة مرة أخرى لاحقاً</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSurahs.map((surah, index) => (
                <div key={surah.number} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
                  <Card
                    className="relative cursor-pointer bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-2xl overflow-hidden"
                    onClick={() => handleSurahClick(surah.number)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Modern Surah Number */}
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                            <span className="text-white font-bold text-lg">{surah.number}</span>
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                            <Sparkles size={12} className="text-white" />
                          </div>
                        </div>
                        
                        {/* Surah Info */}
                        <div className="flex-1">
                          <h3 className="arabic-text font-bold text-gray-800 text-xl mb-2 group-hover:text-purple-700 transition-colors duration-300">
                            {surah.name}
                          </h3>
                          <p className="text-gray-600 font-medium mb-2 group-hover:text-gray-700 transition-colors duration-300 text-sm">
                            {surah.englishNameTranslation}
                          </p>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                              {surah.numberOfAyahs} آية
                            </span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                              {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Icons */}
                        <div className="flex flex-col gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
                            <ChevronRight className="text-purple-600 group-hover:text-white transition-colors duration-300" size={18} />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-sm">
                            <Volume2 className="text-blue-600 group-hover:text-white transition-colors duration-300" size={16} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Modern Pagination */}
            <div className="mt-12">
              {renderPagination()}
            </div>
          </>
        )}

        {filteredSurahs.length === 0 && !isLoading && !error && (
          <div className="text-center py-20">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="text-gray-400" size={40} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">لا توجد نتائج</h3>
            <p className="text-gray-500 text-lg">لم يتم العثور على سور تطابق بحثك</p>
          </div>
        )}
      </div>
      
      {/* مدير التحميل */}
      <OfflineDownloadManager 
        open={downloadManagerOpen}
        onOpenChange={setDownloadManagerOpen}
      />
      
      <div className="pb-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default FullQuranPage;