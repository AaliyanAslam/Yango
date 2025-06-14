import { useLocation } from "@/hooks/useLocation";
import { decodePolyline } from "@/lib/decodePolyline";
import { RootState } from "@/redux/store/store";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = forwardRef((_, ref) => {
  const { location } = useLocation();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [encodedPolyline, setEncodedPolyline] = useState<string | null>(null);
  const [distance, setDistance] = useState<any>(null);
  const [fare , setFare] =  useState<any>("");

  const destinationLocation = useSelector(
    (state: RootState) => state.location.location
  );
  const MakeFare = () => {
  const perKM = 35;

  if (distance?.distance?.text) {
    // Remove " km" and convert to float
    const km = parseFloat(distance.distance.text.replace(" km", ""));
    const calculatedFare = km * perKM;
    calculatedFare.toFixed(0)
    setFare(calculatedFare);
  } else {
    setFare(0); // Or handle invalid distance
  }
};

useEffect(() => {
  if (distance) {
    MakeFare();
  }
}, [distance]);


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
        setErrorMsg(null);
      } else {
        setErrorMsg("No routes found");
        setDistance(null);
        setEncodedPolyline(null);
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
      <View style={styles.centered}>
        <Text style={styles.errorText}>Location permission required.</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
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
            strokeColor="#FF4C4C"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Distance Card */}
      {distance && (
        <SafeAreaView style={styles.cardWrapper}>
          <View style={styles.card}>
           <View>
             <Text style={styles.cardText}>
              Distance:{" "}
              <Text style={styles.cardHighlight}>
                {distance?.distance?.text}
              </Text>
            </Text>
            <Text style={styles.cardText}>
              Duration:{" "}
              <Text style={styles.cardHighlight}>
                {distance?.duration?.text}
              </Text>
            </Text>
           </View>
            <View >
  <Text style={styles.fareLabel}>Estimated Fare:</Text>
  <Text style={styles.fareValue}>Rs. {fare}</Text>
</View>

          </View>
        </SafeAreaView>
      )}

      {/* Loading State */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#00A8E8" />
          <Text style={styles.loadingText}>Getting directions...</Text>
        </View>
      )}

      {/* Error Message */}
      {errorMsg && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
});

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 20,
  },
  card: {
 backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  cardHighlight: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  overlay: {
    position: "absolute",
    top: "45%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorBox: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

fareLabel: {
  fontSize: 16,
  color: "#333",
},
fareValue: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#2E8B57", // Greenish
},

});
