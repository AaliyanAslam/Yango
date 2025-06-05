  import Home from "@/app/Home";
  import React from "react";
  import { StyleSheet } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";

  export default function Index() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Home />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({});
