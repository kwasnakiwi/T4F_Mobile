import { icons } from "@/constants/icons";
import clsx from "clsx";
import {
  Link,
  useGlobalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDate, getWeekDays } from "../lib/utils";

const customTitles: Record<string, string> = {
  "scan-bar-code": "Skanuj kod kreskowy",
  "add-product": "Szczegóły produktu",
};

const AUTH_TITLES = new Set([
  "Zaloguj się",
  "Zarejestruj się",
  "Weryfikacja 2-etapowa",
  "Zapomniałem hasła",
  "Stwórz nowe hasło",
  "Otrzymano maila",
  "Zmieniono hasło",
]);

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

interface AppHeaderProps {
  tabTitle: string;
  selectedDate?: Date;
  setSelectedDate?: (newDate: Date) => void;
}

const AppHeader = ({
  tabTitle,
  selectedDate = new Date(),
  setSelectedDate,
}: AppHeaderProps) => {
  const pathname = usePathname();
  const globalParams = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const days = getWeekDays(selectedDate);

  const pathSegments = pathname.split("/").filter(Boolean);
  const rawLastSegment = pathSegments[pathSegments.length - 1] || "";
  const lastSegment = decodeURIComponent(rawLastSegment);

  const isScanning = lastSegment === "scan-bar-code";
  const isHome = tabTitle === "Home";
  const isSignIn = tabTitle === "Zaloguj się";
  const isAuthView = AUTH_TITLES.has(tabTitle);
  const isSubpage = !isHome && !isScanning && !isAuthView;

  const shouldDisableRadius = isScanning || isSubpage || isAuthView;

  return (
    <View
      className={clsx("app-header-wrapper", shouldDisableRadius && "no-radius")}
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

            <View className="flex-col items-center relative">
              <Text className="app-header-title">{tabTitle}</Text>
              <Text className="app-header-desc">
                Cześć, <Text className="orange-text">Andrzeju</Text> 👋
              </Text>
              <Link
                href="/(auth)/sign-in"
                className="absolute -right-full top-[50%] translate-y-[-50%] text-white bg-primary p-1.5 rounded-[4] font-medium"
              >
                Zaloguj się
              </Link>
            </View>

            <TouchableOpacity className="app-header-panel">
              <Image source={icons.bell} />
            </TouchableOpacity>
          </>
        )}

        {isScanning && (
          <View className="flex-row justify-center relative w-full items-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}
              className="py-4 rotate-90 absolute left-0"
            >
              <Image source={icons.angleDown} />
            </TouchableOpacity>
            <Text className="app-header-title">{tabTitle}</Text>
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
            <Text className="app-header-title">{tabTitle}</Text>
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
                onPress={() => setSelectedDate?.(day.date)}
              >
                <Text className="day-name">{day.dayName}</Text>
                <Text className="day-number">{day.dayNumber}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {isSignIn && (
        <View className="app-sign-in-top">
          <View className="logo-placeholder" />
          <Text className="logo-text">
            Time <Text className="orange-bold">4</Text> Fit
          </Text>
          <Text className="logo-desc">
            Jedno miejsce. Cały Twój aktywny styl życia
          </Text>
        </View>
      )}
    </View>
  );
};

export default AppHeader;
