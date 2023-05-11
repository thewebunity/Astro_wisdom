import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const Splash = ({navigation}) => {
  setTimeout(UserID => {
    AsyncStorage.getItem('UserID').then(value => {
      const UserID = value;
      navigation.navigate(
        UserID == null || UserID == '' ? 'Login' : 'BottomNavigationBar',
      );
    });
  }, 2500);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Image source={require('../Assets/logo.png')} style={styles.logo}/> */}
      <Image
        source={require('../Images/SplashBG.png')}
        style={{position: 'absolute'}}
      />
      <Animatable.Image
        animation="bounceIn"
        duration={5000}
        source={require('../Images/AstroLogo.png')}
        style={{width: '80%', height: 200, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Text: {
    fontSize: 35,
    color: '#fbb238',
    fontWeight: 'bold',
    marginTop: -25,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: -40,
  },
});
