import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {PhoneIcon} from 'react-native-heroicons/solid';
import Family from '../../Utilities/Family';
import Colours from '../../Assets/Colours';

const HelpSupport = () => {
  const makeCall = phone => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('../../Images/customer-service.png')}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          marginVertical: 50,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: Family.Medium,
          color: Colours.TextGrayColour,
        }}>
        Help & Support
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: Colours.primary,
          paddingHorizontal: 28,
          paddingVertical: 12,
          borderRadius: 10,
        }}
        onPress={() => makeCall(`+91 7470978479`)}>
        <TouchableOpacity>
          <PhoneIcon color={Colours.light} size={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Family.Medium,
            color: Colours.light,
            marginLeft: 10,
          }}>
          +91 74709 78479
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({});
