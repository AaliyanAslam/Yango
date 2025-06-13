import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "@/redux/store/store";

export default function _layout() {
  return (
   <Provider store={store}>
     <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="rideScreen" options={{ headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
   </Provider>
  );
}
