import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  return (
    <View className="bg-white flex-1">
      <AppHeader tabTitle="Zmieniono hasło" />
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: insets.bottom + 24,
          paddingTop: 28,
        }}
        ListHeaderComponent={
          <>
            <View className="items-center mb-8">
              <View className="auth-image-wrapper">
                <Image source={icons.bigCheck} />
              </View>
            </View>
            <Text className="auth-top-text text-center">
              Hasło zostało zmienione
            </Text>
            <Text className="auth-top-text-under text-center">
              Twoje hasło zostało pomyślnie zaktualizowane. Możesz teraz
              zalogować się przy użyciu nowego hasła.
            </Text>
            <View className="auth-buttons">
              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-in")}
                className="auth-button"
              >
                <Text className="font-bold text-[16px] text-white text-center">
                  Wróc do logowania
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </View>
  );
};

export default ForgotPassword;
