import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen name="rideScreen" options={{ headerShown: true }} />
      </Stack>
    </SafeAreaProvider>
  );
}
