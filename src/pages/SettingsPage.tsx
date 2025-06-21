
import React, { useState, useEffect } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { useToast } from "@/components/ui/use-toast";
import { 
  SettingsHeader, 
  AppSettingsCard, 
  AppInfoCard, 
  ActionButtons 
} from '@/components/settings';
import { ISLAMIC_THEMES } from "@/themes/islamic-themes";

const THEME_KEY = "theme";
const APP_THEME_KEY = "app-theme";

const SettingsPage = () => {
  console.log("SettingsPage component is loading...");

  const [darkMode, setDarkMode] = useState(false);
  const [readmeDialogOpen, setReadmeDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const { toast } = useToast();
  
  // تطبيق الثيم المختار على الجذر
  const applyTheme = (themeId: string) => {
    // إزالة جميع كلاس الثيمات
    ISLAMIC_THEMES.forEach((theme) => {
      if (theme.className)
        document.documentElement.classList.remove(theme.className);
    });
    // إضافة كلاس الثيم الجديد إذا كان موجودا
    const newTheme = ISLAMIC_THEMES.find((t) => t.id === themeId);
    if (newTheme?.className) {
      document.documentElement.classList.add(newTheme.className);
    }
  };

  useEffect(() => {
    console.log("SettingsPage useEffect running...");
    // الوضع الداكن
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    // اختيار الثيم
    const savedAppTheme = localStorage.getItem(APP_THEME_KEY) || "default";
    setSelectedTheme(savedAppTheme);
    applyTheme(savedAppTheme);
  }, []);
  
  const toggleDarkMode = () => {
    console.log("Toggling dark mode...");
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    localStorage.setItem(APP_THEME_KEY, themeId);
    applyTheme(themeId);
    toast({
      title: "تم تغيير الثيم",
      description: "تم تطبيق الثيم الجديد بنجاح",
      duration: 1700,
    });
  };

  console.log("SettingsPage rendering...");

  return (
    <div className="min-h-screen pb-28 bg-sky-50 dark:bg-gray-900">
      <SettingsHeader />
      <div className="container mx-auto px-4 py-6">
        <AppSettingsCard 
          darkMode={darkMode}
          onDarkModeChange={toggleDarkMode}
          selectedTheme={selectedTheme}
          onThemeChange={handleThemeChange}
        />
        <AppInfoCard />
        <ActionButtons 
          readmeDialogOpen={readmeDialogOpen}
          onReadmeDialogChange={setReadmeDialogOpen}
        />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;
