import React from "react";
import { ArrowLeft, Heart, Star, Clock, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen pb-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-cyan-100/40 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-cyan-950/60"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-30 dark:opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <div 
                className="w-1 h-1 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse"
                style={{
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-6 px-4 pb-4">
          {/* Back to Home Link */}
          <Link 
            to="/" 
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 ml-2" />
            <span className="font-medium">العودة للرئيسية</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
              من نحن
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-6">
          {/* Main Content Card */}
          <div className="transform hover:scale-[1.02] transition-all duration-500">
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-700/30 shadow-2xl shadow-emerald-500/10">
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
              
              <div className="p-8">
                {/* App Icon */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Main Description */}
                <div className="text-center mb-8">
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 arabic-text">
                    تطبيق ديني يجمع بين الأذكار، الأدعية، مواقيت الصلاة، مع إشعارات تنبيهية حسب التوقيت المحلي. هدفنا تسهيل العبادة اليومية للمستخدم المسلم.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/30 dark:border-emerald-700/30">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">مواقيت الصلاة</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">أوقات دقيقة حسب موقعك</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200/30 dark:border-teal-700/30">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center">
                      <Bell className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-teal-800 dark:text-teal-200">إشعارات ذكية</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تنبيهات للأذان والأذكار</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200/30 dark:border-cyan-700/30">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-800 dark:text-cyan-200">أذكار وأدعية</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">مجموعة شاملة من الأذكار</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/30 dark:border-blue-700/30">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200">سهولة الاستخدام</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تصميم بسيط ومريح</p>
                    </div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/30 dark:border-emerald-700/30">
                  <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-3">
                    رسالتنا
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 arabic-text">
                    نسعى لتوفير تطبيق شامل يساعد المسلمين في أداء عباداتهم اليومية بسهولة ويسر، مع الحفاظ على الأصالة والدقة في المحتوى الديني.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* روابط للصفحات القانونية بالأسفل */}
          <div className="mt-8 flex flex-col items-center gap-3 text-md">
            <Link 
              to="/privacy"
              className="text-emerald-700 dark:text-emerald-300 hover:underline font-medium"
            >
              سياسة الخصوصية
            </Link>
            <Link 
              to="/copyright"
              className="text-emerald-700 dark:text-emerald-300 hover:underline font-medium"
            >
              حقوق النشر
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
