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
  { name: "Śniadanie", data: null, icon: icons.breakfast },
  { name: "II Śniadanie", data: null, icon: icons.lunch },
  { name: "Obiad", data: null, icon: icons.dinner },
  { name: "Podwieczorek", data: null, icon: icons.dessert },
  { name: "Kolacja", data: null, icon: icons.supper },
];
