import { tabs } from "@/constants/data";
import { icons } from "@/constants/icons";
import clsx from "clsx";
import { useGlobalSearchParams, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDate, getWeekDays } from "../lib/utils";

const customTitles: Record<string, string> = {
  "scan-bar-code": "Skanuj kod kreskowy",
  "add-product": "Szczegóły produktu",
};

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

const AppHeader = () => {
  const pathname = usePathname();
  const globalParams = useGlobalSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const insets = useSafeAreaInsets();
  const days = getWeekDays(selectedDate);
  const router = useRouter();

  const pathSegments = pathname.split("/").filter(Boolean);
  const rawLastSegment = pathSegments[pathSegments.length - 1] || "";
  const lastSegment = decodeURIComponent(rawLastSegment);

  const currentTabName = pathname.replace("/", "") || "index";
  const activeTab = tabs.find((tab) => tab.name === currentTabName);

  const getHeaderTitle = () => {
    if (activeTab) return activeTab.title;

    const dynamicParam = (globalParams.type || globalParams.name) as string;
    if (dynamicParam) {
      return decodeURIComponent(dynamicParam);
    }

    if (customTitles[lastSegment]) return customTitles[lastSegment];

    if (lastSegment) {
      const formatted = lastSegment.replace(/-/g, " ");
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    return "Home";
  };

  const title = getHeaderTitle();
  const scanning = lastSegment === "scan-bar-code";
  const isHome = title === "Home";
  const isSubpage = !isHome && !scanning;

  return (
    <View
      className={clsx(
        "app-header-wrapper",
        scanning || (isSubpage && "no-radius"),
      )}
      style={{ paddingTop: insets.top }}
    >
      <View
        className={clsx(
          "app-header-row",
          isHome ? "justify-between" : "justify-center",
        )}
      >
        {isHome && (
          <>
            <TouchableOpacity className="app-header-panel">
              <Image source={icons.menu} />
            </TouchableOpacity>
            <View className="flex-col items-center">
              <Text className="app-header-title">{title}</Text>
              <Text className="app-header-desc">
                Cześć, <Text className="orange-text">Andrzeju</Text> 👋
              </Text>
            </View>
            <TouchableOpacity className="app-header-panel">
              <Image source={icons.bell} />
            </TouchableOpacity>
          </>
        )}
        {scanning && (
          <View className="flex-row justify-center relative w-full items-center">
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="py-4 rotate-90 absolute left-0"
            >
              <Image source={icons.angleDown} />
            </TouchableOpacity>
            <Text className="app-header-title">{title}</Text>
          </View>
        )}
        {isSubpage && (
          <View className="flex-row justify-center relative w-full items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="py-2 absolute left-0"
            >
              <Image source={icons.angleDown} className="rotate-90" />
            </TouchableOpacity>
            <Text className="app-header-title">{title}</Text>
          </View>
        )}
      </View>
      {isHome && (
        <>
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
        </>
      )}
    </View>
  );
};

export default AppHeader;
