import Entypo from "@expo/vector-icons/Entypo";
import * as React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
  const [active, setActive] = React.useState("");

  // const dummyUsers = Array.from({ length: 10 }, (_, i) => `User ${i + 1}`);

  return (
    <>
      {visible ? (
        <View style={styles.overlay}>
          <Drawer.Section title="Menu" style={styles.drawerContainer}>
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
              <Image
                source={{
                  uri: "https://i.pravatar.cc/100",
                }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>Aaliyan</Text>
              <Text style={styles.profileEmail}>aaliyan@example.com</Text>
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
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    color: "#555",
  },
  userList: {
    flex: 1,
  },
});
