import {SplashScreen, Stack} from "expo-router";
import "@/global.css"
import {useFonts} from "expo-font";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        'sans': require('../assets/fonts/Poppins-Regular.ttf'),
        'bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'extrabold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'light': require('../assets/fonts/Poppins-Light.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return <Stack screenOptions={{headerShown: false}}/>;
}
