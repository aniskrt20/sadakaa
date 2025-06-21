
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Radio, Scroll, Settings, BookOpen } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    // More precise check to avoid '/' matching every path
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(`${path}/`));
  };

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "الرئيسية",
      color: "from-emerald-500 to-teal-600",
      isMainHome: true
    },
    {
      path: "/quran",
      icon: BookOpen,
      label: "المصحف",
      color: "from-blue-500 to-indigo-600",
      isMainHome: false
    },
    {
      path: "/adhkar",
      icon: Scroll,
      label: "الأذكار",
      color: "from-purple-500 to-violet-600",
      isMainHome: false
    },
    {
      path: "/radio",
      icon: Radio,
      label: "الإذاعات",
      color: "from-orange-500 to-red-600",
      isMainHome: false
    },
    {
      path: "/settings",
      icon: Settings,
      label: "الإعدادات",
      color: "from-gray-500 to-slate-600",
      isMainHome: false
    }
  ];

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2">
      <div
        className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl rounded-full shadow-2xl shadow-gray-900/10 dark:shadow-black/30 border border-white/30 dark:border-gray-800/50"
      >
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // This logic correctly identifies the active tab, including the special case for the home page.
            const active = item.isMainHome
              ? location.pathname === "/"
              : isActive(item.path);
            
            // A simple way to get the primary text color from the gradient classes
            const fromColorClass = item.color.split(" ")[0]; // e.g., "from-emerald-500"
            const textColorClass = fromColorClass.replace("from-", "text-"); // e.g., "text-emerald-500"

            return (
              <Link
                key={item.path}
                to={item.path}
                className="group relative flex flex-col items-center justify-center w-16 h-16 text-center transition-all duration-300 rounded-full"
              >
                <div
                  className={`flex flex-col items-center justify-center transition-all duration-300 transform-gpu ${
                    active ? "-translate-y-2" : "translate-y-0"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 transform-gpu ${
                      active
                        ? `bg-gradient-to-br ${item.color} text-white shadow-md scale-110`
                        : "text-gray-500 dark:text-gray-400 group-hover:bg-gray-200/60 dark:group-hover:bg-gray-800/60"
                    }`}
                  >
                    <Icon
                      size={20}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <span
                    className={`text-xs mt-1.5 font-semibold arabic-text transition-all duration-300 ${
                      active
                        ? `opacity-100 ${textColorClass} dark:text-white/90`
                        : "opacity-100 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
