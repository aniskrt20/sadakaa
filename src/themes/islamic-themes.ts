
export type IslamicTheme = {
  id: string;
  name: string;
  description: string;
  className: string;
  preview: {
    bg: string;
    accent: string;
    border: string;
    text: string;
  };
};

export const ISLAMIC_THEMES: IslamicTheme[] = [
  {
    id: "default",
    name: "افتراضي هادئ",
    description: "ألوان سماوية مريحة وعصرية.",
    className: "",
    preview: {
      bg: "bg-sky-50 dark:bg-gray-900",
      accent: "bg-blue-500",
      border: "border-blue-200",
      text: "text-blue-700 dark:text-blue-300",
    },
  },
  {
    id: "medina-green",
    name: "أخضر المدينة",
    description: "ثيم أخضر مستوحى من المسجد النبوي.",
    className: "theme-medina-green",
    preview: {
      bg: "bg-[#e6f4ee] dark:bg-[#193523]",
      accent: "bg-[#006E3B]",
      border: "border-[#80cba9]",
      text: "text-[#006E3B] dark:text-[#d4fadf]",
    },
  },
  {
    id: "dome-gold",
    name: "قبّة ذهبية",
    description: "ألوان ذهبية داكنة مستوحاة من قبة الصخرة.",
    className: "theme-dome-gold",
    preview: {
      bg: "bg-[#fcf8e8] dark:bg-[#3d3310]",
      accent: "bg-[#CBB26A]",
      border: "border-[#CBB26A]",
      text: "text-[#a1843c] dark:text-[#ffeaa7]",
    },
  },
  {
    id: "kaaba-black",
    name: "الكعبة الأسود",
    description: "أسود أنيق بلمسة ذهبية وقيم جمالية عالية.",
    className: "theme-kaaba-black",
    preview: {
      bg: "bg-[#181818] dark:bg-[#20201b]",
      accent: "bg-[#CBB26A]",
      border: "border-[#443402]",
      text: "text-[#CBB26A]",
    },
  }
];
