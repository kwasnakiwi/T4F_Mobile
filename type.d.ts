import { ImageSourcePropType } from "react-native";

declare global {
  interface AppTab {
    name: string;
    title: string;
    icon: ImageSourcePropType;
  }

  interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    width: number;
    height: number;
  }
  interface AppHeaderProps {
    title: string;
  }

  interface MacrosListElementProps {
    name: string;
    current: number;
    total: number;
    icon: ImageSourcePropType;
  }

  interface Meal {
    name: string;
    weight: number;
    kcal: number;
    packaging?: string;
  }

  interface Macro {
    label: string;
    amount: number;
    unit: string;
    color: string;
  }

  interface HomePageMeal {
    name: string;
    data: {
      totalKcal: number;
      meals: Meal[];
      macros: Macro[];
    };
  }

  interface HomePageMealProps {
    name: string;
    data: any;
    icon: ImageSourcePropType;
    isOpen?: boolean;
    onPress?: () => void;
    currentDate: Date;
  }

  interface Product {
    id: number;
    name: string;
    title: string;
    brand?: string;
    image_url: string;
    packaging: string;
    weight_g: string;
    kcal: string;
    kcal_1g: string;
    serving_unit_id?: number;
  }

  interface ProductListItemProps {
    id: number;
    name: string;
    weight_g: string;
    kcal: string;
  }
}
