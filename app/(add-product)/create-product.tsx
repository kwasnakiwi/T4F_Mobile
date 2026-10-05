import { icons } from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { apiFetch } from "../lib/interceptor";

function CreateProduct() {
  const { name, currentDate } = useLocalSearchParams();
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [valuesMetric, setValuesMetric] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [fat, setFat] = useState("");
  const [salt, setSalt] = useState("");
  const [unit, setUnit] = useState("g");
  const [servingName, setServingName] = useState("");
  const [servingValue, setServingValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState("");
  const [traces, setTraces] = useState("");
  const [country, setCountry] = useState("");
  const [packaging, setPackaging] = useState("");

  const MEAL_TYPES_MAP = {
    Śniadanie: 1,
    "II Śniadanie": 2,
    Obiad: 3,
    Podwieczorek: 4,
    Kolacja: 5,
  };

  const basicFields = [
    {
      label: "Nazwa",
      value: productName,
      setValue: setProductName,
      template: "np. Twaróg półtłusty",
      requiered: true,
    },
    {
      label: "Marka",
      value: brand,
      setValue: setBrand,
      template: "np. Piątnica",
      requiered: false,
    },
    {
      label: "Kod kreskowy",
      value: barcode,
      setValue: setBarcode,
      template: "Skanuj lub wpisz",
      requiered: false,
    },
  ];

  const macroFields = [
    {
      label: "Wartości na",
      value: valuesMetric,
      setValue: setValuesMetric,
      unit: "g",
      requiered: true,
    },
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

  const detailsFields = [
    {
      label: "Składniki",
      value: ingredients,
      setValue: setIngredients,
      template: "Lista składników...",
    },
    {
      label: "Alergeny",
      value: allergens,
      setValue: setAllergens,
      template: "np. Mleko, Gluten",
    },
    {
      label: "Śladowe ilości",
      value: traces,
      setValue: setTraces,
      template: "np. Orzechy, Soja",
    },
    {
      label: "Kraj",
      value: country,
      setValue: setCountry,
      template: "np. Polska",
    },
    {
      label: "Opakowanie",
      value: packaging,
      setValue: setPackaging,
      template: "np. Kubek plastikowy",
    },
  ];

  const handleMakeProduct = async () => {
    if (
      !productName ||
      !valuesMetric ||
      !kcal ||
      !protein ||
      !carbohydrates ||
      !fat ||
      !salt
    )
      return;

    try {
      const payload = {
        title: productName,
        brand: brand || null,
        barcode: barcode || null,
        values_per: valuesMetric.replace(",", ".") || "100",
        kcal: kcal.replace(",", "."),
        protein: protein.replace(",", "."),
        carbohydrates: carbohydrates.replace(",", "."),
        fat: fat.replace(",", "."),
        salt: salt.replace(",", "."),
        traces: traces ? traces.split(",").map((item) => item.trim()) : [],
        allergens: allergens || null,
        countries: country || null,
        ingredients_text: ingredients || null,
        package_name: packaging || null,
        serving_units:
          servingName && servingValue
            ? [
                {
                  name: servingName,
                  value: servingValue.replace(",", "."),
                  unit: unit || "g",
                },
              ]
            : [],
      };

      const res = await apiFetch("diet/products/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data);
      }

      router.push("/(tabs)");
    } catch (error) {
      console.error("Błąd podczas tworzenia produktu:", error);
    }
  };

  return (
    <>
      <AppHeader tabTitle="Nowy produkt" />
      <View className="px-2.5 pt-3.5 flex-1">
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <>
              <View className="default-panel py-4 px-4.5 mb-4">
                <Text className="make-product-label">
                  Podstawowe informacje
                </Text>
                {basicFields.map((field, i) => (
                  <View key={i} className="make-product-field">
                    <Text className="make-product-field-name flex-1">
                      {field.label}
                      {field.requiered && (
                        <Text className="text-primary-text">*</Text>
                      )}
                    </Text>
                    <TextInput
                      className="text-[12px] font-light text-black"
                      placeholder={field.template}
                      value={field.value}
                      onChangeText={field.setValue}
                      placeholderTextColor="#aab4bf"
                      style={{ width: 120 }}
                    />
                  </View>
                ))}
              </View>
              <View className="default-panel py-4 px-4.5 mb-4">
                <Text className="make-product-label">Wartości odżywcze</Text>
                {macroFields.map((field, i) => (
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
              <View className="default-panel py-4 px-4.5 mb-4">
                <Text className="make-product-label">Wielkość porcji</Text>
                <View className="flex-row justify-center gap-2 mb-4">
                  <TextInput
                    className="make-product-input flex-1"
                    placeholder="Nazwa porcji"
                    value={servingName}
                    onChangeText={setServingName}
                  />
                  <TextInput
                    className="make-product-input"
                    placeholder="0"
                    value={servingValue}
                    onChangeText={setServingValue}
                    keyboardType="numeric"
                    style={{ width: 50 }}
                  />
                  <TextInput
                    className="make-product-input"
                    placeholder="0"
                    value={unit}
                    onChangeText={setUnit}
                    style={{ width: 40, textAlign: "right" }}
                  />
                </View>
                <TouchableOpacity
                  className="hp-meal-additional-content-button"
                  onPress={undefined}
                >
                  <Text className="flex-1 font-medium text-primary text-[12px] text-center">
                    + Dodaj kolejną porcję
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="default-panel py-0 px-0">
                <TouchableWithoutFeedback
                  onPress={() => setShowDetails((prev) => !prev)}
                >
                  <View className="default-panel-top">
                    <Text className="text-[12px] font-medium">
                      Szczegóły produktu <Image source={icons.angleDown} />
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                {showDetails && (
                  <View className="make-product-details">
                    {detailsFields.map((field, i) => (
                      <View className="make-product-detail" key={i}>
                        <Text className="text-tint font-light text-[12px]">
                          {field.label}
                        </Text>
                        <TextInput
                          value={field.value}
                          onChangeText={field.setValue}
                          placeholder={field.template}
                          placeholderTextColor={"#aab4bf"}
                          className="text-[12px] font-light"
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
              <View className="mt-4 pt-8 pb-4 border-t border-solid border-muted-more/25 relative">
                <Text className="text-grey-secondary text-[10px] font-light absolute top-0 left-[50%] translate-x-[-50%]">
                  *Uzupełnij wymagane pola
                </Text>
                <TouchableOpacity
                  onPress={handleMakeProduct}
                  className="auth-button flex-row justify-center items-center"
                >
                  <Text className="font-bold text-[16px] text-white text-center">
                    Zapisz
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
        />
      </View>
    </>
  );
}

export default CreateProduct;
