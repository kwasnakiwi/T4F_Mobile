import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { getSecureItem, saveSecureItem } from "./secureStore";
import { BASE_URL } from "./utils";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

let isRefreshing = false;

export const apiFetch = async (
  endpoint: string,
  options: FetchOptions = {},
) => {
  const accessToken = await getSecureItem("access_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !isRefreshing) {
    isRefreshing = true;

    try {
      const refreshToken = await getSecureItem("refresh_token");

      if (!refreshToken) {
        throw new Error("Brak refresh tokena");
      }

      const refreshResponse = await fetch(`${BASE_URL}user/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Refresh token wygasł");
      }

      const refreshData = await refreshResponse.json();

      await saveSecureItem("access_token", refreshData.access);
      if (refreshData.refresh) {
        await saveSecureItem("refresh_token", refreshData.refresh);
      }
      headers["Authorization"] = `Bearer ${refreshData.access}`;

      response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (error) {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");

      router.replace("/(auth)/sign-in");
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }

  return response;
};
