import * as React from 'react';
import { Drawer } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const MyDrawer = () => {
  const [active, setActive] = React.useState('');

  return (
    <View style={styles.overlay}>
      <Drawer.Section title="Menu" style={styles.drawerContainer}>
        <Drawer.Item
          label="First "
          active={active === 'first'}
          onPress={() => setActive('first')}
        />
        <Drawer.Item
          label="Second Item"
          active={active === 'second'}
          onPress={() => setActive('second')}
        />
      </Drawer.Section>
    </View>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 90, // Adjust this if you want to shift drawer below navbar
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#F7F7F7', // ✔ drawer bg color is light gray
    borderTopLeftRadius: 25, // Changed to Left since drawer is on right
    borderBottomLeftRadius: 25,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
});
