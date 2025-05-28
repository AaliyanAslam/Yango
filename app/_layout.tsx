import { View , StatusBar } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

export default function _layout() {
  return (
    <View>
      <Slot/>
      <StatusBar backgroundColor={'#000'} barStyle='light-content' />
    </View>
  )
}