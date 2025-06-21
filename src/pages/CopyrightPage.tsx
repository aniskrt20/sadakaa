
import React from "react";
import { ArrowLeft, Copyright } from "lucide-react";
import { Link } from "react-router-dom";

const CopyrightPage = () => (
  <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950">
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <Link to="/about" className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="w-6 h-6 ml-2" />
          <span className="font-medium">العودة لمن نحن</span>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4 text-center flex items-center justify-center gap-2">
        <Copyright className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
        حقوق النشر
      </h1>
      <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow islamic-card text-right arabic-text space-y-4">
        <p>
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()}.
        </p>
        <p>
          جميع المصادر الدينية (أذكار، أحاديث، نصوص قرآن) مأخوذة من مصادر موثوقة وتستخدم في التطبيق لأغراض غير ربحية وللنفع العام.
        </p>
        <p>
          يُمنع إعادة نشر أو توزيع محتوى التطبيق لأغراض تجارية دون إذن كتابي من فريق العمل.
        </p>
        <p>
          لأي استفسار أو تواصل مع إدارة التطبيق يمكن الرجوع إلى صفحة "من نحن".
        </p>
      </div>
    </div>
  </div>
);

export default CopyrightPage;
