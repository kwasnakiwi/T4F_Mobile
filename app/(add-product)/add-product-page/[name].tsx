import ProductsListItem from "@/app/components/ProductsListItem";
import { addProductsPageButtons } from "@/constants/data";
import { icons } from "@/constants/icons";
import clsx from "clsx";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddProductsPage = () => {
  const { name } = useLocalSearchParams();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const getProducts = async () => {
      const trimmedSearch = search.trim();
      const baseUrl = "https://time4.fit/api/v1/diet/products/";

      const url = trimmedSearch
        ? `${baseUrl}?search=${encodeURIComponent(trimmedSearch)}`
        : baseUrl;

      try {
        const res = await fetch(url);

        if (!res.ok) {
          console.error(`Błąd serwera: ${res.status}`);
          return;
        }

        const data = await res.json();

        const productsList = Array.isArray(data) ? data : data?.results || [];
        setProducts(productsList);
      } catch (err) {
        console.error("Błąd sieciowy:", err);
      }
    };

    const timer = setTimeout(() => {
      getProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const categories = [
    { id: "all", label: "Wszystkie" },
    { id: "favorites", label: "Ulubione" },
    { id: "created_by_me", label: "Stworzone przeze mnie" },
  ];

  return (
    <View className="home-page-container px-2.5 pt-3.5 flex-1">
      <View className="add-product-buttons">
        {addProductsPageButtons.map((btn, i) => (
          <TouchableOpacity
            onPress={() => router.push(btn.link as Href)}
            key={i}
            className="add-product-button"
          >
            <Image source={btn.icon} />
            <Text className="font-semibold text-secondary text-[10px]">
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="ap-search-input-box">
        <TextInput
          className="ap-search-input"
          placeholder="Wyszukaj pozycji..."
          placeholderTextColor="#AAB4BF"
          placeholderClassName="ap-search-input-placeholder"
          value={search}
          onChangeText={setSearch}
          maxLength={50}
        />
        <Image className="search-icon" source={icons.search} />
      </View>

      <View className="add-product-categories">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            className={clsx(
              "add-product-category",
              cat.id === category && "current",
            )}
            onPress={() => setCategory(cat.id)}
          >
            <Text
              className={clsx(
                "add-product-category-text",
                cat.id === category && "current",
              )}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        className="ap-products-list flex-1"
        data={products}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 16,
          paddingBottom: insets.bottom + 150,
        }}
        renderItem={({ item }) => (
          <ProductsListItem
            id={item.id}
            name={item.name}
            weight_g={item.weight_g}
            kcal={item.kcal}
          />
        )}
      />
    </View>
  );
};

export default AddProductsPage;
