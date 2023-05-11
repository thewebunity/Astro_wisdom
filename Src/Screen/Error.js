import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {XCircleIcon} from 'react-native-heroicons/solid';
const Error = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <XCircleIcon color="#fff" size={200} style={{alignSelf: 'center'}} />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
          }}>
          Transaction Failed
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 20,
            marginVertical: 40,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('BottomNavigationBar')}>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: 'green',
              fontWeight: '700',
            }}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
