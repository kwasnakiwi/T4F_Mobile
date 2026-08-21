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

  interface MealProps {
    name: string
  }

  interface HomePageMealProps {
    name: string;
    data: MealProps[] | null;
    icon: ImageSourcePropType;
  }
}
