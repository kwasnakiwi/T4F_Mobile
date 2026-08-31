import { macros as staticMacros } from "@/constants/data";
import { icons } from "@/constants/icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import DynamicProgressGauge from "../components/DynamicProgressGauge";
import HomePageMealComponent from "../components/HomePageMeal";
import MacrosListElement from "../components/MacrosListElement";
import WaterProgressCircle from "../components/WaterProgressCircle";
import { apiFetch } from "../lib/interceptor";
import { formatDate2 } from "../lib/utils";

// Mapowanie typów posiłków z API na nazwy i ikony
const MEAL_TYPE_MAP: Record<number, { name: string; icon: any }> = {
  1: { name: "Śniadanie", icon: icons.breakfast },
  2: { name: "II Śniadanie", icon: icons.lunch },
  3: { name: "Obiad", icon: icons.dinner },
  4: { name: "Podwieczorek", icon: icons.dessert },
  5: { name: "Kolacja", icon: icons.supper },
};

export default function Index() {
  const tabBarHeight = useBottomTabBarHeight();
  const totalGlasses = 8;
  const [currentGlasses, setCurrentGlasses] = useState<number>(2);
  const [openMeals, setOpenMeals] = useState<number[]>([]);
  const [dailyMealsData, setDailyMealsData] = useState<any>(null);
  const currentDate = formatDate2(new Date());

  const handleToggleMeal = (mealType: number) => {
    setOpenMeals((prev) =>
      prev.includes(mealType)
        ? prev.filter((id) => id !== mealType)
        : [...prev, mealType],
    );
  };

  useEffect(() => {
    const getDailyMeals = async () => {
      try {
        const res = await apiFetch(`diet/daily-meals/?date=${currentDate}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(JSON.stringify(data));
        }

        setDailyMealsData(data);
      } catch (err) {
        console.error("Błąd pobierania posiłków:", err);
      }
    };

    getDailyMeals();
  }, [currentDate]);

  // Podsumowanie dnia z API
  const currentKcal = Math.round(
    parseFloat(dailyMealsData?.total_day_kcal || "0"),
  );

  // Górny panel makroskładników
  const formattedMacros = [
    {
      name: "Białko",
      current: Math.round(parseFloat(dailyMealsData?.total_day_protein || "0")),
      total: staticMacros[0]?.total || 160,
      icon: icons.protein,
    },
    {
      name: "Węglowodany",
      current: Math.round(
        parseFloat(dailyMealsData?.total_day_carbohydrates || "0"),
      ),
      total: staticMacros[1]?.total || 230,
      icon: icons.carbohydrates,
    },
    {
      name: "Tłuszcz",
      current: Math.round(parseFloat(dailyMealsData?.total_day_fat || "0")),
      total: staticMacros[2]?.total || 65,
      icon: icons.fat,
    },
    {
      name: "Sól",
      current: Math.round(parseFloat(dailyMealsData?.total_day_salt || "0")),
      total: staticMacros[3]?.total || 5,
      icon: icons.salt,
    },
  ];

  return (
    <View className="bg-app-background flex-1">
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: tabBarHeight + 16,
        }}
        ListHeaderComponent={
          <>
            <View className="home-page-row">
              <View className="default-panel">
                <DynamicProgressGauge
                  current={currentKcal}
                  total={2135}
                  size={120}
                />
              </View>
              <View className="hp-macros-list">
                {formattedMacros.map((item, i) => (
                  <MacrosListElement
                    key={i}
                    name={item.name}
                    current={item.current}
                    total={item.total}
                    icon={item.icon}
                  />
                ))}
              </View>
            </View>
            <View className="home-page-meals">
              {dailyMealsData?.meals?.map((apiMeal: any) => {
                const mealInfo = MEAL_TYPE_MAP[apiMeal.meal_type] || {
                  name: `Posiłek ${apiMeal.meal_type}`,
                  icon: icons.breakfast,
                };

                const isOpen = openMeals.includes(apiMeal.meal_type);
                const combinedItems = [
                  ...(apiMeal.full_meals || []).map((m: any) => ({
                    name: m.name || m.meal_name,
                    weight: Math.round(
                      parseFloat(m.calculated_gram_weight || m.weight || "0"),
                    ),
                    kcal: Math.round(parseFloat(m.total_kcal || m.kcal || "0")),
                  })),
                  ...(apiMeal.direct_items || []).map((item: any) => ({
                    name: item.name,
                    weight: Math.round(
                      parseFloat(item.calculated_gram_weight || "0"),
                    ),
                    kcal: Math.round(parseFloat(item.total_kcal || "0")),
                  })),
                ];

                const hasItems = combinedItems.length > 0;
                const mealComponentData = {
                  totalKcal: Math.round(
                    parseFloat(apiMeal.category_kcal || "0"),
                  ),
                  meals: combinedItems,
                  macros: [
                    {
                      label: "Białko",
                      amount: Math.round(
                        parseFloat(apiMeal.category_protein || "0"),
                      ),
                      unit: "g",
                      color: "#3B82F6",
                    },
                    {
                      label: "Węgle",
                      amount: Math.round(
                        parseFloat(apiMeal.category_carbohydrates || "0"),
                      ),
                      unit: "g",
                      color: "#10B981",
                    },
                    {
                      label: "Tłuszcze",
                      amount: Math.round(
                        parseFloat(apiMeal.category_fat || "0"),
                      ),
                      unit: "g",
                      color: "#F97316",
                    },
                    {
                      label: "Sól",
                      amount: parseFloat(apiMeal.category_salt || "0").toFixed(
                        1,
                      ),
                      unit: "g",
                      color: "#8B5CF6",
                    },
                  ],
                };
                const passedData = !hasItems ? null : mealComponentData;
                return (
                  <HomePageMealComponent
                    key={apiMeal.meal_type}
                    name={mealInfo.name}
                    data={passedData as any}
                    icon={mealInfo.icon}
                    isOpen={isOpen}
                    onPress={() => handleToggleMeal(apiMeal.meal_type)}
                  />
                );
              })}
            </View>
            <View className="home-page-water">
              <WaterProgressCircle
                label="Woda"
                current={currentGlasses * 250}
                total={2000}
                unit="ml"
              />
              <View className="home-page-water-content">
                <Text className="home-page-water-title">Nawodnienie</Text>
                <View className="home-page-water-glasses">
                  {Array.from({ length: currentGlasses }).map((_, i) => (
                    <View key={i} className="home-page-water-glass done">
                      <Image source={icons.orangeGlass} />
                    </View>
                  ))}
                  {Array.from({ length: totalGlasses - currentGlasses }).map(
                    (_, i) => (
                      <View key={i} className="home-page-water-glass">
                        <Image source={icons.greyGlass} />
                      </View>
                    ),
                  )}
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentGlasses((prev) =>
                      Math.min(totalGlasses, prev + 1),
                    )
                  }
                  className="home-page-water-button"
                >
                  <Text className="home-page-water-title">
                    + Dodaj szklankę (250ml)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Link href="/(auth)/sign-in">Logowanie</Link>
          </>
        }
      />
    </View>
  );
}
