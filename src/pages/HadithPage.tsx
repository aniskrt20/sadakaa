
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, BookOpen, Loader2, Search, Book, Heart, Bookmark } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { fetchHadithsByBook, HADITH_BOOKS, Hadith, HadithBook } from "@/services/api/hadithServices";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import HadithSearchDialog from "@/components/hadith/HadithSearchDialog";

const HadithPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBook, setCurrentBook] = useState<HadithBook>("bukhari");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Hadith[] | null>(null);
  const { toast } = useToast();
  const PAGE_LIMIT = 10;
  
  const { 
    data: hadithData, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useQuery({
    queryKey: ['hadiths', currentBook, currentPage],
    queryFn: () => fetchHadithsByBook(currentBook, currentPage, PAGE_LIMIT),
  });
  
  useEffect(() => {
    setCurrentIndex(0);
    setSearchResults(null);
  }, [currentBook, currentPage]);
  
  const nextHadith = () => {
    const hadiths = searchResults || hadithData?.data?.hadiths;
    if (!hadiths?.length) return;
    
    setCurrentIndex((prev) => (prev + 1) % hadiths.length);
  };
  
  const prevHadith = () => {
    const hadiths = searchResults || hadithData?.data?.hadiths;
    if (!hadiths?.length) return;
    
    setCurrentIndex((prev) => (prev - 1 + hadiths.length) % hadiths.length);
  };
  
  const handleBookChange = (value: string) => {
    setCurrentBook(value as HadithBook);
    setCurrentPage(1);
    setSearchResults(null);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchResults(null);
  };
  
  const handleSearchResults = (results: Hadith[]) => {
    setSearchResults(results);
    setCurrentIndex(0);
    toast({
      title: "تم العثور على النتائج",
      description: `تم العثور على ${results.length} حديث`,
    });
  };
  
  const totalPages = hadithData?.data?.available 
    ? Math.ceil(hadithData.data.available / PAGE_LIMIT) 
    : 0;
  
  const currentHadith = searchResults 
    ? searchResults[currentIndex]
    : hadithData?.data?.hadiths?.[currentIndex];
  
  // Generate page numbers for pagination
  const generatePagination = () => {
    const MAX_VISIBLE_PAGES = 5;
    const pages = [];
    
    if (!totalPages || totalPages <= 0) {
      return [1];
    }
    
    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 3, totalPages - 1);
      
      if (endPage - startPage < MAX_VISIBLE_PAGES - 3) {
        startPage = Math.max(endPage - (MAX_VISIBLE_PAGES - 3), 2);
      }
      
      if (startPage > 2) {
        pages.push(-1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push(-2);
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white hover:text-emerald-100 transition-colors">
              <ChevronRight size={24} />
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-1">الحديث الشريف</h1>
              <p className="text-emerald-100 text-sm">كنوز من السنة النبوية المطهرة</p>
            </div>
            <div className="w-6"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Book Selection Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">اختر كتاب الحديث</h3>
                  <p className="text-sm text-gray-600">من مصادر السنة الصحيحة</p>
                </div>
              </div>
              <Select value={currentBook} onValueChange={handleBookChange}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white border-2 border-emerald-200 focus:border-emerald-500">
                  <SelectValue placeholder="اختر كتاب" />
                </SelectTrigger>
                <SelectContent>
                  {HADITH_BOOKS.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Search Results Indicator */}
        {searchResults && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-center gap-3">
              <Search className="text-blue-600" size={20} />
              <span className="text-blue-800 font-medium">عرض نتائج البحث ({searchResults.length} حديث)</span>
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm underline transition-colors" 
                onClick={() => setSearchResults(null)}
              >
                العودة للعرض العادي
              </button>
            </div>
          </div>
        )}
        
        {/* Main Hadith Card */}
        <Card className="mb-8 shadow-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
          {isLoading && !searchResults && (
            <CardContent className="p-12 flex justify-center items-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center">
                  <Loader2 className="text-white animate-spin" size={32} />
                </div>
                <p className="text-gray-600 text-lg">جاري تحميل الأحاديث الشريفة...</p>
              </div>
            </CardContent>
          )}
          
          {isError && !searchResults && (
            <CardContent className="p-12 text-center min-h-[400px] flex flex-col justify-center items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <Book className="text-red-500" size={32} />
              </div>
              <div className="text-red-600 text-lg font-medium mb-4">
                حدث خطأ في تحميل الأحاديث
              </div>
              <button
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                onClick={() => refetch()}
              >
                إعادة المحاولة
              </button>
            </CardContent>
          )}
          
          {((searchResults && searchResults.length > 0) || 
           (!isLoading && !isError && hadithData?.data?.hadiths?.length > 0)) && (
            <>
              <CardHeader className="text-center pb-4 bg-gradient-to-r from-slate-50 to-gray-50">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 flex items-center justify-center shadow-lg">
                    <Book className="text-white" size={36} />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-800">
                  {searchResults ? "نتائج البحث" : HADITH_BOOKS.find(book => book.id === currentBook)?.name}
                </CardTitle>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mt-2"></div>
              </CardHeader>
            
              <CardContent className="p-8">
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-8 mb-8 border border-emerald-100">
                  <div className="text-right arabic-text text-2xl leading-loose text-gray-800 font-medium">
                    {currentHadith?.arab}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                    <Book size={16} className="text-gray-600" />
                    <span className="arabic-text text-gray-700 font-medium">
                      حديث رقم: {currentHadith?.number}
                    </span>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-12">
                  <button 
                    onClick={prevHadith}
                    disabled={!((searchResults && searchResults.length > 0) || hadithData?.data?.hadiths?.length)}
                    className="group w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ChevronLeft className="text-white group-hover:scale-110 transition-transform" size={24} />
                  </button>
                  
                  <div className="text-center bg-white rounded-full px-6 py-2 shadow-md border border-gray-200">
                    <span className="text-gray-600 font-medium">
                      {searchResults 
                        ? `${currentIndex + 1} / ${searchResults.length}` 
                        : hadithData?.data?.hadiths?.length 
                          ? `${currentIndex + 1} / ${hadithData.data.hadiths.length}` 
                          : "0 / 0"}
                    </span>
                  </div>
                  
                  <button 
                    onClick={nextHadith}
                    disabled={!((searchResults && searchResults.length > 0) || hadithData?.data?.hadiths?.length)}
                    className="group w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ChevronRight className="text-white group-hover:scale-110 transition-transform" size={24} />
                  </button>
                </div>
              </CardContent>
            </>
          )}
          
          {!isLoading && !isError && !searchResults && 
           (!hadithData?.data?.hadiths || hadithData.data.hadiths.length === 0) && (
            <CardContent className="p-12 text-center min-h-[300px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                  <Book className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-600 text-lg">لا توجد أحاديث متاحة</p>
              </div>
            </CardContent>
          )}
          
          {searchResults && searchResults.length === 0 && (
            <CardContent className="p-12 text-center min-h-[300px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                  <Search className="text-blue-400" size={32} />
                </div>
                <p className="text-gray-600 text-lg">لا توجد نتائج للبحث</p>
              </div>
            </CardContent>
          )}
        </Card>
        
        {/* Pagination */}
        {!isLoading && !isError && !searchResults && totalPages > 1 && (
          <div className="mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <Pagination>
                  <PaginationContent dir="ltr">
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:bg-emerald-50 hover:text-emerald-600"}
                      />
                    </PaginationItem>
                    
                    {generatePagination().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === -1 || page === -2 ? (
                          <span className="px-2">...</span>
                        ) : (
                          <PaginationLink 
                            isActive={page === currentPage}
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? "bg-emerald-500 text-white" : "hover:bg-emerald-50 hover:text-emerald-600"}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-emerald-50 hover:text-emerald-600"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button 
            className="group py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setSearchDialogOpen(true)}
          >
            <div className="flex items-center justify-center gap-3">
              <Search className="group-hover:scale-110 transition-transform" size={20} />
              <span>البحث في الأحاديث</span>
            </div>
          </button>
          
          <button 
            className="group py-4 px-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              toast({
                title: "تم الحفظ ♥",
                description: "تم حفظ الحديث في المفضلة",
              });
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <Heart className="group-hover:scale-110 transition-transform" size={20} />
              <span>حفظ الحديث</span>
            </div>
          </button>
        </div>
      </div>
      
      <HadithSearchDialog 
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
        currentBook={currentBook}
        onSearchResults={handleSearchResults}
      />
      
      <BottomNavigation />
    </div>
  );
};

export default HadithPage;
