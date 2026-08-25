import { icons } from "@/constants/icons";

export const tabs = [
  { name: "index", title: "Home", icon: icons.tabHome, width: 20, height: 22 },
  {
    name: "events",
    title: "Eventy",
    icon: icons.tabImage,
    width: 16,
    height: 20,
  },
  { name: "add", title: "Dodaj", icon: icons.tabPlus, width: 19, height: 19 },
  {
    name: "profile",
    title: "Profil",
    icon: icons.tabPerson,
    width: 14,
    height: 18,
  },
  {
    name: "awards",
    title: "Osiągnięcia",
    icon: icons.tabTrophy,
    width: 20,
    height: 20,
  },
];

export const DAYS_NAMES = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"];

export const macros = [
  { name: "Białko", current: 112, total: 160, icon: icons.protein },
  { name: "Węglowodany", current: 185, total: 230, icon: icons.carbohydrates },
  { name: "Tłuszcz", current: 48, total: 65, icon: icons.fat },
  { name: "Sól", current: 3, total: 5, icon: icons.salt },
];

export const mealTypes = [
  {
    name: "Śniadanie",
    data: {
      totalKcal: 615,
      meals: [
        {
          name: "Owsianka na mleku migdałowym z borówkami",
          weight: 300,
          kcal: 340,
        },
        { name: "Masło orzechowe (15g)", weight: 15, kcal: 95 },
        { name: "Jajko na twardo", weight: 60, kcal: 90 },
        { name: "Kawa z mlekiem 2%", weight: 200, kcal: 90 },
      ],
      macros: [
        { label: "Białko", amount: 28, unit: "g", color: "#3B82F6" },
        { label: "Węgle", amount: 72, unit: "g", color: "#10B981" },
        { label: "Tłuszcze", amount: 22, unit: "g", color: "#F97316" },
        { label: "Sól", amount: 0.5, unit: "g", color: "#8B5CF6" },
      ],
    },
    icon: icons.breakfast,
  },
  {
    name: "II Śniadanie",
    data: {
      totalKcal: 385,
      meals: [
        { name: "Serek wiejski lekki", weight: 200, kcal: 160 },
        { name: "Orzechy włoskie", weight: 20, kcal: 130 },
        { name: "Jabłko", weight: 180, kcal: 95 },
      ],
      macros: [
        { label: "Białko", amount: 26, unit: "g", color: "#3B82F6" },
        { label: "Węgle", amount: 31, unit: "g", color: "#10B981" },
        { label: "Tłuszcze", amount: 16, unit: "g", color: "#F97316" },
        { label: "Sól", amount: 0.8, unit: "g", color: "#8B5CF6" },
      ],
    },
    icon: icons.lunch,
  },
  {
    name: "Obiad",
    data: {
      totalKcal: 680,
      meals: [
        { name: "Pierś z kurczaka pieczona", weight: 180, kcal: 290 },
        { name: "Ryż brązowy gotowany", weight: 150, kcal: 195 },
        { name: "Brokuły na parze", weight: 150, kcal: 50 },
        { name: "Oliwa z oliwek", weight: 15, kcal: 145 },
      ],
      macros: [
        { label: "Białko", amount: 52, unit: "g", color: "#3B82F6" },
        { label: "Węgle", amount: 62, unit: "g", color: "#10B981" },
        { label: "Tłuszcze", amount: 18, unit: "g", color: "#F97316" },
        { label: "Sól", amount: 0.9, unit: "g", color: "#8B5CF6" },
      ],
    },
    icon: icons.dinner,
  },
  {
    name: "Podwieczorek",
    data: {
      totalKcal: 295,
      meals: [
        { name: "Koktajl proteinowy na wodzie", weight: 250, kcal: 140 },
        { name: "Banan", weight: 120, kcal: 105 },
        { name: "Nasiona chia", weight: 10, kcal: 50 },
      ],
      macros: [
        { label: "Białko", amount: 28, unit: "g", color: "#3B82F6" },
        { label: "Węgle", amount: 35, unit: "g", color: "#10B981" },
        { label: "Tłuszcze", amount: 4, unit: "g", color: "#F97316" },
        { label: "Sól", amount: 0.2, unit: "g", color: "#8B5CF6" },
      ],
    },
    icon: icons.dessert,
  },
  {
    name: "Kolacja",
    data: {
      totalKcal: 440,
      meals: [
        { name: "Omlet z 3 jaj", weight: 180, kcal: 270 },
        { name: "Ser feta", weight: 30, kcal: 80 },
        { name: "Pomidorki koktajlowe i szpinak", weight: 100, kcal: 25 },
        { name: "Pieczywo żytnie razowe (1 skrojka)", weight: 35, kcal: 65 },
      ],
      macros: [
        { label: "Białko", amount: 29, unit: "g", color: "#3b82f6" },
        { label: "Węgle", amount: 20, unit: "g", color: "#10b981" },
        { label: "Tłuszcze", amount: 27, unit: "g", color: "#f97316" },
        { label: "Sól", amount: 1.3, unit: "g", color: "#8b5cf6" },
      ],
    },
    icon: icons.supper,
  },
];

export const addProductsPageButtons = [
  {
    label: "Skanuj kod",
    icon: icons.scanBarcode,
    link: "/(add-product)/scan-bar-code",
  },
  { label: "Utwórz", icon: icons.addProduct, link: "/" },
];

export const passwordRequirements = [
  "Co najmniej 8 znaków",
  "Co najmniej jedna wielka litera",
  "Co najmniej jedna cyfra",
]