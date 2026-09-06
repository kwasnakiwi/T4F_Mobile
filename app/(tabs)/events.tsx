import { Text, View } from "react-native";
import AppHeader from "../components/AppHeader";

export default function Events() {
  return (
    <>
      <AppHeader tabTitle="Events" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Events</Text>
      </View>
    </>
  );
}
