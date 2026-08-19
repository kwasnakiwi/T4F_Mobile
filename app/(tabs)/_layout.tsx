import { tabs } from "@/constants/data";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import clsx from "clsx";

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const TabIcon = ({ focused, icon, width, height }: TabIconProps) => (
    <View className="tabs-icon">
      <View className={clsx("tabs-pill", focused && "tabs-active")}>
        <Image
          source={icon}
          style={{ width, height }}
          resizeMode="contain"
          className="tabs-glyph"
        />
      </View>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 22 + 40 + insets.bottom,
          // Cień dla iOS
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.25,
          shadowRadius: 4,

          // Cień dla Androida
          elevation: 8,

          // Wymagane w React Native do poprawnego wyrenderowania cienia
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 20,
        },
        tabBarIconStyle: {
          alignItems: "center",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                icon={tab.icon}
                width={tab.width}
                height={tab.height}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
