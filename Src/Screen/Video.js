import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Assets/Header'

const Video = ({navigation}) => {
  return (
    <View>
     <Header navigation={navigation} name={'Video'}/>
      <Text>Video</Text>
    </View>
  )
}

export default Video

const styles = StyleSheet.create({})