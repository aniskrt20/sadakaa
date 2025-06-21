
export interface Quote {
  id: number;
  text: string;
  author: string;
  source?: string;
}

export const scholarQuotes: Quote[] = [
  {
    id: 1,
    text: "ليس الخبر كالمعاينة",
    author: "الإمام علي بن أبي طالب رضي الله عنه",
    source: "نهج البلاغة"
  },
  {
    id: 2,
    text: "من صمت نجا",
    author: "الإمام الشافعي",
    source: "الرسالة"
  },
  {
    id: 3,
    text: "الصبر مفتاح الفرج",
    author: "الإمام الغزالي",
    source: "إحياء علوم الدين"
  },
  {
    id: 4,
    text: "من جد وجد",
    author: "ابن القيم",
    source: "مدارج السالكين"
  },
  {
    id: 5,
    text: "حسن الخلق نصف الدين",
    author: "الإمام مالك",
    source: "الموطأ"
  },
  {
    id: 6,
    text: "المرء مع من أحب",
    author: "الإمام أحمد",
    source: "المسند"
  },
  {
    id: 7,
    text: "العلم في الصغر كالنقش على الحجر",
    author: "الإمام النووي",
    source: "رياض الصالحين"
  }
];

export const hadithQuotes: Quote[] = [
  {
    id: 1,
    text: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى",
    author: "النبي محمد ﷺ",
    source: "البخاري ومسلم"
  },
  {
    id: 2,
    text: "المسلم من سلم المسلمون من لسانه ويده",
    author: "النبي محمد ﷺ",
    source: "البخاري"
  },
  {
    id: 3,
    text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    author: "النبي محمد ﷺ",
    source: "البخاري ومسلم"
  },
  {
    id: 4,
    text: "من حسن إسلام المرء تركه ما لا يعنيه",
    author: "النبي محمد ﷺ",
    source: "الترمذي"
  },
  {
    id: 5,
    text: "خيركم من تعلم القرآن وعلمه",
    author: "النبي محمد ﷺ",
    source: "البخاري"
  },
  {
    id: 6,
    text: "الدين النصيحة",
    author: "النبي محمد ﷺ",
    source: "مسلم"
  },
  {
    id: 7,
    text: "اتق الله حيثما كنت وأتبع السيئة الحسنة تمحها وخالق الناس بخلق حسن",
    author: "النبي محمد ﷺ",
    source: "الترمذي"
  }
];
