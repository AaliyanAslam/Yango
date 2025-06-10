import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log("🚀 ~ getCurrentLocation ~ status:", status);

      if (status !== "granted") {
        console.log("Permission to access location was denied");

        // setErrorMsg('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    }

    getCurrentLocation();
  }, []);

  return { location };
}