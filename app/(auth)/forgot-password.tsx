import { icons } from "@/constants/icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../lib/utils";

const ForgotPassword = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}user/reset_password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.non_field_errors[0] || data.message);
      }

      router.push({
        pathname: "/(auth)/2fa",
        params: {
          challenge_id: data.challenge_id,
          purpose: data.purpose,
        },
      });

      console.log("Zalogowano:", data);
    } catch (err) {
      console.error("Błąd logowania:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white flex-1">
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
            <Text className="auth-top-text">Odzyskaj dostęp do konta</Text>
            <Text className="auth-top-text-under">
              Podaj adres e-mail powiązany z Twoim kontem, a wyślemy Ci
              instrukcję zmiany hasła.
            </Text>
            <Text className="auth-input-box-label">Adres e-mail</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12"
                value={email}
                onChangeText={setEmail}
                placeholder="np. jan.kowalski@gmail.com"
                placeholderClassName="text-grey-secondary text-[14px]"
              />
              <Image source={icons.authMail} className="auth-input-icon" />
            </View>
            <View className="auth-buttons">
              <TouchableOpacity
                className={`auth-button ${
                  email.length < 6 ? "opacity-50" : "opacity-100"
                }`}
                disabled={email.length < 6}
                onPress={handleResetPassword}
              >
                <Text className="font-bold text-[16px] text-white text-center">
                  Potwierdź
                </Text>
              </TouchableOpacity>
            </View>
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
