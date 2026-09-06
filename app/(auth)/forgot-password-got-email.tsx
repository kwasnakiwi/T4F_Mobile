import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>("");

  return (
    <View className="bg-white flex-1">
      <AppHeader tabTitle="Otrzymano maila" />
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
                <Image source={icons.bigEnvelope} />
              </View>
            </View>
            <Text className="auth-top-text text-center">
              Sprawdź swoją skrzynkę
            </Text>
            <Text className="auth-top-text-under text-center">
              Instrukcja resetowania hasła została wysłana na podany adres
              e-mail. Sprawdź też folder spam, jeśli nie widzisz wiadomości.
            </Text>
            <TouchableOpacity className="my-6">
              <Text className="text-tint text-[14px] text-center">
                Nie otrzymałeś wiadomości?{" "}
                <Text className="text-primary-text font-medium text-[14px]">
                  Wyślij ponownie
                </Text>
              </Text>
            </TouchableOpacity>
            <Link
              href="/(auth)/sign-in"
              className="text-primary-text font-medium text-[14px] mt-100 text-center"
            >
              Wróć do logowania
            </Link>
          </>
        }
      />
    </View>
  );
};

export default ForgotPassword;
