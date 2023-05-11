import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GLOBAL from '../Utilities/Global';
import firestore from '@react-native-firebase/firestore';
import Colours from '../Assets/Colours';
import Global from '../Utilities/Global';

const Accept = ({navigation, route}) => {
  const {RoomId, AstrologerId, id, userId} = route.params;
  const [Data, setData] = useState([]);
  const [Accepted, setAccepted] = useState(false);

  const fetchUserList = async () => {
    return fetch(
      Global.BASE_URL +
        `astrologerProfile&astrologerId=${encodeURIComponent(AstrologerId)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.response);
      });
  };

  const Accept = async () => {
    const createdChatStaus = await fetch(
      GLOBAL.BASE_URL +
        `createChat&userId=${userId}&astrologerId=${AstrologerId}&roomId=${RoomId}&status=ongoing`,
    );
    firestore().collection('chat').doc(id).update({
      status: 'accepted by customer',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setAccepted(true);
    navigation.navigate('Chats', {
      RoomId: RoomId,
      AstrologerId: AstrologerId,
      userId: userId,
    });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const Reject = () => {
    fetch(
      Global.BASE_URL +
        `createChat&userId=${userId}&astrologerId=${AstrologerId}&roomId=${RoomId}&status=decline`,
    );
    firestore().collection('chat').doc(id).update({
      status: 'rejected by customer',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    navigation.navigate('BottomNavigationBar');
  };

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <Text
          style={{color: Colours.TextDarkColour, fontSize: 20, marginTop: 50}}>
          {Data.profileName}
        </Text>
        <View>
          <Image
            source={{
              uri:
                Data.photo == null
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElwewMRorrdl7m4am3aRv2_fBdBb8CbgfgMYMjBM&s'
                  : Data.photo,
            }}
            style={{
              width: 150,
              marginTop: 50,
              height: 150,
              borderRadius: 75,
              resizeMode: 'cover',
            }}
          />
        </View>
        <Text
          style={{color: Colours.TextDarkColour, fontSize: 20, marginTop: 50}}>
          {Accepted ? 'Connecting......' : 'Incoming Chat Request'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: Accepted ? 'center' : 'space-between',
          position: 'absolute',
          bottom: 40,
          width: '100%',
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity
          onPress={Reject}
          style={{
            backgroundColor: 'red',
            paddingVertical: 15,
            paddingHorizontal: 35,
            borderRadius: 35,
          }}>
          <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
            Decline
          </Text>
        </TouchableOpacity>
        {Accepted ? null : (
          <TouchableOpacity
            onPress={Accept}
            style={{
              backgroundColor: 'green',
              paddingVertical: 15,
              paddingHorizontal: 35,
              borderRadius: 35,
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
              Accept
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Accept;

const styles = StyleSheet.create({});
