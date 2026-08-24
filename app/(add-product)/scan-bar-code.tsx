import { images } from "@/constants/images";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScanBarcodeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);
  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;
    setScanned(true);
    console.log(`Kod odczytany! Typ: ${type}, Data: ${data}`);
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
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        />
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
