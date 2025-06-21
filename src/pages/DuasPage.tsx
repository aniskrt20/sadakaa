
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";

const DuasPage = () => {
  const duas = [
    {
      id: 1,
      title: "دعاء الصباح",
      text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
      translation: "O Allah, by You we have reached the morning and by You we have reached the evening, by You we live and by You we die, and to You is the resurrection."
    },
    {
      id: 2,
      title: "دعاء قبل الطعام",
      text: "بِسْمِ اللهِ",
      translation: "In the name of Allah."
    },
    {
      id: 3,
      title: "دعاء بعد الطعام",
      text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَجَعَلَنَا مِنَ الْمُسْلِمِينَ",
      translation: "Praise be to Allah Who has given us food and drink and made us among the Muslims."
    },
    {
      id: 4,
      title: "دعاء دخول المسجد",
      text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      translation: "O Allah, open the gates of Your mercy for me."
    },
    {
      id: 5,
      title: "دعاء الخروج من المسجد",
      text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      translation: "O Allah, I ask for Your bounty."
    },
    {
      id: 6,
      title: "دعاء السفر",
      text: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
      translation: "O Allah, we ask You on this journey of ours for righteousness and piety, and deeds which please You. O Allah, make this journey of ours easy for us and make its distance short."
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      <div className="islamic-gradient text-white p-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white">
            <ChevronRight />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">الأجر والثواب</h1>
          <div className="w-5"></div> {/* Empty space for balance */}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <div className="flex p-4 items-center">
            <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mr-4">
              <Heart className="text-pink-500" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-right arabic-text">صدقة جارية</h2>
              <p className="text-sm text-gray-500 text-right">مساهمتك في نشر الخير</p>
            </div>
          </div>
          <CardContent className="pt-0 pb-4 px-4">
            <button className="w-full py-3 islamic-gradient text-white rounded-lg font-medium">
              شارك التطبيق
            </button>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-bold mb-4 text-right">أدعية مأثورة</h2>
        <div className="space-y-4">
          {duas.map((dua) => (
            <Card 
              key={dua.id}
              className="hover:shadow-md transition-all"
            >
              <CardContent className="p-4">
                <h3 className="font-medium text-right arabic-text mb-2">{dua.title}</h3>
                <p className="text-right arabic-text mb-2 leading-relaxed">{dua.text}</p>
                <p className="text-xs text-gray-500">{dua.translation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default DuasPage;
