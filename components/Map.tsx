import { useLocation } from "@/hooks/useLocation";
import { decodePolyline } from "@/lib/decodePolyline";
import { RootState } from "@/redux/store/store";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";

const Map = forwardRef((_, ref) => {
  const { location } = useLocation();
  console.log(location);
  

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [encodedPolyline, setEncodedPolyline] = useState<string | null>(null);
  const [distance, setDistance] = useState<any>(null);

  const destinationLocation = useSelector(
    (state: RootState) => state.location.location
  );

  const getDirection = async () => {
    if (!location || !destinationLocation) {
      setErrorMsg("Location not available");
      return;
    }

    const origin = `${location.coords.latitude},${location.coords.longitude}`;
    const destination = `${destinationLocation.lat},${destinationLocation.lng}`;

    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&region=pk&key=AlzaSyYRSxomX6XxUSl0G0xbpJMIeyftdlrs71Q`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const finalDestination = await response.json();

      if (finalDestination.routes.length) {
        setDistance(finalDestination.routes[0].legs[0]);
        setEncodedPolyline(finalDestination.routes[0].overview_polyline.points);
      } else {
        setErrorMsg("No routes found");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to get directions");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    getDirection,
  }));

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Permission required to access location.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        {distance?.distance?.text} {distance?.duration?.text}
      </Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      {loading && <ActivityIndicator size="large" color="#90D1CA" />}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
          description="Current location"
        >
          <View style={styles.markerContainer}>
            <FontAwesome5 name="map-marker-alt" size={30} color="green" />
          </View>
        </Marker>

        {destinationLocation?.lat && destinationLocation?.lng && (
          <Marker
            coordinate={{
              latitude: destinationLocation.lat,
              longitude: destinationLocation.lng,
            }}
            title="Destination"
            description="Selected location"
          >
            <View style={styles.markerContainer}>
              <FontAwesome5 name="map-marker-alt" size={30} color="red" />
            </View>
          </Marker>
        )}

        {encodedPolyline && (
          <Polyline
            coordinates={decodePolyline(encodedPolyline)}
            strokeColor="red"
            strokeWidth={3}
          />
        )}
      </MapView>
      <View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
});

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
