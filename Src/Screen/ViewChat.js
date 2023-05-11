import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  TextInput,
  AppState,
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colours from '../Assets/Colours';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Family from '../Utilities/Family';
import Global from '../Utilities/Global';

const ViewChat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState();
  const {RoomId, AstrologerId, userId} = route.params;
  const [isInputDisabled, setisInputDisabled] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('UserID').then(value => {
      setUserID(value);
    });

    const querySnapshot = firestore()
      .collection('Room')
      .doc(RoomId)
      .collection('Message')
      .orderBy('createdAt', 'desc');
    querySnapshot.onSnapshot(snapshot => {
      const allMessage = [];
      snapshot.docs.map(snap => {
        allMessage.push({
          ...snap.data(),
          createdAt: snap.data().createdAt.toDate(),
        });
      });
      setMessages(allMessage);
    });
  }, []);

  useEffect(() => {
    firestore()
      .collection('Room')
      .doc(RoomId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.data() !== undefined) {
          const {chatStatus} = documentSnapshot.data();
          if (chatStatus == 'completed') {
            setisInputDisabled(true);
          }
        }
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    firestore()
      .collection('Room')
      .doc(RoomId)
      .collection('Message')
      .add(messages[0]);
  }, []);

  const renderInputToolbar = props => {
    // Disable the input field if the condition is met
    const {containerStyle, ...inputToolbarProps} = props;
    return isInputDisabled ? (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginTop: -10,
          padding: 10,
        }}>
        <Text style={{color: 'red', textAlign: 'justify', fontSize: 13}}>
          This is an automated messages. Chat has been ended .
        </Text>
      </View>
    ) : (
      <InputToolbar {...inputToolbarProps} containerStyle={containerStyle} />
    );
  };

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        user={{
          _id: userID,
        }}
      />
    </>
  );
};

export default ViewChat;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
