import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Map from "../components/Map";

export default function RideScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 300 }}>
        <Map />
      </View>
      <Text>maps is remain</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
