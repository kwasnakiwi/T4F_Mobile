import { Text, View } from "react-native";
import AppHeader from "../components/AppHeader";

export default function Profile() {
  return (
    <>
      <AppHeader tabTitle="Profile" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Profile</Text>
      </View>
    </>
  );
}
