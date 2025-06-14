import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/Map";
import RideComponent from "../components/rideComponent";

export default function RideScreen() {
  const mapRef = useRef<{ getDirection: () => void }>(null);

  const handleGetDirection = () => {
    mapRef.current?.getDirection();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapSection}>
        <Map ref={mapRef} />
      </View>
      <View style={styles.rideSection}>
        <RideComponent onDestinationSelected={handleGetDirection} />
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
