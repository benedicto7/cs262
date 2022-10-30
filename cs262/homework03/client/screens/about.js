import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../styles/global';

function About() {
  return (
    <View style={globalStyles.container}>
      <Text>This application accesses information on monopoly players</Text>
    </View>
  )
}

export default About

