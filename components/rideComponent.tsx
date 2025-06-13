import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { setLocation } from "@/redux/reducers/locationSlice";

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

export default function RideComponent() {
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
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Destination"
        value={destinationQuery}
        onChangeText={setDestinationQuery}
        onSubmitEditing={fetchPredictions}
        returnKeyType="search"
      />
      {predictions.length > 0 && (
        <ScrollView style={styles.predictionsContainer}>
          {predictions.map((item) => (
            <TouchableOpacity
              key={item.place_id}
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

      <Button title="Book Ride" color="#90D1CA" onPress={fetchPredictions} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  predictionsContainer: {
    maxHeight: 200,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  predictionDetails: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
});
