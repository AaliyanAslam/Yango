// Map.tsx
import { useLocation } from "@/hooks/useLocation";
import { decodePolyline } from "@/lib/decodePolyline";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store"; 

export default function Map() {
  const { location } = useLocation();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [encodedPolyline, setEncodedPolyline] = useState<string | null>(null);
  const [distance, setDistance] = useState<any>(null); // You can type this better later

  // get data from redux
  const destinationLocation = useSelector((state: RootState) => state.location.location);

  const getDirection = async () => {
    if (!location || !destinationLocation) {
      setErrorMsg("Location not available");
      return;
    }

    const origin = `${location.coords.latitude},${location.coords.longitude}`;
    const destination = `${destinationLocation.lat},${destinationLocation.lng}`;

    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AlzaSyYRSxomX6XxUSl0G0xbpJMIeyftdlrs71Q`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const rasta = await response.json();

      if (rasta.routes.length) {
        setDistance(rasta.routes[0].legs[0]);
        setEncodedPolyline(rasta.routes[0].overview_polyline.points);
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
        {destinationLocation?.lat && destinationLocation?.lng && (
          <Marker
            coordinate={{
              latitude: destinationLocation.lat,
              longitude: destinationLocation.lng,
            }}
            title="Destination"
            description="Selected location"
          />
        )}

        {encodedPolyline && (
          <Polyline
            coordinates={decodePolyline(encodedPolyline)}
            strokeColor="#90D1CA"
            strokeWidth={6}
          />
        )}
      </MapView>

      <Button
        onPress={getDirection}
        title="Get Direction"
        color="#90D1CA"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
