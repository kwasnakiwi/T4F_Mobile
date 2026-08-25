import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OTP_LENGTH = 6;

const OtpInput = ({
  code,
  setCode,
}: {
  code: string;
  setCode: (val: string) => void;
}) => {
  const digits = new Array(OTP_LENGTH).fill("");

  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePress} className="relative w-full my-4">
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={(text) =>
          setCode(text.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH))
        }
        maxLength={OTP_LENGTH}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoFocus
        className="absolute w-full h-full opacity-0 z-10"
      />
      <View
        className="flex-row justify-between w-full gap-x-2"
        pointerEvents="none"
      >
        {digits.map((_, index) => {
          const digit = code[index] || "";
          const isCurrent = index === code.length && code.length < OTP_LENGTH;
          const isFilled = index < code.length;

          return (
            <View
              key={index}
              className={`flex-1 h-13.5 border rounded-xl justify-center items-center bg-white ${
                isCurrent
                  ? "border-primary-text border-2"
                  : isFilled
                    ? "border-secondary"
                    : "border-not-white"
              }`}
            >
              <Text className="text-[20px] font-bold text-secondary">
                {digit}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
};
const TwoFA = () => {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState<string>("");

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
            <Text className="auth-top-text">Weryfikacja dwuetapowa</Text>
            <Text className="auth-top-text-under">
              Wpisz kod weryfikacyjny, aby potwierdzić, że to Ty. Kod składa się
              z 6 cyfr.
            </Text>
            <Text className="auth-input-box-label">Kod weryfikacyjny</Text>
            <OtpInput code={code} setCode={setCode} />
            <TouchableOpacity className="my-6">
              <Text className="text-tint text-[14px] text-center">
                Nie dostałeś kodu?{" "}
                <Text className="text-primary-text font-medium text-[14px]">
                  Wyślij ponownie
                </Text>
              </Text>
            </TouchableOpacity>
            <View className="auth-buttons">
              <TouchableOpacity
                className={`auth-button ${
                  code.length < 6 ? "opacity-50" : "opacity-100"
                }`}
                disabled={code.length < 6}
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

export default TwoFA;
