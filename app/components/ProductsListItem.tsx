import { Text, TouchableOpacity, View } from "react-native";

const ProductsListItem = ({
  id,
  name,
  weight_g,
  kcal,
}: ProductListItemProps) => {
  const parsedWeight = parseFloat(weight_g);
  const parsedKcal = parseFloat(kcal);

  const truncate = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <>
      <View className="ap-product">
        <View className="flex-col">
          <Text className="text-secondary font-medium text-[14px]">
            {truncate(name, 35)}
          </Text>
          <Text className="text-grey-secondary font-light text-[12px]">
            {parsedWeight}g
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Text className="text-tint text-[14px]">
            {parsedKcal.toLocaleString("pl-PL")}kcal
          </Text>
          <TouchableOpacity className="ap-plus">
            <Text className="text-white font-medium text-[14px]">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProductsListItem;
