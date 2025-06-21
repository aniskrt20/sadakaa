
import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Gift, Heart, Radio, Scroll, Video, Info, Shield, Copyright } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceItem {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  path: string;
}

const services: ServiceItem[] = [
  {
    id: "adhkar",
    name: "Adhkar",
    nameAr: "الأذكار",
    icon: <Scroll size={24} />,
    color: "#059669",
    bgColor: "from-emerald-500 to-teal-600",
    path: "/adhkar"
  },
  {
    id: "radio",
    name: "Radio", 
    nameAr: "الإذاعات",
    icon: <Radio size={24} />,
    color: "#0891b2",
    bgColor: "from-cyan-500 to-blue-600",
    path: "/radio"
  },
  {
    id: "videos",
    name: "Videos",
    nameAr: "قناة القرآن",
    icon: <Video size={24} />,
    color: "#7c3aed",
    bgColor: "from-violet-500 to-purple-600",
    path: "/videos"
  },
  {
    id: "hadith",
    name: "Hadith",
    nameAr: "الحديث",
    icon: <BookOpen size={24} />,
    color: "#dc2626",
    bgColor: "from-red-500 to-rose-600",
    path: "/hadith"
  },
  {
    id: "tasbih",
    name: "Tasbih",
    nameAr: "التسبيح",
    icon: <Gift size={24} />,
    color: "#ea580c",
    bgColor: "from-orange-500 to-amber-600",
    path: "/tasbih"
  },
  {
    id: "about",
    name: "About",
    nameAr: "من نحن",
    icon: <Info size={24} />,
    color: "#0369a1",
    bgColor: "from-blue-500 to-indigo-600",
    path: "/about"
  },
  {
    id: "privacy",
    name: "Privacy",
    nameAr: "سياسة الخصوصية",
    icon: <Shield size={24} />,
    color: "#15803d",
    bgColor: "from-green-500 to-emerald-600",
    path: "/privacy"
  },
  {
    id: "copyright",
    name: "Copyright",
    nameAr: "حقوق النشر",
    icon: <Copyright size={24} />,
    color: "#be185d",
    bgColor: "from-pink-500 to-rose-600",
    path: "/copyright"
  }
];

const QuickServices = () => {
  return (
    <div className="w-full">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-1 w-16"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white arabic-text px-4">الخدمات السريعة</h2>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-1 w-16"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <Link to={service.path} key={service.id}>
            <div 
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.bgColor} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                {/* Service Name */}
                <p className="text-lg font-semibold arabic-text text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {service.nameAr}
                </p>
                
                {/* Hover Effect Border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.bgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickServices;
