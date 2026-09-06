import { Text, View } from "react-native";
import AppHeader from "../components/AppHeader";

export default function Add() {
  return (
    <>
      <AppHeader tabTitle="Add" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Add</Text>
      </View>
    </>
  );
}
