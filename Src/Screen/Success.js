import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
import {UserAuthContext} from '../context/UserAuthContext';

const Success = ({navigation}) => {
  const {getUser} = useContext(UserAuthContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'green',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <CheckBadgeIcon color="#fff" size={200} style={{alignSelf: 'center'}} />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
          }}>
          Money added to wallet Successfully
        </Text>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
            marginTop: 10,
          }}>
          Thank you
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

const styles = StyleSheet.create({});

export default Success;
