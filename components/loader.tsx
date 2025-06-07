import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';

export default function loader() {
  return (
    <View>
      <ActivityIndicator size="small" color="#ffff" />
    </View>
  )
}