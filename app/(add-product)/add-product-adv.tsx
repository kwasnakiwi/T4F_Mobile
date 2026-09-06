import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";
import { apiFetch } from "../lib/interceptor";
import { formatDate2 } from "../lib/utils";

interface ServingUnit {
  id: number;
  unit_code: string;
  label: string;
  gram_weight: string;
}

interface AdditionalInfo {
  is_vegan: boolean | null;
  is_vegetarian: boolean | null;
  is_palm_oil_free: boolean | null;
  is_complete_profile: boolean;
  ingredients_text: string | null;
  traces: string[];
  labels: string[];
  additives_tags: string[];
}

interface ProductDetails {
  id: number;
  name: string;
  title: string;
  brand: string | null;
  barcode: string | null;
  image_url: string | null;
  quantity_display: string | null;
  category: string | null;
  category_name: string | null;
  product_desc: string | null;
  package_name: string | null;
  package_whole_g: number | null;
  nutriscore: string | null;
  nova_group: number | null;
  allergens: string[];
  countries: string[];
  kcal_100g: number | null;
  protein_100g: number | null;
  fat_100g: number | null;
  carbohydrates_100g: number | null;
  salt_100g: number | null;
  sugars_100g: number | null;
  saturated_fat_100g: number | null;
  fiber_100g: number | null;
  serving_units: ServingUnit[];
  additional_info: AdditionalInfo | null;
}

const AddProductAdv = () => {
  const { itemId, mealType, barcodeProductId, currentDate } =
    useLocalSearchParams<{
      itemId?: string;
      mealType?: string;
      barcodeProductId?: string;
      currentDate: string;
    }>();
  const insets = useSafeAreaInsets();
  const [productData, setProductData] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(true);
  const [customWeightG, setCustomWeightG] = useState("0");
  const [customUnitLabel, setCustomUnitLabel] = useState("");

  const MEAL_TYPES_MAP = {
    Śniadanie: 1,
    "II Śniadanie": 2,
    Obiad: 3,
    Podwieczorek: 4,
    Kolacja: 5,
  };

  useEffect(() => {
    if (!itemId && !barcodeProductId) return;

    const getProductData = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(
          `diet/products/${barcodeProductId || itemId}/`,
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Błąd serwera ${res.status}:`, errorText);
          return;
        }

        const data: ProductDetails = await res.json();
        setProductData(data);
      } catch (err) {
        console.error("Błąd podczas pobierania danych:", err);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [itemId, barcodeProductId]);

  const addProduct = async () => {
    try {
      const res = await apiFetch(`diet/add-product/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: barcodeProductId || itemId,
          date: formatDate2(currentDate),
          //@ts-ignore
          meal_type: MEAL_TYPES_MAP[mealType],
          custom_weight_g:
            parseFloat(customWeightG) === 0 ? null : parseFloat(customWeightG),
          custom_unit_label: customUnitLabel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      router.push({
        pathname: "/(tabs)",
        params: { currentDate: currentDate },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <View className="product-screen-container items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  if (!productData) {
    return (
      <View className="product-screen-container items-center justify-center">
        <Text className="text-muted text-xs font-medium">
          Nie znaleziono danych produktu.
        </Text>
      </View>
    );
  }

  const {
    name,
    brand,
    kcal_100g,
    protein_100g,
    carbohydrates_100g,
    fat_100g,
    salt_100g,
    sugars_100g,
    saturated_fat_100g,
    fiber_100g,
    nutriscore,
    nova_group,
    allergens,
    countries,
    package_name,
    additional_info,
  } = productData;

  const features = [
    additional_info?.is_vegetarian && "Wegetariański",
    additional_info?.is_vegan && "Wegański",
    additional_info?.is_palm_oil_free && "Bez oleju palmowego",
  ].filter(Boolean) as string[];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="product-screen-container flex-1">
          <AppHeader tabTitle={String(mealType)} />
          <FlatList
            data={[]}
            renderItem={null}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 140 }}
            ListHeaderComponent={
              <>
                <View className="default-panel m-3">
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 pr-2">
                      <Text className="text-muted text-xs font-medium mb-0.5">
                        {brand || "Marka nieznana"}
                      </Text>
                      <Text className="text-secondary font-bold text-lg leading-tight">
                        {name}
                      </Text>
                      <Text className="text-muted-more text-xs font-medium mt-1">
                        Wartości na 100g
                      </Text>
                    </View>

                    <View className="bg-secondary-bg border border-primary-20 rounded-xl px-3 py-1.5 items-center justify-center">
                      <Text className="text-primary-text font-extrabold text-xl leading-none">
                        {kcal_100g ?? 0}
                      </Text>
                      <Text className="text-primary-text text-[10px] font-bold mt-0.5">
                        kcal
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between gap-1.5">
                    <View className="flex-1 bg-light-grey border border-disabled rounded-xl py-2 px-1 items-center justify-center">
                      <Text className="text-secondary font-bold text-xs">
                        {protein_100g ?? 0}g
                      </Text>
                      <Text className="text-muted text-[10px] font-medium mt-0.5">
                        Białko
                      </Text>
                    </View>
                    <View className="flex-1 bg-light-grey border border-disabled rounded-xl py-2 px-1 items-center justify-center">
                      <Text className="text-secondary font-bold text-xs">
                        {carbohydrates_100g ?? 0}g
                      </Text>
                      <Text className="text-muted text-[10px] font-medium mt-0.5">
                        Węglowodany
                      </Text>
                    </View>
                    <View className="flex-1 bg-light-grey border border-disabled rounded-xl py-2 px-1 items-center justify-center">
                      <Text className="text-secondary font-bold text-xs">
                        {fat_100g ?? 0}g
                      </Text>
                      <Text className="text-muted text-[10px] font-medium mt-0.5">
                        Tłuszcze
                      </Text>
                    </View>
                    <View className="flex-1 bg-light-grey border border-disabled rounded-xl py-2 px-1 items-center justify-center">
                      <Text className="text-secondary font-bold text-xs">
                        {salt_100g ?? 0}g
                      </Text>
                      <Text className="text-muted text-[10px] font-medium mt-0.5">
                        Sól
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text className="product-report-link">
                    Zgłoś błąd w metryce produktu!
                  </Text>
                </TouchableOpacity>
                {features.length > 0 && (
                  <View className="product-card">
                    <Text className="product-card-title">Cechy produktu</Text>
                    <View className="product-chip-row">
                      {features.map((feature, idx) => (
                        <View key={idx} className="product-chip">
                          <Text className="product-chip-text">{feature}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                <View className="product-card">
                  <View className="product-opinion-header">
                    <Text className="product-card-title">Opinia Time4Fit</Text>
                    <View className="product-opinion-badge">
                      <Text className="product-opinion-badge-text">
                        Dobry wybór ✓
                      </Text>
                    </View>
                  </View>
                  <Text className="product-opinion-desc">
                    Świetny wybór żywieniowy. Wartości odżywcze są dobrze
                    zbalansowane i wpisują się w codzienną zbilansowaną dietę.
                  </Text>
                  <View className="product-scores-row">
                    <View className="product-score-col">
                      <Text className="product-score-label">Nutri-Score</Text>
                      <View className="product-nutri-bar">
                        {["A", "B", "C", "D", "E"].map((letter) => {
                          const isCurrent =
                            nutriscore?.toUpperCase() === letter;
                          const colors: Record<string, string> = {
                            A: "bg-emerald-600",
                            B: "bg-lime-500",
                            C: "bg-amber-400",
                            D: "bg-orange-400",
                            E: "bg-red-500",
                          };
                          return (
                            <View
                              key={letter}
                              style={
                                isCurrent
                                  ? { transform: [{ scale: 1.1 }] }
                                  : undefined
                              }
                              className={`product-nutri-step ${colors[letter]} ${
                                isCurrent ? "z-10 rounded-sm" : "opacity-40"
                              }`}
                            >
                              <Text className="product-nutri-text">
                                {letter}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>

                    <View className="product-score-col items-end">
                      <Text className="product-score-label">
                        Stopień przetworzenia
                      </Text>
                      <View className="product-nova-tag">
                        <Text className="product-nova-text">
                          NOVA {nova_group ?? "-"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setIsDetailsExpanded(!isDetailsExpanded)}
                  className="product-accordion-btn"
                >
                  <Text className="product-accordion-title">
                    Szczegóły produktu
                  </Text>
                  <Text className="text-muted text-xs font-bold">
                    {isDetailsExpanded ? "▲" : "▼"}
                  </Text>
                </TouchableOpacity>
                {isDetailsExpanded && (
                  <View className="product-card">
                    <Text className="product-card-title">
                      Wartości odżywcze
                    </Text>
                    <View className="product-detail-row">
                      <Text className="product-detail-label">Błonnik</Text>
                      <Text className="product-detail-value">
                        {fiber_100g != null ? `${fiber_100g} g` : "0 g"}
                      </Text>
                    </View>
                    <View className="product-detail-row">
                      <Text className="product-detail-label">Cukry</Text>
                      <Text className="product-detail-value">
                        {sugars_100g != null ? `${sugars_100g} g` : "0 g"}
                      </Text>
                    </View>
                    <View className="product-detail-row">
                      <Text className="product-detail-label">
                        Tłuszcze nasycone
                      </Text>
                      <Text className="product-detail-value">
                        {saturated_fat_100g != null
                          ? `${saturated_fat_100g} g`
                          : "0 g"}
                      </Text>
                    </View>
                    {allergens && allergens.length > 0 && (
                      <View className="mt-3">
                        <Text className="product-detail-label mb-1">
                          Alergeny
                        </Text>
                        {allergens.map((allergen, idx) => (
                          <View key={idx} className="product-allergen-chip">
                            <Text className="product-allergen-text">
                              {allergen}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                    {additional_info?.traces &&
                      additional_info.traces.length > 0 && (
                        <View className="product-warning-box">
                          <Text className="product-warning-text">
                            Może zawierać śladowe ilości:{" "}
                            {additional_info.traces.join(", ")}
                          </Text>
                        </View>
                      )}
                    <View className="mt-4 pt-2 border-t border-gray-100">
                      <Text className="product-card-title mb-1">
                        Informacje o produkcie
                      </Text>
                      <View className="product-detail-row">
                        <Text className="product-detail-label">Marka</Text>
                        <Text className="product-detail-value">
                          {brand || "Brak danych"}
                        </Text>
                      </View>
                      <View className="product-detail-row">
                        <Text className="product-detail-label">
                          Kraj sprzedaży
                        </Text>
                        <Text className="product-detail-value capitalize">
                          {countries?.join(", ") || "Brak danych"}
                        </Text>
                      </View>
                      <View className="product-detail-row">
                        <Text className="product-detail-label">Opakowanie</Text>
                        <Text className="product-detail-value">
                          {package_name || "Brak danych"}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </>
            }
          />
          <View className="bottom-unit-inputs absolute bottom-0 left-0 w-full flex-col items-center gap-y-2">
            <TouchableOpacity
              onPress={addProduct}
              className="w-[200] mx-auto py-1.5 px-2.5 rounded-[50] bg-primary"
            >
              <Text className="text-center text-white font-medium text-[12px]">
                + Dodaj do posiłku
              </Text>
            </TouchableOpacity>
            <View
              className="custom-unit-inputs"
              style={{ paddingBottom: 12 + insets.bottom }}
            >
              <TextInput
                value={customWeightG}
                className="custom-unit-input w-full max-w-[50]"
                onChangeText={setCustomWeightG}
                keyboardType="numeric"
              />
              <TextInput
                value={customUnitLabel}
                className="custom-unit-input flex-1"
                onChangeText={setCustomUnitLabel}
                placeholder="Porcja..."
                placeholderTextColor="#888888"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddProductAdv;
