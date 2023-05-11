import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sun from 'react-native-vector-icons/dist/Feather';

const QuickItem = () => {
  return (
    <TouchableOpacity>
            <Sun
              name="sun"
              size={36}
              color="white"
              style={{
                backgroundColor: Colours.PrimaryColor,
                padding: 20,
                borderRadius: 100,
              }}
            />
            <Text style={{width:80}}>Daily Horoscope</Text>
          </TouchableOpacity>
  )
}

export default QuickItem

const styles = StyleSheet.create({})