
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AppInfoCard = () => {
  return (
    <Card className="mb-6 border-0 shadow-sm rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="p-4 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30">
          <h2 className="font-bold text-lg text-right arabic-text text-blue-700 dark:text-blue-300">معلومات التطبيق</h2>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="font-medium">1.0.0</span>
            <span className="text-gray-500 dark:text-gray-400">الإصدار</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="font-medium">كرطوش محمد أنيس</span>
            <span className="text-gray-500 dark:text-gray-400">المطور</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium">2025/04/04</span>
            <span className="text-gray-500 dark:text-gray-400">تاريخ التحديث</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppInfoCard;
