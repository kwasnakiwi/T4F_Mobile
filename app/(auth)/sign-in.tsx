import { icons } from "@/constants/icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../lib/utils";

const SignIn = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}user/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
          dev_code: data.dev_code
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
            <Text className="auth-top-text">Zaloguj się</Text>
            <Text className="auth-top-text-under">Witaj z powrotem 👋</Text>
            <Text className="auth-input-box-label">Adres e-mail</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12"
                value={email}
                onChangeText={setEmail}
                placeholder="np. jan.kowalski@gmail.com"
                placeholderClassName="text-grey-secondary text-[14px]"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Image source={icons.authMail} className="auth-input-icon" />
            </View>
            <Text className="auth-input-box-label">Hasło</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12 pr-12"
                value={password}
                onChangeText={setPassword}
                placeholder="Wprowadź hasło"
                placeholderClassName="text-grey-secondary text-[14px]"
                secureTextEntry={isSecure}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Image source={icons.authLock} className="auth-input-icon" />
              <TouchableOpacity
                className="auth-input-icon visibility-icon"
                onPress={toggleSecure}
              >
                <Image source={icons.visibilitySlash} />
              </TouchableOpacity>
            </View>
            <Link
              href="/(auth)/forgot-password"
              className="auth-under-form-text"
            >
              Nie pamiętasz hasła?
            </Link>
            <View className="auth-buttons">
              <TouchableOpacity
                onPress={handleLogin}
                className="auth-button flex-row justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="font-bold text-[16px] text-white text-center">
                    Zaloguj się
                  </Text>
                )}
              </TouchableOpacity>
              <View className="flex-row items-center gap-3">
                <View className="auth-or-component-line" />
                <Text className="auth-or-component">lub</Text>
                <View className="auth-or-component-line" />
              </View>
              <TouchableOpacity className="auth-google-button flex-row justify-center items-center">
                <Text className="font-bold text-[14px] text-secondary text-center">
                  Kontynuuj z Google
                </Text>
              </TouchableOpacity>
              <Text className="text-tint text-[14px] text-center">
                Nie masz jeszcze konta?{" "}
                <Link
                  className="text-primary-text font-medium text-[14px]"
                  href="/(auth)/sign-up"
                >
                  Zarejestruj się
                </Link>
              </Text>
            </View>
            <View className="mt-8 pt-4 border-t border-gray-100 gap-y-2">
              <Link href="/(auth)/2fa" className="text-tint text-xs">
                • Weryfikacja dwuetapowa
              </Link>
              <Link
                href="/(auth)/create-new-password"
                className="text-tint text-xs"
              >
                • Stwórz nowe hasło
              </Link>
              <Link
                href="/(auth)/forgot-password-got-email"
                className="text-tint text-xs"
              >
                • Sprawdź skrzynkę odbiorczą
              </Link>
              <Link
                href="/(auth)/password-changed"
                className="text-tint text-xs"
              >
                • Hasło zmienione
              </Link>
            </View>
          </>
        }
      />
    </View>
  );
};

export default SignIn;
