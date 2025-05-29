import BikeDelivery from "@/assets/images/bikedimg.png";
import CarDelivery from "@/assets/images/cardimg.png";
import WhereCar from "@/assets/images/wherecar.png";
import YangoLogo from "@/assets/images/yangoLogo.png";
import Drawer from "@/components/Drawer";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import b1 from "../assets/images/2b1.jpg";
import b2 from "../assets/images/2b2.jpg";
import b3 from "../assets/images/2b3.jpg";
import Banner1 from "../assets/images/banner1.jpg";
import Banner2 from "../assets/images/banner2.jpg";

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

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <View style={styles.container}>
      {/* NAVBAR CONTAINER */}
      <View style={styles.navContainer}>
        <View className="image-container">
          <Image source={YangoLogo} style={styles.img} />
        </View>
        <TouchableOpacity
          className="hamburger-container"
          onPress={() => setShowDrawer(!showDrawer)}
        >
          <FontAwesome name="bars" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {/* DRAWER */}
      {showDrawer && <Drawer />}
      {/* NAVIGATOR PART */}
      <View className="your-location" style={styles.navigatorContainer}>
        <View>
          <Text>Your location</Text>
        </View>
        <View className="arrow-logo">
          <Ionicons name="navigate" size={15} color="black" />
        </View>
      </View>
      {/* ENABLED LOCATION SERVICES */}
      <View
        className="location-services"
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <View style={styles.location}>
          <FontAwesome6 name="map-location-dot" size={24} color="#000" />
        </View>
        <View>
          <View>
            <Text style={{ fontSize: 15 }}>Enable locaion service</Text>
          </View>
          <View>
            <Text style={styles.grayText}>We can't see where you are </Text>
          </View>
        </View>
      </View>
      {/* ENTER ADDRESS AND SHARE BUTTON */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#F7F7F7",
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
            paddingHorizontal: 35,
          }}
        >
          <Text style={{ color: "#000", fontSize: 15, fontWeight: "400" }}>
            Enter address
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#FF2929",
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
            paddingHorizontal: 61,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>
            Share
          </Text>
        </Pressable>
      </View>
      {/* CAR AND BIKE DELIVERY IMAGES  */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dataContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <View>
              <Image source={BikeDelivery} style={styles.vehicle} />
            </View>
            <View>
              <Image source={CarDelivery} style={styles.vehicle} />
            </View>
          </View>
          {/* WHERE TO GO PART */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
              alignItems: "center",
              backgroundColor: "#F7F7F7",
              marginHorizontal: 24,
              borderRadius: 20,
            }}
          >
            <View>
              <Image source={WhereCar} style={styles.carImg} />
            </View>
            <View>
              <Text style={{ fontWeight: "500", opacity: 0.8 }}>Where to?</Text>
            </View>
            <View>
              <MaterialIcons name="navigate-next" size={24} color="#000" />
            </View>
          </View>
          {/* RECENTS RIDES */}
          <View
            className="location-services"
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 24,
              backgroundColor: "#FBFBFB",
              padding: 2,
              borderRadius: 20,
            }}
          >
            <View style={styles.dataLogo}>
              <Entypo name="location-pin" size={24} color="#000" />
            </View>
            <View>
              <View>
                <Text style={{ fontSize: 15 }}>A Street , SB9</Text>
              </View>
              <View>
                <Text style={styles.grayText}>
                  KDA Scheme 1E... Sindh, Pakistan{" "}
                </Text>
              </View>
            </View>
          </View>
          {/* RECENTS 2 */}
          <View
            className="location-services"
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 24,
              backgroundColor: "#FBFBFB",
              padding: 2,
              borderRadius: 20,
            }}
          >
            <View style={styles.dataLogo}>
              <FontAwesome name="shopping-bag" size={24} color="#000" />
            </View>
            <View>
              <View>
                <Text style={{ fontSize: 15 }}>Haidery Market</Text>
              </View>
              <View>
                <Text style={styles.grayText}>
                  North Nazimabad ...n, Block ,SCB{" "}
                </Text>
              </View>
            </View>
          </View>
          {/* BANNERS */}
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 30,
              marginBottom: 190,
              gap: 10,
            }}
          >
            <View>
              <Image source={Banner1} style={styles.banner1} />
            </View>
            <View>
              <Image source={Banner2} style={styles.banner1} />
            </View>
            {/* B21 PARTS */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View>
                <Image source={b3} style={styles.b1} />
              </View>
              <View style={{ flexDirection: "column", gap: 10 }}>
                <Image source={b1} style={styles.b2} />
                <Image source={b2} style={styles.b3} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 0,
    margin: 0,
  },
  navigatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  location: {
    backgroundColor: "#F7F7F7",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  grayText: {
    color: "#A9A9A9",
    fontSize: 12,
  },
  vehicle: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    borderRadius: 20,
  },
  dataContainer: {
    marginTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    marginBottom: 270,

    borderBottomWidth: 0,
    overflow: "hidden",
    marginHorizontal: -11, // Adjust this value as needed
  },
  carImg: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  dataLogo: {
    backgroundColor: "#DBDBDB",
    padding: 11,
    borderRadius: 10,
    marginRight: 10,
    opacity: 0.4,
  },
  banner1: {
    width: 300,
    height: 150,
    resizeMode: "cover",
    borderRadius: 20,
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
