import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppHeader from "../components/AppHeader";
import { apiFetch } from "../lib/interceptor";
import { formatDate2 } from "../lib/utils";

function QuickAdd() {
  const { name, currentDate } = useLocalSearchParams();
  const [productName, setProductName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [fat, setFat] = useState("");
  const [salt, setSalt] = useState("");
  const router = useRouter();

  const MEAL_TYPES_MAP = {
    Śniadanie: 1,
    "II Śniadanie": 2,
    Obiad: 3,
    Podwieczorek: 4,
    Kolacja: 5,
  };

  const fields = [
    {
      label: "Kalorie",
      value: kcal,
      setValue: setKcal,
      unit: "kcal",
      requiered: true,
    },
    {
      label: "Białko",
      value: protein,
      setValue: setProtein,
      unit: "g",
      requiered: true,
    },
    {
      label: "Węglowodany",
      value: carbohydrates,
      setValue: setCarbohydrates,
      unit: "g",
      requiered: true,
    },
    {
      label: "Tłuszcze",
      value: fat,
      setValue: setFat,
      unit: "g",
      requiered: true,
    },
    {
      label: "Sól",
      value: salt,
      setValue: setSalt,
      unit: "g",
      requiered: true,
    },
  ];

  const handleQuickAdd = async () => {
    if (!productName || !kcal) return;

    try {
      const res = await apiFetch("diet/quick-add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //@ts-ignore
          date: formatDate2(currentDate),
          //@ts-ignore
          meal_type: MEAL_TYPES_MAP[name],
          name: productName,
          kcal,
          protein,
          carbohydrates,
          fat,
          salt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        return;
      }

      router.push("/(tabs)");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AppHeader tabTitle="Szybkie dodanie" />
      <View className="home-page-container px-2.5 pt-3.5 flex-1">
        <View className="default-panel py-4 px-4.5 mb-4">
          <Text className="make-product-label">Nazwa posiłku</Text>
          <TextInput
            value={productName}
            onChangeText={setProductName}
            className="make-product-input"
            placeholder="np. Obiad w restauracji"
            placeholderTextColor={"#aab4bf"}
          />
        </View>
        <View className="default-panel py-4 px-4.5 mb-4">
          <Text className="make-product-label">Wartości odżywcze</Text>
          {fields.map((field, i) => (
            <View key={i} className="make-product-field">
              <Text className="make-product-field-name flex-1">
                {field.label}
                {field.requiered && (
                  <Text className="text-primary-text">*</Text>
                )}
              </Text>
              <TextInput
                value={field.value}
                onChangeText={field.setValue}
                className="make-product-input"
                placeholderTextColor={"#aab4bf"}
                keyboardType="numeric"
                placeholder="0"
                style={{ width: 50 }}
              />
              <Text className="make-product-field-unit w-7 text-right">
                {field.unit}
              </Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleQuickAdd}
          className="auth-button flex-row justify-center items-center"
        >
          <Text className="font-bold text-[16px] text-white text-center">
            Dodaj do: {name}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default QuickAdd;
