import { Image, Text, View } from "react-native";

const MacrosListElement = ({
  name,
  current,
  total,
  icon,
}: MacrosListElementProps) => {
  return (
    <View className="default-panel hp-macros-element">
      <View className="w-2.5">
        <Image source={icon} />
      </View>
      <View className="hp-macros-element-content">
        <Text className="hp-macros-element-name">{name}</Text>
        <View className="hp-macros-element-progress-wrapper">
          <View
            className="hp-macros-element-progress bg-primary w-full"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </View>
        <Text className="hp-macros-element-amount">
          <Text className="font-medium text-black">{current}</Text>/{total}g
        </Text>
      </View>
    </View>
  );
};

export default MacrosListElement;
