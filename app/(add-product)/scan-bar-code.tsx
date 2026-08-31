import { images } from "@/constants/images";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { apiFetch } from "../lib/interceptor";

export default function ScanBarcodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Szukanie produktu...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const params = useLocalSearchParams<{
    meal_type?: string;
    mealName?: string;
    date?: string;
  }>();

  const MEAL_TYPES_MAP: Record<string, number> = {
    Śniadanie: 1,
    "II Śniadanie": 2,
    Obiad: 3,
    Podwieczorek: 4,
    Kolacja: 5,
  };

  const currentMealType = params.meal_type
    ? parseInt(params.meal_type, 10)
    : params.mealName && MEAL_TYPES_MAP[params.mealName]
      ? MEAL_TYPES_MAP[params.mealName]
      : 1;

  const currentDate = params.date || "2026-08-27";

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned || loading || errorMessage) return;

    setScanned(true);
    setLoading(true);
    setLoadingText("Szukanie produktu w bazie...");

    try {
      const barcodeRes = await apiFetch(`diet/products/barcode/${data}/`);
      const productData = await barcodeRes.json();

      if (!barcodeRes.ok || !productData?.id) {
        throw new Error("Nie znaleziono produktu o takim kodzie kreskowym.");
      }

      setLoadingText(`Dodawanie "${productData.name || productData.title}"...`);
      const addRes = await apiFetch("diet/add-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productData.id,
          date: currentDate,
          meal_type: currentMealType,
        }),
      });

      const addResData = await addRes.json();

      if (!addRes.ok) {
        throw new Error(
          addResData?.detail ||
            addResData?.message ||
            "Nie udało się dodać produktu do posiłku.",
        );
      }
      router.back();
    } catch (error: any) {
      console.error("Błąd skanowania/dodawania:", error);
      setErrorMessage(
        error.message || "Wystąpił błąd podczas przetwarzania kodu.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetScanner = () => {
    setErrorMessage(null);
    setScanned(false);
  };

  if (!permission) {
    return <View className="home-page-container flex-1 bg-app-background" />;
  }

  if (!permission.granted) {
    return (
      <View className="home-page-container flex-1 justify-center items-center p-4">
        <Text className="text-center text-base mb-4">
          Wymagany jest dostęp do kamery, aby zeskanować kod.
        </Text>
        <TouchableOpacity
          className="add-meal px-6 py-3"
          onPress={requestPermission}
        >
          <Text className="text-white font-medium">Udziel zgody</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="home-page-container flex-1 bg-transparent">
      <View className="flex-1 items-center justify-center relative">
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "qr", "upc_a", "upc_e"],
          }}
          onBarcodeScanned={
            scanned || errorMessage ? undefined : handleBarcodeScanned
          }
        />
        {loading && (
          <View className="absolute inset-0 bg-black/70 justify-center items-center z-10 px-6">
            <ActivityIndicator size="large" color="#E54500" />
            <Text className="text-white mt-3 font-medium text-center">
              {loadingText}
            </Text>
          </View>
        )}
        {errorMessage && (
          <View className="absolute inset-0 bg-black/80 justify-center items-center z-20 p-6">
            <View className="bg-white p-6 rounded-2xl w-full max-w-sm items-center">
              <Text className="text-lg font-bold text-red-600 mb-2">Błąd</Text>
              <Text className="text-center text-gray-700 mb-6">
                {errorMessage}
              </Text>
              <TouchableOpacity
                onPress={handleResetScanner}
                className="bg-primary w-full py-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold">Skanuj ponownie</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View className="barcode-scan -mt-16">
          <Text className="barcode-scan-text">Ustaw kod kreskowy w kadrze</Text>
          <Image source={images.barCodeScan} />
          <Text className="barcode-scan-text">
            Produkt nie jest widoczny? Wpisz ręcznie
          </Text>
        </View>

        <View
          className="barcode-type-code-wrapper"
          style={{ bottom: insets.bottom + 100 }}
        >
          <TouchableOpacity className="barcode-type-code-btn">
            <Text className="font-bold text-white">Wpisz kod ręcznie</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
