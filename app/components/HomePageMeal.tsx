import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const HomePageMeal = ({
  name,
  data,
  icon,
  isOpen,
  onPress,
  currentDate,
}: HomePageMealProps) => {
  const router = useRouter();

  const handleNavigateToAddProduct = () => {
    router.push({
      pathname: "/(add-product)/add-product-page/[name]",
      params: {
        name,
        currentDate: currentDate
          ? currentDate.toISOString()
          : new Date().toISOString(),
      },
    });
  };

  return (
    <View className="default-panel hp-meal-wrapper">
      <TouchableWithoutFeedback onPress={onPress}>
        <View className="hp-meal">
          <Image source={icon} resizeMode="contain" />
          <View className="flex-1">
            <Text className="font-medium text-[15px] text-[#07253b]">
              {name}
            </Text>
            <Text className="text-muted text-[11px] font-normal">
              {data?.meals[0]?.name || "Nic tu jeszcze nie ma"}
            </Text>
          </View>
          {!isOpen ? (
            <TouchableOpacity
              className="add-meal size-8"
              onPress={handleNavigateToAddProduct}
              activeOpacity={0.8}
            >
              <Text className="add-meal-plus">+</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row gap-2 items-center">
              <Text className="hp-meal-total-kcal">
                <Text className="font-medium">{data?.totalKcal}</Text>kcal
              </Text>
              <Image source={icons.greyAngleUp} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <View className="hp-meal-additional-content">
          {data?.meals.map((meal: Meal, i: number) => (
            <View key={i} className="hp-meal-additional-content-meal">
              <View className="flex-col">
                <Text className="text-black text-[12px]">{meal.name}</Text>
                <Text className="font-light text-muted-more text-[10px]">
                  {meal.weight}g
                </Text>
              </View>
              <Text className="text-primary font-medium text-[12px]">
                {meal.kcal}kcal
              </Text>
            </View>
          ))}
          <View className="flex-row justify-center gap-[12] mt-1.5 mb-3">
            {data?.macros.map((macro: Macro, i: number) => (
              <View key={i} className="hp-meal-additional-content-macro">
                <Text
                  className="font-medium text-[12px]"
                  style={{ color: macro.color }}
                >
                  {macro.amount}
                  {macro.unit}
                </Text>
                <Text className="font-medium text-[10px] text-muted-more">
                  {macro.label}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            className="hp-meal-additional-content-button"
            onPress={handleNavigateToAddProduct}
          >
            <Text className="flex-1 font-medium text-primary text-[12px] text-center">
              + Dodaj produkt
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomePageMeal;
