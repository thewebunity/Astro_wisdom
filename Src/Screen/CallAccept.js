import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Colours from '../Assets/Colours';
import Family from '../Utilities/Family';

const CallAccept = ({navigation, route}) => {
  const {id, AstrologerId, RoomId, status} = route.params;
  const [Callstatus, setCallstatus] = useState('');
  const [Data, setData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('call')
      .where('id', '==', id)
      .onSnapshot(documentSnapshot => {
        documentSnapshot.docs.map(value => {
          const {userId, id, AstrologerId, RoomId, status} = value.data();
          setCallstatus(status);
          if (status == 'accepted') {
            navigation.navigate('VoiceCall', {
              RoomId,
              AstrologerId,
              name: Data.name,
            });
          }
          if (status == 'declined') {
            navigation.navigate('BottomNavigationBar');
          }
        });
      });
  }, []);

  const Reject = () => {
    firestore()
      .collection('call')
      .doc(id)
      .update({
        status: 'declined',
      })
      .then(() => {
        navigation.navigate('BottomNavigationBar');
      });
  };

  const fetchUserList = async () => {
    return fetch(
      `https://astrowisdom.in/api/astrologer.php?method=myProfiles&astrologerId=${AstrologerId}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.response);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <>
      <View
        style={{flex: 1, alignItems: 'center', backgroundColor: Colours.light}}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 50,
            fontFamily: Family.SemiBold,
            color: Colours.TextGrayColour,
          }}>
          {Data.name}
        </Text>
        <View>
          <Image
            source={{
              uri: Data.photo,
            }}
            style={{
              width: 150,
              marginTop: 50,
              height: 150,
              borderRadius: 75,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginTop: 50,
            fontFamily: Family.SemiBold,
            color: Colours.TextGrayColour,
          }}>
          {Callstatus} ....
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
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
            alignSelf: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CallAccept;

const styles = StyleSheet.create({});
