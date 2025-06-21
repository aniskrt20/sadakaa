import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { enhancedNotificationService } from "@/services/enhanced-notification-service";

// Import all pages
import Index from "./pages/Index";
import AdhkarPage from "./pages/AdhkarPage";
import HadithPage from "./pages/HadithPage";
import TasbihPage from "./pages/TasbihPage";
import DuasPage from "./pages/DuasPage";
import RadioPage from "./pages/RadioPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import FullQuranPage from "./pages/FullQuranPage";
import QuranSurahPage from "./pages/QuranSurahPage";
import VideosPage from "./pages/VideosPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CopyrightPage from "./pages/CopyrightPage";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component loading...");
  
  useEffect(() => {
    // طلب إذن الإشعارات عند أول تشغيل
    const requestNotificationPermissionOnFirstLoad = async () => {
      // تحقق مما إذا كان الطلب قد تم إرساله من قبل
      const permissionRequestedBefore = localStorage.getItem('notificationPermissionRequested');

      if (!permissionRequestedBefore && enhancedNotificationService.isSupported()) {
        const status = enhancedNotificationService.getPermissionStatus();
        
        // اطلب الإذن فقط إذا كان في الحالة الافتراضية
        if (status.permission === 'default') {
          console.log('Requesting notification permission for the first time...');
          await enhancedNotificationService.requestPermission();
        }
        
        // ضع علامة على أنه تم طلب الإذن لتجنب الطلبات المتكررة
        localStorage.setItem('notificationPermissionRequested', 'true');
      }
    };
    
    requestNotificationPermissionOnFirstLoad();

    console.log("App useEffect running...");
    // إزالة الكلاس لضمان أن الوضع الفاتح هو الافتراضي
    document.documentElement.classList.remove('dark');
    
    // تخزين التفضيل في localStorage
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    } else if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  console.log("App rendering...");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/copyright" element={<CopyrightPage />} />
            <Route path="/adhkar" element={<AdhkarPage />} />
            <Route path="/hadith" element={<HadithPage />} />
            <Route path="/tasbih" element={<TasbihPage />} />
            <Route path="/duas" element={<DuasPage />} />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/quran" element={<FullQuranPage />} />
            <Route path="/quran/surah/:surahId" element={<QuranSurahPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
