import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, {SvgXml} from 'react-native-svg';

const Test = ({navigation, name}) => {
  return (
    <View>
      <SvgXml xml={name} style={{alignSelf: 'center'}} />
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})