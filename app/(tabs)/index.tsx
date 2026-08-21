import { macros, mealTypes } from "@/constants/data";
import { icons } from "@/constants/icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../components/AppHeader";
import DynamicProgressGauge from "../components/DynamicProgressGauge";
import HomePageMeal from "../components/HomePageMeal";
import MacrosListElement from "../components/MacrosListElement";
import WaterProgressCircle from "../components/WaterProgressCircle";

export default function Index() {
  const tabBarHeight = useBottomTabBarHeight();
  const totalGlasses = 8;
  const [currentGlasses, setCurrentGlasses] = useState<number>(2);

  return (
    <View className="bg-app-background flex-1">
      <AppHeader title="Home" />
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
                <DynamicProgressGauge current={1441} total={2135} size={120} />
              </View>
              <View className="hp-macros-list">
                {macros.map((item, i) => (
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
              {mealTypes.map((item, i) => (
                <HomePageMeal
                  key={i}
                  name={item.name}
                  data={item.data}
                  icon={item.icon}
                />
              ))}
            </View>
            <View className="home-page-water">
              <WaterProgressCircle
                label="Woda"
                current={1222}
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
          </>
        }
      />
    </View>
  );
}
