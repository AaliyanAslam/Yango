import YangoLogo from "@/assets/images/yangoLogo.png";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Drawer from "@/components/Drawer"; 
import BikeDelivery from "@/assets/images/bikedimg.png";
import CarDelivery from "@/assets/images/cardimg.png";

import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View , Pressable } from "react-native";

export default function Home() {
  const [showDrawer, setShowDrawer] = useState(true);
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
{showDrawer && ( <Drawer/>)}
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
<View className="location-services" style ={{flexDirection: "row", alignItems: "center", marginTop: 10}}>    
  <View style ={styles.location}>
  <FontAwesome6 name="map-location-dot" size={24} color="#000" />

  </View>
  <View>
  <View><Text style= {{fontSize : 15}}>Enable locaion service</Text></View>
  <View><Text style ={styles.grayText}>We can't see where you are </Text></View>
  </View>
  
</View>
 {/* ENTER ADDRESS AND SHARE BUTTON */}
<View style ={{flexDirection:"row" , alignItems: "center", marginTop: 10 , justifyContent: "space-between"}}>
  <Pressable
    style={{
      backgroundColor: "#F7F7F7",
      padding: 15,
      borderRadius: 15,
      marginTop: 10,
      paddingHorizontal: 35,
    }}
  >
    <Text style={{ color: "#000", fontSize: 15 , fontWeight : "400" }}>Enter address</Text>
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
    <Text style={{ color: "#fff", fontSize: 15 , fontWeight : "500" }}>Share</Text>
  </Pressable>
</View>
{/* CAR AND BIKE DELIVERY IMAGES  */}
<View style ={{flexDirection: "row", justifyContent: "space-around", marginTop: 20}}>
  <View>
    <Image source={BikeDelivery} style={styles.vehicle} />
  </View>
  <View>
    <Image source={CarDelivery} style={styles.vehicle} />
  </View>
</View>
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
  location:{
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
});
