import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colours from '../Assets/Colours';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Family from '../Utilities/Family';

const GLOBAL = require('../Utilities/Global');

const Login = ({navigation}) => {
  const [mobile, setmobile] = useState('');
  const Navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);

  const Submit = async () => {
    if (mobile.length == 10) {
      return fetch(
        GLOBAL.BASE_URL + `login&mobile=${encodeURIComponent(mobile)}`,
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.response.status == 1) {
            const otps = responseJson.response.otp;
            console.log(otps);
            navigation.navigate('Verify Phone', {
              number: mobile,
              profile: responseJson.response.profile,
            });
          } else if (responseJson.response.status == 2) {
            const otps = responseJson.response.otp;
            console.log(otps);
            navigation.navigate('Verify Phone', {
              number: mobile,
              profile: responseJson.response.profile,
            });
          }
        })
        .catch(error => {
          console.log(error.massage);
        });
    } else {
      alert('Please enter valid mobile number');
    }
  };
  //----------------

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.logoBox}>
        <Image
          source={require('../Images/AstroLogo.png')}
          style={styles.LogoImage}
        />
        <View style={styles.offerbox}>
          <Text
            style={{
              color: Colours.black,
              fontFamily: Family.Medium,
              fontSize: 12,
            }}>
            First Chat with Astrologer is Free!
          </Text>
        </View>
      </View>
      <View style={styles.InputTeXtBox}>
        <Text style={styles.nineoneText}>+91</Text>
        <TextInput
          placeholder="Mobile Number"
          maxLength={10}
          style={styles.TextInput}
          keyboardType={'numeric'}
          value={mobile}
          onChangeText={e => {
            setmobile(e);
          }}
          type="text"
          placeholderTextColor={'gray'}
          // data={mobile}
        />
      </View>
      <TouchableOpacity onPress={Submit} style={styles.button}>
        <Text style={styles.sendOTPbuttonText}>Send OTP</Text>
      </TouchableOpacity>
      <Text style={styles.PolicyText}>
        By signing up, you agree to our Terms of use and Privacy Policy
      </Text>
      <View style={styles.OrContainer}>
        <View style={styles.DrowLines}></View>
        <Text style={{color: Colours.black}}>Or</Text>
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
      <View style={styles.BottomStatsContainer}>
        <View style={styles.BottomStatsBox}>
          <Text style={styles.BottomStats}>100% Privacy</Text>
        </View>
        <View style={styles.BottomStatsBox}>
          <Text style={styles.BottomStats}>250+ Astrologer</Text>
        </View>
        <View>
          <Text style={styles.BottomStats}>1K+ Customer</Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    backgroundColor: Colours.PrimaryColor,
    width: '100%',
  },
  LogoImage: {height: 165, width: 208, position: 'absolute'},
  LoginText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 9,
    marginTop: 30,
    fontFamily: Family.Medium,
  },
  InputTeXtBox: {
    backgroundColor: Colours.GrayColor,
    color: Colours.black,
    width: '80%',
    marginTop: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'flex-start',
  },
  TextInput: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: Family.Medium,
    color: Colours.black,
  },
  offerbox: {
    backgroundColor: 'white',
    width: '80%',
    height: 40,
    marginTop: 'auto',
    marginBottom: -20,
    borderColor: Colours.PrimaryColor,
    borderWidth: 2,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nineoneText: {
    backgroundColor: '#444444',
    height: '100%',
    width: 50,
    color: '#FEFEFE',
    textAlign: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 14,
    paddingVertical: 12,
    fontFamily: Family.Medium,
  },
  button: {
    marginTop: 25,
    backgroundColor: Colours.PrimaryColor,
    height: 45,
    width: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendOTPbuttonText: {color: 'white', fontSize: 13, fontFamily: Family.Medium},

  PolicyText: {
    color: Colours.black,
    textAlign: 'center',
    top: 30,
    width: '70%',
    fontSize: 10,
    fontFamily: Family.Medium,
  },
  DrowLines: {
    height: 2,
    width: 150,
    backgroundColor: '#A5A5A5',
    marginHorizontal: 10,
  },
  OrContainer: {
    justifyContent: 'center',
    top: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trueCallerButton: {
    backgroundColor: '#319CFF',
    width: 240,
    height: 50,
    top: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  trueCallerButtonText: {
    color: 'white',
    fontSize: 13,
    fontFamily: Family.Medium,
  },
  BottomStats: {
    fontSize: 15,
    width: 90,
    color: 'black',
    textAlign: 'center',
    fontFamily: Family.Medium,
  },
  BottomStatsBox: {
    borderRightWidth: 1,
    borderRightColor: Colours.PrimaryColor,
    marginHorizontal: 10,
    width: 100,
  },
  BottomStatsContainer: {
    flexDirection: 'row',
    marginTop: '30%',
    marginBottom: 30,
  },
});
