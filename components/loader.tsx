import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';
//@ts-ignore
export default function loader({col}) {
  return (
    <View>
      <ActivityIndicator size="small" color={col} />
    </View>
  )
}