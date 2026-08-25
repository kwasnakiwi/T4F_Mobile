import { passwordRequirements } from "@/constants/data";
import { icons } from "@/constants/icons";
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

const CreateNewPassword = () => {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
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
            <Text className="auth-top-text">Ustaw nowe hasło</Text>
            <Text className="auth-top-text-under">
              Nowe hasło musi być inne niż poprzednie.
            </Text>
            <Text className="auth-input-box-label">Hasło</Text>
            <View className="auth-input-box">
              <TextInput
                className="auth-input pl-12"
                value={password}
                onChangeText={setPassword}
                placeholder="Wprowadź hasło"
                placeholderClassName="text-black text-[14px]"
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
            <View className="auth-buttons">
              <TouchableOpacity className="auth-button">
                <Text className="font-bold text-[16px] text-white text-center">
                  Zmień hasło
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </View>
  );
};

export default CreateNewPassword;
