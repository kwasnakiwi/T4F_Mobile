import { passwordRequirements } from "@/constants/data";
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

const SignUp = () => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [passwordInputFocus, setPasswordInputFocus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSecure = () => {
    setIsSecure((prev) => !prev);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) return;

    try {
      setIsLoading(true);

      if (password !== repeatedPassword)
        throw new Error("Hasła muszą być identyczne");

      const res = await fetch(`${BASE_URL}user/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.email || data.message);
      }

      router.push({
        pathname: "/(auth)/2fa",
        params: {
          challenge_id: data.challenge_id,
          purpose: data.purpose,
        },
      });

      console.log("Zarejestrowano:", data);
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
            <Text className="auth-top-text">Stwórz konto</Text>
            <Text className="auth-top-text-under">
              Stwórz konto i odkryj wszystko, co Time4Fit ma Ci do zaoferowania
            </Text>
            <Text className="auth-input-box-label">Imię</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12"
                value={name}
                onChangeText={setName}
                placeholder="np. Jan"
                placeholderClassName="text-grey-secondary text-[14px]"
              />
              <Image source={icons.authPerson} className="auth-input-icon" />
            </View>
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
                placeholderClassName="text-black text-[14px]"
                secureTextEntry={isSecure}
                onFocus={() => setPasswordInputFocus(true)}
                onBlur={() => setPasswordInputFocus(false)}
              />
              <Image source={icons.authLock} className="auth-input-icon" />
              <TouchableOpacity
                className="auth-input-icon visibility-icon"
                onPress={toggleSecure}
              >
                <Image source={icons.visibilitySlash} />
              </TouchableOpacity>
            </View>
            {passwordInputFocus && (
              <View className="password-requirements">
                <Text className="text-tint text-[12px] mb-2">
                  Wymagania dotyczące hasła:
                </Text>
                {passwordRequirements.map((req, i) => (
                  <View
                    key={i}
                    className="flex-row gap-2 items-center not-last:mb-2"
                  >
                    <View className="w-3 h-3 rounded-full bg-disabled" />
                    <Text className="text-grey-secondary font-medium text-[12px]">
                      {req}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <Text className="auth-input-box-label">Powtórz hasło</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12"
                value={repeatedPassword}
                onChangeText={setRepeatedPassword}
                placeholder="Powtórz hasło"
                placeholderClassName="text-grey-secondary text-[14px]"
                secureTextEntry={isSecure}
              />
              <Image source={icons.authLock} className="auth-input-icon" />
            </View>
            <View className="auth-buttons">
              <TouchableOpacity
                className="auth-button"
                onPress={handleRegister}
              >
                <Text className="font-bold text-[16px] text-white text-center">
                  Zarejestruj się
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
              <Text className="text-[10px] text-[#5A6A7E]">
                Tworząc konto, akceptujesz nasz{" "}
                <Link href="/" className="text-secondary underline">
                  Regulamin i Politykę prywatności.
                </Link>
              </Text>
              <Text className="text-tint text-[14px] text-center">
                Masz już konto?{" "}
                <Link
                  className="text-primary-text font-medium text-[14px]"
                  href="/(auth)/sign-in"
                >
                  Zaloguj się
                </Link>
              </Text>
            </View>
          </>
        }
      />
    </View>
  );
};

export default SignUp;
