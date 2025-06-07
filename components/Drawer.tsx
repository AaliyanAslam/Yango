import { auth } from "@/lib/firebase";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { signOut } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Drawer } from "react-native-paper";

type DrawerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const optionsName = [
  {
    name: "Home",
    icon: "home",
  },
  {
    name: "Profile",
    icon: "account",
  },
  {
    name: "Settings",
    icon: "cog",
  },
  {
    name: "Help",
    icon: "help-circle",
  },
];

const MyDrawer: React.FC<DrawerProps> = ({ visible, setVisible }) => {
  const [active, setActive] = useState("");

  const [username, setUsername] = React.useState("");
const [loading , setLoading ] = useState(false);

  useEffect(() => {
    // setUsername("Aaliyan");
   setUsername(auth.currentUser?.displayName || "Current User");

  }, []);
  const handleLogout = async ()=>{
  try{
   setLoading(true);
   await  signOut(auth);
    console.log("User signed out successfully");
  }catch(error){
    console.error("Error signing out:", error);
  }finally{
    setLoading(false);
  }
}

  return (
    <>
      {visible ? (
        <View style={styles.overlay}>
          <Drawer.Section title="" style={styles.drawerContainer}>
            {/* Close Button */}
            <View style={styles.closeButtonContainer}>
              <Pressable
                onPress={() => setVisible(false)}
                style={styles.closeButton}
              >
                <Entypo name="cross" size={24} color="black" />
              </Pressable>
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
              <TouchableOpacity style={styles.profileImage}>
                <AntDesign name="camerao" size={26} color="#000" />
              </TouchableOpacity>
              <View>
                <Text style={styles.profileName}>{username}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 2,
                  }}
                >
                  <AntDesign
                    name="star"
                    style={styles.star}
                    size={12}
                    color="#000"
                  />
                  <Text style={{ fontSize: 12 }}>5:00</Text>
                </View>
              </View>
            </View>

            {/* Dummy User List */}
            <ScrollView style={styles.userList}>
              {optionsName.map((user, index) => (
                <Drawer.Item
                  key={index}
                  label={user.name}
                  active={active === optionsName[index].name}
                  onPress={() => setActive(optionsName[index].name)}
                />
              ))}
 <Pressable
  onPress={handleLogout}
  style={{
    position: "fixed",
    bottom: 0,
 
    backgroundColor: '#FF3B30', // red color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  }}
>
 {
  loading ? (
    <Loader col={"#fff"} />
  ) : (
    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
      Logout
    </Text>
  )}
</Pressable>

            </ScrollView>
          </Drawer.Section>
        </View>
      ) : null}
    </>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    zIndex: 999,
  },
  drawerContainer: {
    
    position: "absolute",
    top: 0,
    right: 0,
    width: "85%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  closeButton: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    shadowColor: "#000",
    opacity: 0.7,
  },
  profileContainer: {
    paddingHorizontal: 19,

    flexDirection: "row",
    gap: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    marginRight: 10,
    shadowColor: "#000",
    opacity: 0.9,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
  },
  star: {
    fontSize: 11,
    color: "#555",
    opacity: 0.8,
  },
  userList: {
    flex: 1,
  },
});
