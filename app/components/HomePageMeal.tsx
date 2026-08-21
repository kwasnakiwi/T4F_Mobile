import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface HomePageMealProps {
  name: string;
  data?: any;
  icon: any;
}

const HomePageMeal: React.FC<HomePageMealProps> = ({ name, data, icon }) => {
  return (
    <View className="default-panel hp-meal">
      <Image source={icon} resizeMode="contain" />
      <View className="flex-1">
        <Text className="font-medium text-[15px] text-[#07253b]">{name}</Text>
        {data === null && (
          <Text className="text-muted text-[11px] font-normal">
            Nic tu jeszcze nie ma
          </Text>
        )}
      </View>
      <TouchableOpacity className="add-meal size-8" activeOpacity={0.8}>
        <Text className="add-meal-plus">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePageMeal;
