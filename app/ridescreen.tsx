import React from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/Map";
import RideComponent from "../components/rideComponent";

export default function RideScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.mapSection}>
        <Map />
      </View>
      <View style={styles.rideSection}>
        <RideComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapSection: {
    flex: 1,
  },
  rideSection: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
