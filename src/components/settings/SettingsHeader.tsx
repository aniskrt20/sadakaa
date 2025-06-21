
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Settings as SettingIcon } from 'lucide-react';

const SettingsHeader = () => {
  return (
    <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white p-6 rounded-b-2xl shadow-md">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
          <SettingIcon size={20} />
        </div>
        <h1 className="text-xl font-bold text-center flex-1 arabic-text">الإعدادات</h1>
        <Link 
          to="/" 
          className="text-white hover:bg-white/20 p-2 rounded-full transition-all"
          onClick={() => console.log("Navigating to home...")}
        >
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default SettingsHeader;
