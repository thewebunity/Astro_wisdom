import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Share,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Assets/Header';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Colours from '../Assets/Colours';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Chat from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../Utilities/Global';
import Family from '../Utilities/Family';

const MyAccount = ({navigation}) => {
  const [Data, setData] = useState();

  const getData = async value => {
    let result = await fetch(Global.BASE_URL + 'myProfile&userId=' + value);
    result = await result.json();
    setData(result.response);
    console.log(result);
  };

  useEffect(() => {
    AsyncStorage.getItem('UserID').then(value => {
      console.log(value);
      getData(value);
    });
  }, []);

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('UserID');
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Login');
  };

  const openurl = async () => {
    const url =
      'https://play.google.com/store/apps/details?id=com.astro_wisdom';
    await Linking.openURL(url);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.astro_wisdom',
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{backgroundColor: Colours.Background, flex: 1}}>
      <Header navigation={navigation} name={'My Account'} />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 6,
          backgroundColor: Colours.light,
          width: '100%',
        }}>
        <View style={{paddingHorizontal: 25, paddingVertical: 20}}>
          <Text
            style={{
              color: Colours.TextDarkColour,
              margin: 3,
              fontSize: 15,
              fontFamily: Family.SemiBold,
            }}>
            {Data && Data.name}
          </Text>
          <Text
            style={{
              color: Colours.TextDarkColour,
              margin: 3,
              fontSize: 15,
              fontFamily: Family.Medium,
            }}>
            +91 {Data && Data.mobile}
          </Text>
        </View>
        <TouchableOpacity
          style={{marginLeft: 'auto', justifyContent: 'center'}}>
          <AntDesign
            name="edit"
            size={30}
            color="black"
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: Colours.light}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Wallet');
          }}
          style={styles.ButtonBox}>
          <Entypo name="wallet" size={25} color="black" />
          <Text style={styles.ButtonText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonBox}
          onPress={() => navigation.navigate('Order History')}>
          <MaterialCommunityIcons name="history" size={25} color="black" />
          <Text style={styles.ButtonText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonBox}
          onPress={() => navigation.navigate('Chat')}>
          <Chat name="chatbubbles" size={25} color="black" />
          <Text style={styles.ButtonText}>Chat with Astrologer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonBox}
          onPress={() => navigation.navigate('Help & Support')}>
          <FontAwesome5 name="headset" size={25} color="black" />
          <Text style={styles.ButtonText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonBox} onPress={onShare}>
          <AntDesign name="sharealt" size={25} color="black" />
          <Text style={styles.ButtonText}>Share with Friend and Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonBox} onPress={openurl}>
          <AntDesign name="questioncircleo" size={25} color="black" />
          <Text style={styles.ButtonText}>Rate AstroWisdom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ButtonBox}
          onPress={() => {
            Alert.alert('Logout', 'Are you want to Logout', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {text: 'YES', onPress: () => Logout()},
            ]);
          }}>
          <Entypo name="log-out" size={25} color="black" />
          <Text style={styles.ButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  ButtonBox: {
    flexDirection: 'row',
    padding: 14,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  ButtonText: {
    fontSize: 15,
    marginLeft: 20,
    color: Colours.TextDarkColour,
    fontFamily: Family.Medium,
  },
});
