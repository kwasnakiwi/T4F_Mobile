import { Text, View } from "react-native";
import AppHeader from "../components/AppHeader";

export default function Awards() {
  return (
    <>
      <AppHeader tabTitle="Awards" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Awards</Text>
      </View>
    </>
  );
}
