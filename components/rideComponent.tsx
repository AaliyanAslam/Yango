import { setLocation } from "@/redux/reducers/locationSlice";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";

type Prediction = {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

type Props = {
  onDestinationSelected: () => void;
};

export default function RideComponent({ onDestinationSelected }: Props) {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const dispatch = useDispatch();

  const fetchPredictions = async () => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${destinationQuery}&location=30.3753,69.3451&radius=1000000&key=AlzaSyYRSxomX6XxUSl0G0xbpJMIeyftdlrs71Q`
      );
      const data = await response.json();
      setPredictions(data.results || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const selectDestination = (item: Prediction) => {
    dispatch(setLocation(item.geometry.location));
    setPredictions([]);
    setDestinationQuery(item.name);
    onDestinationSelected();
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (destinationQuery.trim().length > 2) {
        fetchPredictions();
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [destinationQuery]);

  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.routeItem}>
          <Image
            source={require("@/assets/images/green-circle.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>From</Text>
          <Text style={styles.location}>Your Current Location</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.routeItem}>
          <Image
            source={require("@/assets/images/red-circle.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Destination</Text>
          <Text style={styles.location}>
            {destinationQuery || "Search a destination"}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter destination..."
          placeholderTextColor="#aaa"
          value={destinationQuery}
          onChangeText={setDestinationQuery}
          returnKeyType="search"
        />

        {predictions.length > 0 && (
          <ScrollView style={styles.predictionsContainer}>
            {predictions.map((item) => (
              <TouchableOpacity
                key={item.place_id}
                style={styles.predictionItem}
                onPress={() => selectDestination(item)}
              >
                <Text style={styles.predictionTitle}>{item.name}</Text>
                <Text style={styles.predictionDetails}>
                  {item.formatted_address}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  input: {
    height: 52,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  predictionsContainer: {
    marginTop: 12,
    maxHeight: 250,
  },
  predictionItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#eee",
    borderWidth: 1,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  predictionDetails: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  infoContainer: {
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 20,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: "contain",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginRight: 8,
    width: 90,
  },
  location: {
    fontSize: 15,
    color: "#555",
    flexShrink: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
});
