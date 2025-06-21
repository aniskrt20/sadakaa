
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, RefreshCw } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const TasbihPage = () => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTaskbih, setActiveTaskbih] = useState("");
  
  const incrementCount = () => {
    setCount(count + 1);
    setTotalCount(totalCount + 1);
  };
  
  const resetCount = () => {
    setCount(0);
    toast({
      title: "تم إعادة ضبط العداد",
      description: "تم إعادة ضبط العداد إلى صفر"
    });
  };

  const tasbihOptions = [
    { id: "subhanallah", text: "سبحان الله", translation: "Glory be to Allah" },
    { id: "alhamdulillah", text: "الحمد لله", translation: "Praise be to Allah" },
    { id: "allahuakbar", text: "الله أكبر", translation: "Allah is the Greatest" },
    { id: "lailahaillallah", text: "لا إله إلا الله", translation: "There is no god but Allah" },
    { id: "lahawla", text: "لا حول ولا قوة إلا بالله", translation: "There is no power nor strength except with Allah" },
    { id: "astaghfirullah", text: "أستغفر الله", translation: "I seek forgiveness from Allah" }
  ];

  const selectTasbih = (tasbih: typeof tasbihOptions[0]) => {
    setActiveTaskbih(tasbih.id);
    setCount(0);
    toast({
      title: "تم اختيار التسبيح",
      description: `تم اختيار: ${tasbih.text}`
    });
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="islamic-gradient text-white p-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white">
            <ChevronRight />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">التسبيح</h1>
          <div className="w-5"></div> {/* Empty space for balance */}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="text-4xl font-bold mb-2">{count}</div>
            <div className="text-sm text-gray-500 mb-4">المجموع الكلي: {totalCount}</div>
            {activeTaskbih && (
              <div className="text-lg font-semibold mb-4 text-sky-600 arabic-text">
                {tasbihOptions.find(t => t.id === activeTaskbih)?.text || ""}
              </div>
            )}
            
            <button 
              className="w-32 h-32 rounded-full islamic-gradient text-white shadow-lg mb-8 transition-transform hover:scale-105 active:scale-95"
              onClick={incrementCount}
            >
              <div className="arabic-text text-xl">اضغط</div>
            </button>
            
            <button 
              className="flex items-center text-gray-500 hover:text-sky-600 transition-colors"
              onClick={resetCount}
            >
              <RefreshCw size={16} className="mr-1" />
              <span>إعادة ضبط</span>
            </button>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-bold mb-4 text-right">اختر التسبيح</h2>
        <div className="grid grid-cols-2 gap-3">
          {tasbihOptions.map((option) => (
            <Card 
              key={option.id}
              className={`hover:shadow-md transition-all cursor-pointer ${activeTaskbih === option.id ? 'bg-sky-50 border-sky-200 dark:bg-sky-900/20 dark:border-sky-800' : ''}`}
              onClick={() => selectTasbih(option)}
            >
              <CardContent className="p-3">
                <p className="text-center arabic-text mb-1">{option.text}</p>
                <p className="text-xs text-gray-500 text-center">{option.translation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default TasbihPage;
