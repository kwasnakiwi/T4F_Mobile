import { DAYS_NAMES } from "@/constants/data";

export const getWeekDays = (selectedDate: Date) => {
  const date = new Date(selectedDate);
  const dayOfWeek = date.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);

    return {
      date: day,
      dayNumber: day.getDate(),
      dayName: DAYS_NAMES[day.getDay()],
      fullDate: day.toISOString().split("T")[0],
    };
  });
};

export const formatDate = (date: Date | string): string => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();

  return `${day.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year}`;
};

export const formatDate2 = (date: Date | string): string => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();

  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};

export const BASE_URL = "https://time4.fit/api/v1/";
