import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useState, useRef, useEffect, useContext} from 'react';
import Colours from '../Assets/Colours';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import Family from '../Utilities/Family';
const GLOBAL = require('../Utilities/Global');
import messaging from '@react-native-firebase/messaging';
import {UserAuthContext} from '../context/UserAuthContext';

const Otp = ({navigation, route}) => {
  const mobile = route.params.number;
  const [otp, setOtp] = useState('');
  const refOtpInputs = useRef([]);
  const {getUser} = useContext(UserAuthContext);
  const _storeData = async userID => {
    try {
      await AsyncStorage.setItem(
        'UserID',
        userID,
        console.log('asyncSuser id', userID),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const ResendOTP = async () => {
    return fetch(
      GLOBAL.BASE_URL + `resendOtp&mobile=${encodeURIComponent(mobile)}`,
    )
      .then(response => response.json())
      .then(responseJson => {});
  };

  const Verify = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return fetch(
      GLOBAL.BASE_URL +
        `otp&mobile=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(
          otp,
        )}&deviceId=${token}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (
          responseJson.response.status == 1 &&
          route.params.profile == 'true'
        ) {
          _storeData(responseJson.response.userId);
          getUser();
          navigation.navigate('Create Profile');
        } else if (
          responseJson.response.status == 1 &&
          route.params.profile == 'false'
        ) {
          _storeData(responseJson.response.userId);
          getUser();
          navigation.navigate('BottomNavigationBar');
        } else {
          alert('Please enter correct OTP');
        }
      });
  };

  const handleChangeOtp = (index, value) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
    if (value && index < refOtpInputs.current.length - 1) {
      refOtpInputs.current[index + 1].focus();
    }
  };

  const handleKeyPressOtp = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      refOtpInputs.current[index - 1].focus();
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('../Images/SplashBG.png')}
        style={{position: 'absolute'}}
      />
      <View style={styles.headingBox}>
        <Text style={styles.headingBoxText}>You will get a OTP via SMS</Text>
        <View style={styles.OTPinputBox}>
          <View style={styles.otpInputsContainer}>
            {[0, 1, 2, 3].map(index => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={otp[index] || ''}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={value => handleChangeOtp(index, value)}
                onKeyPress={({nativeEvent: {key}}) =>
                  handleKeyPressOtp(index, key)
                }
                ref={ref => (refOtpInputs.current[index] = ref)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={Verify} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <Text style={styles.notReceiveText}>
          Didn’t receive the verification OTP?
        </Text>
        <TouchableOpacity
          onPress={() => {
            ResendOTP();
          }}
          style={{top: 80}}>
          <Text style={styles.resendText}>Resend again</Text>
        </TouchableOpacity>
        <View style={styles.orBox}>
          <View style={styles.DrowLines}></View>
          <Text style={{color: Colours.TextDarkColour}}>Or</Text>
          <View style={styles.DrowLines}></View>
        </View>
        <TouchableOpacity style={styles.trueCallerButton}>
          <Icon
            name="mobile-phone"
            size={30}
            color="white"
            style={{marginRight: 20}}
          />
          <Text style={styles.trueCallerButtonText}>Login With Truecaller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  OTPinputBox: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginTop: 50,
  },
  headingBox: {alignItems: 'center', top: 70},
  headingBoxText: {
    fontSize: 20,
    color: 'black',
    fontFamily: Family.Regular,
  },
  button: {
    top: 55,
    backgroundColor: Colours.PrimaryColor,
    height: 45,
    width: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: Colours.TextDarkColour,
  },
  buttonText: {color: 'white', fontSize: 15},
  notReceiveText: {
    color: Colours.black,
    fontFamily: Family.Regular,
    textAlign: 'center',
    top: 80,
    width: 270,
  },
  resendText: {
    fontFamily: Family.Regular,
    textAlign: 'center',
    width: 130,
    color: '#DC4E41',
  },
  orBox: {
    justifyContent: 'center',
    top: 205,
    flexDirection: 'row',
    alignItems: 'center',
  },
  DrowLines: {
    height: 2,
    width: 150,
    backgroundColor: '#A5A5A5',
    marginHorizontal: 10,
  },
  trueCallerButton: {
    backgroundColor: '#319CFF',
    width: 240,
    height: 50,
    top: 220,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  trueCallerButtonText: {
    fontFamily: Family.Medium,
    color: 'white',
    fontSize: 15,
  },
});
