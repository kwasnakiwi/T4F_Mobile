import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { apiFetch } from "../lib/interceptor";
import { formatDate2 } from "../lib/utils";

const ProductsListItem = ({ id, name, weight_g, kcal, mealType, packaging }: any) => {
  const parsedWeight = parseFloat(weight_g);
  const parsedKcal = parseFloat(kcal);
  const MEAL_TYPES_MAP = {
    Śniadanie: 1,
    "II Śniadanie": 2,
    Obiad: 3,
    Podwieczorek: 4,
    Kolacja: 5,
  };

  const truncate = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const addProduct = async () => {
    try {
      const res = await apiFetch(`diet/add-product/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: id,
          date: formatDate2(new Date()),
          //@ts-ignore
          meal_type: MEAL_TYPES_MAP[mealType],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      router.push("/(tabs)");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View className="ap-product">
        <View className="flex-col">
          <Text className="text-secondary font-medium text-[14px]">
            {truncate(name, 35)}
          </Text>
          <Text className="text-grey-secondary font-light text-[12px]">
            {packaging} {parsedWeight}g
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="text-tint text-[14px]">
            {parsedKcal.toLocaleString("pl-PL")}kcal
          </Text>
          <TouchableOpacity className="ap-plus">
            <Text
              className="text-white font-medium text-[14px]"
              onPress={addProduct}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProductsListItem;
