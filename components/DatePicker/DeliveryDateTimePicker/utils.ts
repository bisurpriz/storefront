import { format } from "date-fns";

interface SpecialDay {
  date: Date;
  title: string;
  description?: string;
  type?: "gift" | "holiday" | "religious";
  icon?: string;
  buttonStyle?: {
    background?: string;
    textColor?: string;
    borderColor?: string;
    icon?: string;
  };
}

export const getSpecialDays = (year: number): SpecialDay[] => [
  // Hediye Günleri
  {
    date: new Date(year, 1, 14),
    title: "Sevgililer Günü",
    description: "Sevdikleriniz için özel hediyeler",
    type: "gift",
    buttonStyle: {
      background: "bg-gradient-to-r from-pink-100 to-pink-50",
      textColor: "text-pink-700",
      borderColor: "border-pink-300",
      icon: "❤️",
    },
  },
  {
    date: new Date(year, 4, 8 + (7 - new Date(year, 4, 8).getDay())), // Gets second Sunday of May
    title: "Anneler Günü",
    description: "Anneler için özel hediyeler",
    type: "gift",
    buttonStyle: {
      background: "bg-gradient-to-r from-purple-100 to-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-300",
      icon: "🌸",
    },
  },
  {
    date: new Date(year, 5, 18),
    title: "Babalar Günü",
    description: "Babalar için özel hediyeler",
    type: "gift",
    buttonStyle: {
      background: "bg-gradient-to-r from-blue-100 to-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-300",
      icon: "👔",
    },
  },
  {
    date: new Date(year, 10, 24),
    title: "Öğretmenler Günü",
    description: "Öğretmenler için özel hediyeler",
    type: "gift",
    buttonStyle: {
      background: "bg-gradient-to-r from-emerald-100 to-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-300",
      icon: "📚",
    },
  },

  // Resmi Tatiller
  { date: new Date(year, 0, 1), title: "Yılbaşı", type: "holiday" },
  {
    date: new Date(year, 3, 23),
    title: "23 Nisan",
    description: "Ulusal Egemenlik ve Çocuk Bayramı",
  },
  { date: new Date(year, 4, 1), title: "1 Mayıs", description: "İşçi Bayramı" },
  {
    date: new Date(year, 4, 19),
    title: "19 Mayıs",
    description: "Atatürk'ü Anma, Gençlik ve Spor Bayramı",
  },
  {
    date: new Date(year, 7, 30),
    title: "30 Ağustos",
    description: "Zafer Bayramı",
  },
  {
    date: new Date(year, 9, 29),
    title: "29 Ekim",
    description: "Cumhuriyet Bayramı",
  },
];

export const isSpecialDay = (date: Date): SpecialDay | undefined => {
  const specialDays = getSpecialDays(date.getFullYear());
  return specialDays.find(
    (special) =>
      format(special.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
  );
};

export const getSpecialDayStyle = (specialDay: SpecialDay | undefined) => {
  if (!specialDay?.type) return {};

  switch (specialDay.type) {
    case "gift":
      return (
        specialDay.buttonStyle || {
          background: "bg-gradient-to-r from-pink-100 to-pink-50",
          textColor: "text-pink-700",
          borderColor: "border-pink-300",
        }
      );
    case "holiday":
      return {
        background: "bg-gradient-to-r from-red-100 to-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-300",
      };
    case "religious":
      return {
        background: "bg-gradient-to-r from-green-100 to-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-300",
      };
    default:
      return {};
  }
};
