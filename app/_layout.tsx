import "@/global.css";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    sans: require("../assets/fonts/Poppins-Regular.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} className="home-page-container">
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
}
