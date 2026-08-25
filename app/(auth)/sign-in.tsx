import { icons } from "@/constants/icons";
import { Link } from "expo-router";
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

const SignIn = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(true);

  const toggleSecure = () => {
    setIsSecure((prev) => !prev);
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
              />
              <Image source={icons.authMail} className="auth-input-icon" />
            </View>
            <Text className="auth-input-box-label">Hasło</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12"
                value={password}
                onChangeText={setPassword}
                placeholder="Wprowadź hasło"
                placeholderClassName="text-grey-secondary text-[14px]"
                secureTextEntry={isSecure}
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
              <TouchableOpacity className="auth-button">
                <Text className="font-bold text-[16px] text-white text-center">
                  Zaloguj się
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center gap-3">
                <View className="auth-or-component-line" />
                <Text className="auth-or-component">lub</Text>
                <View className="auth-or-component-line" />
              </View>
              <TouchableOpacity className="auth-google-button">
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
            <Link href="/(auth)/2fa">Weryfikacja dwuetapowa</Link>
            <Link href="/(auth)/create-new-password">Stwórz nowe hasło</Link>
            <Link href="/(auth)/forgot-password-got-email">
              Sprawdź skrzynke odbiorczą
            </Link>
            <Link href="/(auth)/password-changed">Hasło zmienione</Link>
          </>
        }
      />
    </View>
  );
};

export default SignIn;
