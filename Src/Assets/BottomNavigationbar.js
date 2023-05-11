import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ChatScreen from '../Screen/ChatScreen';
import Home from '../Screen/Home';
import Call from '../Screen/Call';
import MyAccount from '../Screen/MyAccount';
import Following from '../Screen/Following';
import Profile from '../Screen/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeIcon from 'react-native-vector-icons/dist/Entypo';
import Chat from 'react-native-vector-icons/dist/Ionicons';
import Phone from 'react-native-vector-icons/dist/MaterialIcons';
import VideoIcon from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Colours from './Colours';
import Family from '../Utilities/Family';

const BottomNavigationbar = () => {
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem('UserID').then(val => {
      const now = firestore.Timestamp.now();
      const ts = firestore.Timestamp.fromMillis(now.toMillis() - 30000);
      const querySnapshot = firestore()
        .collection('chat')
        .where('userId', '==', val);
      querySnapshot.onSnapshot(snapshot => {
        snapshot.docs.map(value => {
          const {RoomId, AstrologerId, id, userId, createdAt, status} =
            value.data();
          if (createdAt > ts) {
            if (status == 'accepted') {
              navigation.navigate('Accept', {
                userId: userId,
                RoomId: RoomId,
                id: id,
                AstrologerId: AstrologerId,
              });
            }
          }
        });
      });
    });
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colours.PrimaryColor,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontFamily: Family.Medium,
          fontSize: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Chat name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarIcon: ({color, size}) => (
            <Phone name="phone" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Following"
        component={Following}
        options={{
          tabBarIcon: ({color, size}) => (
            <VideoIcon size={size} color={color} name="heart" />
          ),
        }}
      />
      <Tab.Screen
        name="My Account"
        component={MyAccount}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationbar;

const styles = StyleSheet.create({});
