import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Map() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
      initialRegion={
        {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      } />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
