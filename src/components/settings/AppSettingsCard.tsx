
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { ISLAMIC_THEMES, IslamicTheme } from "@/themes/islamic-themes";

interface AppSettingsCardProps {
  darkMode: boolean;
  onDarkModeChange: () => void;
  selectedTheme: string;
  onThemeChange: (value: string) => void;
}

const AppSettingsCard: React.FC<AppSettingsCardProps> = ({
  darkMode,
  onDarkModeChange,
  selectedTheme,
  onThemeChange,
}) => {
  return (
    <Card className="mb-4 border-0 shadow-sm rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="p-4 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30">
          <h2 className="font-bold text-lg text-right arabic-text text-blue-700 dark:text-blue-300">
            إعدادات التطبيق
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {/* الوضع الليلي فقط */}
          <div className="flex items-center justify-between p-4 hover:bg-sky-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center">
              <Switch 
                checked={darkMode} 
                onCheckedChange={onDarkModeChange}
                className="data-[state=checked]:bg-blue-500" 
              />
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-3">
                <h3 className="font-medium text-right arabic-text">
                  الوضع الليلي
                </h3>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500">
                  {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
                تغيير مظهر التطبيق
              </p>
            </div>
          </div>
          {/* اختيار الثيم */}
          <div className="p-4">
            <label className="block mb-2 font-medium text-right arabic-text">
              ثيم واجهة التطبيق
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ISLAMIC_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  aria-label={`اختر ثيم ${theme.name}`}
                  type="button"
                  className={`flex items-center gap-3 rounded-xl border-2 p-2 hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-blue-300 group ${
                    selectedTheme === theme.id
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-200 dark:border-gray-700"
                  } ${theme.preview.bg}`}
                  onClick={() => onThemeChange(theme.id)}
                >
                  <div className={`w-10 h-10 rounded-lg mr-2 shadow-md ${theme.preview.accent} flex items-center justify-center`}>
                  </div>
                  <div className="text-right flex-1">
                    <div className={`arabic-text font-semibold mb-1 text-base ${theme.preview.text}`}>
                      {theme.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 arabic-text">{theme.description}</div>
                  </div>
                  {selectedTheme === theme.id && (
                    <span className="ml-2 text-blue-600 dark:text-blue-300 font-bold arabic-text">محدد</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppSettingsCard;
