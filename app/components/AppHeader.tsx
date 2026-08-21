import { icons } from "@/constants/icons";
import { formatDate, getWeekDays } from "../lib/utils";
import clsx from "clsx";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppHeader = ({ title }: AppHeaderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const insets = useSafeAreaInsets();
  const days = getWeekDays(selectedDate);

  const getDateLabel = (inputDate: Date | string): string => {
    const date = new Date(inputDate);
    const today = new Date();
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffInDays = Math.round(
      (d1.getTime() - d2.getTime()) / (1000 * 3600 * 24),
    );

    if (diffInDays === 0) return "Dziś";
    if (diffInDays === 1) return "Jutro";
    if (diffInDays === -1) return "Wczoraj";
    if (diffInDays > 1) return `Za ${diffInDays} dni`;

    return `${Math.abs(diffInDays)} dni temu`;
  };

  return (
    <>
      <View
        className="app-header-wrapper"
        style={{
          paddingTop: insets.top,
        }}
      >
        <View className="app-header-row">
          <TouchableOpacity className="app-header-panel">
            <Image source={icons.menu} />
          </TouchableOpacity>
          <View className="flex-col items-center">
            <Text className="app-header-title">{title}</Text>
            {title === "Home" && (
              <Text className="app-header-desc">
                Cześć, <Text className="orange-text">Andrzeju</Text> 👋
              </Text>
            )}
          </View>
          <TouchableOpacity className="app-header-panel">
            <Image source={icons.bell} />
          </TouchableOpacity>
        </View>
        <View className="app-header-date-row">
          <Text className="app-header-date">
            {getDateLabel(selectedDate)},{" "}
            <Text className="orange-text">{formatDate(selectedDate)}</Text>
          </Text>
        </View>
        <View className="app-header-days">
          {days.map((day, i) => (
            <TouchableOpacity
              className={clsx(
                "app-header-panel",
                "app-header-day",
                day.date.toDateString() === selectedDate.toDateString() &&
                  "app-header-selected-day",
              )}
              key={i}
              onPress={() => setSelectedDate(day.date)}
            >
              <Text className="day-name">{day.dayName}</Text>
              <Text className="day-number">{day.dayNumber}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

export default AppHeader;
