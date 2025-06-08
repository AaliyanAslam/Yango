import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Images
import BikeDelivery from "@/assets/images/bikedimg.png";
import CarDelivery from "@/assets/images/cardimg.png";
import WhereCar from "@/assets/images/wherecar.png";
import YangoLogo from "@/assets/images/yangoLogo.png";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import b1 from "../assets/images/2b1.jpg";
import b2 from "../assets/images/2b2.jpg";
import b3 from "../assets/images/2b3.jpg";
import Banner1 from "../assets/images/banner1.jpg";
import Banner2 from "../assets/images/banner2.jpg";

// Components
import Drawer from "@/components/Drawer";
import { router } from "expo-router";
export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false);

  const checkUserAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
      }
      else if (!user) {
        console.log("No user is signed in");
        router.replace("/login");
      }
    })
  }
  checkUserAuth();



  const goToRideScreen = () => {
    router.push("/ridescreen");
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>

        <View style={[styles.container, { backgroundColor: "#fff" }]}>
          {/* NAVBAR */}
          <View style={styles.navContainer}>
            <Image source={YangoLogo} style={styles.img} />
            <TouchableOpacity
              onPress={() => {
                setShowDrawer(!showDrawer);
                console.log("Drawer toggled", !showDrawer);
              }}
            >
              <FontAwesome name="bars" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          {showDrawer && (
            <Drawer visible={showDrawer} setVisible={setShowDrawer} />
          )}

          {/* Location */}
          <View style={styles.navigatorContainer}>
            <Text>Your location</Text>
            <Ionicons name="navigate" size={15} color="black" />
          </View>

          {/* Location Service */}
          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <FontAwesome6 name="map-location-dot" size={24} color="#000" />
            </View>
            <View>
              <Text style={styles.text}>Enable location service</Text>
              <Text style={styles.grayText}>We can't see where you are</Text>
            </View>
          </View>

          {/* Address & Share */}
          <View style={styles.addressShareContainer}>
            <Pressable style={styles.addressButton}>
              <Text style={styles.addressText}>Enter address</Text>
            </Pressable>
            <Pressable style={styles.shareButton}>
              <Text style={styles.shareText}>Share</Text>
            </Pressable>
          </View>

          {/* Main Scrollable Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.dataContainer}>
              {/* Delivery Options */}
              <View style={styles.deliveryOptions}>
                <Image source={BikeDelivery} style={styles.vehicle} />
                <Image source={CarDelivery} style={styles.vehicle} />
              </View>

              {/* Where to go */}
              <TouchableOpacity
                style={styles.whereToContainer}
                onPress={() => {
                  goToRideScreen();
                }}
              >
                <Image source={WhereCar} style={styles.carImg} />
                <Text style={styles.whereToText}>Where to?</Text>
                <MaterialIcons name="navigate-next" size={24} color="#000" />
              </TouchableOpacity>

              {/* Recent Rides */}
              <View style={styles.recentRide}>
                <View style={styles.dataLogo}>
                  <Entypo name="location-pin" size={24} color="#000" />
                </View>
                <View>
                  <Text style={styles.text}>A Street, SB9</Text>
                  <Text style={styles.grayText}>
                    KDA Scheme 1E, Sindh, Pakistan
                  </Text>
                </View>
              </View>

              <View style={styles.recentRide}>
                <View style={styles.dataLogo}>
                  <FontAwesome name="shopping-bag" size={24} color="#000" />
                </View>
                <View>
                  <Text style={styles.text}>Haidery Market</Text>
                  <Text style={styles.grayText}>North Nazimabad Block SCB</Text>
                </View>
              </View>

              {/* Banners */}
              <View style={styles.bannerWrapper}>
                <Image source={Banner1} style={styles.banner1} />
                <Image source={Banner2} style={styles.banner1} />
                <View style={styles.b21Wrapper}>
                  <Image source={b3} style={styles.b1} />
                  <View style={{ gap: 10 }}>
                    <Image source={b1} style={styles.b2} />
                    <Image source={b2} style={styles.b3} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
  },
  img: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  navigatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  locationIcon: {
    backgroundColor: "#F7F7F7",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  addressShareContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 8,
  },
  addressButton: {
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 15,
    paddingHorizontal: 35,
  },
  addressText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
  },
  shareButton: {
    backgroundColor: "#FF2929",
    padding: 15,
    borderRadius: 15,
    paddingHorizontal: 61,
  },
  shareText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  grayText: {
    color: "#A9A9A9",
    fontSize: 12,
  },
  text: {
    fontSize: 15,
  },
  dataContainer: {
    marginTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    marginBottom: 260,
    borderBottomWidth: 0,
    overflow: "hidden",
    marginHorizontal: -11,
  },
  deliveryOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 8,
  },
  vehicle: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 20,
  },
  whereToContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    marginTop: 20,
    marginHorizontal: 24,
    borderRadius: 20,
    paddingVertical: 10,
  },
  carImg: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    borderRadius: 10,
  },
  whereToText: {
    fontWeight: "500",
    opacity: 0.8,
  },
  recentRide: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 24,
    backgroundColor: "#FBFBFB",
    padding: 8,
    borderRadius: 20,
  },
  dataLogo: {
    backgroundColor: "#DBDBDB",
    padding: 11,
    borderRadius: 10,
    marginRight: 10,
    opacity: 0.4,
  },
  bannerWrapper: {
    marginVertical: 20,
    marginHorizontal: 30,
    // marginBottom: 0,
    gap: 10,
  },
  banner1: {
    width: 300,
    height: 150,
    resizeMode: "cover",
    borderRadius: 20,
  },
  b21Wrapper: {
    flexDirection: "row",
    gap: 10,
  },
  b1: {
    width: 141,
    height: 295,
    resizeMode: "cover",
    borderRadius: 20,
  },
  b2: {
    width: 150,
    height: 140,
    resizeMode: "cover",
    borderRadius: 20,
  },
  b3: {
    width: 150,
    height: 140,
    resizeMode: "cover",
    borderRadius: 20,
  },
});
