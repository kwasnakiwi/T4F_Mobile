import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface WaterProgressCircleProps {
  label?: string; // np. "Woda"
  current: number; // np. 500
  total: number; // np. 2000
  unit?: string; // np. "ml"
  size?: number; // domyślnie 74
  progressColor?: string; // opcjonalny kolor wypełnienia
}

export const WaterProgressCircle: React.FC<WaterProgressCircleProps> = ({
  label = "Woda",
  current,
  total,
  unit = "ml",
  size = 74,
  progressColor = "#46687A", // Kolor jasniejszego paska ze zdjęcia
}) => {
  const strokeWidth = 5; // Grubość pierścienia
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  // Obliczenia postępu (od 0 do 1)
  const percentage = total > 0 ? Math.min(1, Math.max(0, current / total)) : 0;
  const progressOffset = circumference - circumference * percentage;

  return (
    <View style={{ width: size, height: size, position: "relative" }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Tło pierścienia (ciemniejsze) */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2A3C49" // Ciemny szaroniebieski podkład
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Wypełnienie postępu (jaśniejsza niebieska linia) */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      {/* Teksty wewnątrz koła */}
      <View style={styles.textWrapper} className="px-1">
        <Text className="text-[9px] text-gray-300 font-regular leading-none">
          {label}
        </Text>

        <Text
          className="text-white font-bold -my-px"
          style={{ fontSize: 18 }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {current}
        </Text>

        <Text className="text-[8px] text-gray-300 font-light leading-none">
          / {total} {unit}
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
    backgroundColor: "transparent", // Przezroczyste tło
  },
});

export default WaterProgressCircle;
