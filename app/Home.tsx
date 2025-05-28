import YangoLogo from '@/assets/images/yangoLogo.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Home() {
  
  return (
    <View>
      <View style={styles.navContainer}>
        <View className='image-container'>
          <Image source={YangoLogo} style={styles.img}/>
        </View>
        <View className='hamburger-container'>
          <FontAwesome name='bars' size={24} color='#000' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img : {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  }, 
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin : 0,
  },
});