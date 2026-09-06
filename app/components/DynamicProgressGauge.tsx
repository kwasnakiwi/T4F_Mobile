import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ProgressGaugeProps {
  current: number; // np. 1441
  total: number; // np. 2135
  size?: number; // bazowy rozmiar (domyślnie 180)
}

export const DynamicProgressGauge: React.FC<ProgressGaugeProps> = ({
  current,
  total,
  size = 180,
}) => {
  const strokeWidth = Math.round(size * 0.09); // grubość paska
  const center = size / 2;
  // Lekko mniejszy promień, aby utworzyć więcej miejsca w środku na tekst
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Łuk 240 stopni
  const arcAngle = 240;
  const arcLength = (arcAngle / 360) * circumference;

  // Obliczenia postępu
  const percentage = total > 0 ? Math.min(1, current / total) : 0;
  const progressLength = arcLength * percentage;
  const startRotation = 150;

  const remaining = Math.max(0, total - current);

  // Dynamiczne wymiary
  const padding = Math.round(size * 0.09);
  const gapBetween = Math.round(size * 0.08);

  return (
    <View
      className="bg-white rounded-3xl items-center"
      style={{
        padding: padding,
        width: size + padding * 2,
      }}
    >
      {/* Kontener wykresu SVG */}
      <View
        style={{
          width: size,
          height: size * 0.75,
          position: "relative",
          marginBottom: gapBetween,
        }}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Szary łuk (tło) */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(${startRotation} ${center} ${center})`}
          />

          {/* Pomarańczowy łuk (postęp) */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E54500"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${progressLength} ${circumference}`}
            strokeLinecap="round"
            transform={`rotate(${startRotation} ${center} ${center})`}
          />
        </Svg>

        {/* Tekst obniżony i dopasowany rozmiarem */}
        <View style={styles.textWrapper} className="px-6">
          <Text className="text-gray-400 font-medium text-xs">Pozostało</Text>
          <Text
            className="text-primary font-bold my-0.5"
            style={{ fontSize: Math.round(size * 0.175) }} // Bezpieczny rozmiar cyfr
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {remaining}
          </Text>
          <Text className="text-gray-400 font-medium text-xs">kcal</Text>
        </View>
      </View>

      {/* Dolny pasek z wartościami */}
      <View
        className="bg-primary rounded-full w-full items-center justify-center"
        style={{ paddingVertical: Math.round(size * 0.05) }}
      >
        <Text
          className="text-white font-semibold"
          style={{ fontSize: Math.round(size * 0.085) }}
        >
          {`${current} / ${total} kcal`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30, // Przesunięcie tekstu w dół
  },
});

export default DynamicProgressGauge;
