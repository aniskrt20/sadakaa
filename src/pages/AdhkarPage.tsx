
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Plus, Minus, Sparkles, Star, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { dhikrCategories } from "@/data/adhkar";
import BottomNavigation from "@/components/BottomNavigation";

// Type-safe counter object definition
interface CounterState {
  [key: string]: number;
}

const AdhkarPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("morning");
  const [counters, setCounters] = useState<CounterState>({});
  const { toast } = useToast();

  useEffect(() => {
    // Reset counters when category changes
    resetCounters();
  }, [activeCategory]);

  const resetCounters = () => {
    const initialCounters: CounterState = {};
    const currentCategory = dhikrCategories.find(cat => cat.id === activeCategory);
    if (currentCategory) {
      currentCategory.adhkar.forEach((dhikr) => {
        initialCounters[dhikr.id.toString()] = dhikr.count || 1;
      });
    }
    setCounters(initialCounters);
  };

  const handleIncrement = (id: number) => {
    const strId = id.toString();
    setCounters((prev) => ({
      ...prev,
      [strId]: Math.max(0, (prev[strId] || 0) - 1)
    }));

    if (counters[strId] === 1) {
      toast({
        title: "أحسنت!",
        description: "تم إكمال هذا الذكر",
      });
    }
  };

  const handleReset = (id: number) => {
    const strId = id.toString();
    const currentCategory = dhikrCategories.find(cat => cat.id === activeCategory);
    if (currentCategory) {
      const originalCount = currentCategory.adhkar.find(
        (dhikr) => dhikr.id === id
      )?.count || 1;
      
      setCounters((prev) => ({
        ...prev,
        [strId]: originalCount
      }));
    }
  };

  const getCompletedCount = () => {
    const currentCategory = dhikrCategories.find(cat => cat.id === activeCategory);
    return currentCategory ? 
      currentCategory.adhkar.filter((dhikr) => counters[dhikr.id.toString()] === 0).length : 0;
  };

  const getTotalCount = () => {
    const currentCategory = dhikrCategories.find(cat => cat.id === activeCategory);
    return currentCategory ? currentCategory.adhkar.length : 0;
  };

  const getProgressPercentage = () => {
    const completed = getCompletedCount();
    const total = getTotalCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const currentCategory = dhikrCategories.find(cat => cat.id === activeCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pb-16 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full blur-sm"></div>
            </div>
          ))}
        </div>
        
        {/* Large Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/30 to-teal-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-400/30 to-rose-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-violet-400/30 to-purple-500/30 rounded-full blur-2xl animate-bounce" style={{animationDuration: '5s', animationDelay: '4s'}}></div>
      </div>

      {/* Glass Morphism Overlay */}
      <div className="fixed inset-0 backdrop-blur-sm bg-gradient-to-br from-black/10 via-transparent to-black/5"></div>

      <div className="relative z-10">
        {/* Modern Floating Header */}
        <div className="relative">
          {/* Background with animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/20 to-blue-500/20"></div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-green-300/20 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
          
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
                      الأذكار
                    </h1>
                    <Sparkles className="text-yellow-300 animate-pulse animation-delay-2000" size={28} />
                  </div>
                  <p className="text-white/80 text-lg font-medium">اذكار المسلم في اليوم والليلة</p>
                </div>
                
                <div className="w-20"></div>
              </div>

              {/* Modern Category Selection */}
              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-700"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6">
                  <div className="flex justify-center">
                    <div className="flex gap-3 flex-wrap justify-center">
                      {dhikrCategories.map(category => (
                        <button 
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`px-6 py-3 rounded-2xl font-medium transition-all duration-500 transform hover:scale-110 ${
                            activeCategory === category.id 
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-2xl" 
                              : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-xl"
                          }`}
                        >
                          {category.nameAr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Modern Progress Section */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-700"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                    <Star className="text-white" size={20} />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-800">إجمالي الإنجاز</span>
                    <p className="text-sm text-gray-600">{getCompletedCount()} من {getTotalCount()} أذكار</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    {getProgressPercentage()}%
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 transition-all duration-1000 shadow-lg"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              
              <button 
                onClick={resetCounters}
                className="group flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-emerald-400 group-hover:to-teal-500 flex items-center justify-center transition-all duration-300">
                  <Plus className="group-hover:text-white transition-colors duration-300" size={16} />
                </div>
                إعادة ضبط الكل
              </button>
            </div>
          </div>
          
          {/* Modern Adhkar Cards */}
          <div className="space-y-6">
            {currentCategory && currentCategory.adhkar.map((dhikr, index) => (
              <div key={dhikr.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
                <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header with counter and source */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-emerald-100">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                            <span className="text-white font-bold text-xl">
                              {counters[dhikr.id.toString()] > 0 ? counters[dhikr.id.toString()] : "✓"}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Heart className="text-emerald-500" size={16} />
                              <span className="text-sm font-medium text-emerald-700">
                                ذكر رقم {index + 1}
                              </span>
                            </div>
                            {dhikr.source && (
                              <span className="text-xs text-gray-500 bg-white/70 px-3 py-1 rounded-full">
                                المصدر: {dhikr.source}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {counters[dhikr.id.toString()] === 0 && (
                          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-lg">
                            <Star className="animate-pulse" size={16} />
                            <span className="text-sm font-medium">مكتمل</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="p-6">
                      <p className="text-right leading-relaxed arabic-text text-lg text-gray-800 mb-4 font-medium">
                        {dhikr.text}
                      </p>
                      
                      {dhikr.translation && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4 border border-blue-100">
                          <p className="text-right text-sm text-gray-600 leading-relaxed">{dhikr.translation}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex">
                      <button 
                        onClick={() => handleReset(dhikr.id)}
                        className="flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white p-4 flex-1 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={counters[dhikr.id.toString()] === (dhikr.count || 1)}
                      >
                        <Plus className="mx-2" size={20} />
                        <span className="font-medium">إعادة</span>
                      </button>
                      <button 
                        onClick={() => handleIncrement(dhikr.id)}
                        className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-4 flex-1 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={counters[dhikr.id.toString()] <= 0}
                      >
                        <Minus className="mx-2" size={20} />
                        <span className="font-medium">تسبيح</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pb-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AdhkarPage;
