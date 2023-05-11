import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const Review = ({navigation}) => {
  return (
    <View>
      <Button  title='Back' onPress={()=>navigation.navigate('Home')}/>
    </View>
  )
}

export default Review

const styles = StyleSheet.create({})