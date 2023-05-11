import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {WebView} from 'react-native-webview';
import {UserAuthContext} from '../context/UserAuthContext';

const Payment = ({navigation, route}) => {
  const {User} = useContext(UserAuthContext);
  const {amount} = route.params;
  const handleUrl = newNavState => {
    const {url} = newNavState;
    if (url == 'https://astrowisdom.in/payment/standard/meTrnSuccess.php') {
      navigation.navigate('Success');
    }
    if (
      url == 'https://astrowisdom.in/payment/standard/meTrnCancelSuccess.php'
    ) {
      navigation.navigate('Error');
    }
  };

  return (
    <WebView
      source={{
        uri: `https://astrowisdom.in/payment/standard/meTrnReq.php?userId=${User}&amount=${amount}`,
      }}
      style={{flex: 1}}
      onNavigationStateChange={handleUrl}
    />
  );
};

export default Payment;

const styles = StyleSheet.create({});
