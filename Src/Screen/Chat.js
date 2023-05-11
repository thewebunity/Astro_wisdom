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

const Chat = ({navigation, route}) => {
  const {RoomId, AstrologerId, userId} = route.params;
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState();
  const [Rating, setRating] = useState(0);
  const [modal, setmodal] = useState(false);
  const [CurrentTime, setCurrentTime] = useState(0);
  const [isInputDisabled, setisInputDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [Data, setData] = useState([]);
  const [Review, setReview] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (timeLeft == 60) {
    fetch(
      Global.BASE_URL +
        `checkBalance&userId=${userID}&astrologerId=${AstrologerId}&time=${CurrentTime}`,
    ).then(res => {
      res.json().then(data => {
        console.log(data);
        if (data.response.status == 1) {
          setTimeLeft(timeLeft + 300);
          setCurrentTime(CurrentTime + 300);
        } else {
          fetch(
            Global.BASE_URL +
              `endChat&userId=${userID}&astrologerId=${AstrologerId}&roomId=${RoomId}&time=${CurrentTime}`,
          )
            .then(res => {
              res.json().then(data => {
                console.log('Data', data);
              });
            })
            .then(() => {
              console.log('chat end');
            });
        }
      });
    });
  }

  const submitReview = async () => {
    const response = await fetch(
      Global.BASE_URL +
        `reviewAdd&room=${RoomId}&review=${Review}&star=${Rating}`,
    );
    const data = response.json();
    ToastAndroid.show('Review Submitted', ToastAndroid.SHORT);
    navigation.navigate('Home');
  };

  if (timeLeft == 0) {
    firestore().collection('Room').doc(RoomId).set({
      chatStatus: 'completed',
    });
  }
  const StopChat = async () => {
    fetch(
      Global.BASE_URL +
        `endChat&userId=${userID}&astrologerId=${AstrologerId}&roomId=${RoomId}&time=${CurrentTime}`,
    ).then(res => {
      res.json().then(val => {
        if (val.response.status == 1) {
          firestore().collection('Room').doc(RoomId).set({
            chatStatus: 'completed',
          });
          setisInputDisabled(true);
          setmodal(true);
          setTimeLeft(0);
        }
      });
    });
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Chat Closed', 'Are you want to end this chat', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => StopChat()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
    setCurrentTime(CurrentTime + 300);
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
            setmodal(true);
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
          This is an automated messages. Chat has been ended due to Customer
          doesn't have enough balance.
        </Text>
      </View>
    ) : (
      <InputToolbar {...inputToolbarProps} containerStyle={containerStyle} />
    );
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => StopChat()}
          style={{
            backgroundColor: Colours.PrimaryColor,
            margin: 10,
            padding: 6,
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>End Chat</Text>
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 'auto',
            marginRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <Text style={{color: Colours.black, marginRight: 8, marginTop: -1}}>
            Chat End in : {timeLeft}
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    setmodal(false);
                    setRating(0);
                  }}
                  style={{position: 'absolute', top: 5, right: 15}}>
                  <Text
                    style={{
                      color: Colours.TextDarkColour,
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    x
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: Colours.TextDarkColour,
                    fontSize: 12,
                    fontWeight: '700',
                    marginVertical: 10,
                  }}>
                  Rate {Data.name}
                </Text>
                <Image
                  source={{
                    uri: Data.name,
                  }}
                  style={{width: 70, height: 70, borderRadius: 35}}
                />
                <Text
                  style={{
                    color: Colours.TextDarkColour,
                    fontSize: 15,
                    fontWeight: '700',
                    marginVertical: 10,
                  }}>
                  {Data.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    width: '60%',
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity onPress={() => setRating(1)}>
                    <Icon
                      name="star"
                      size={30}
                      color={Rating >= 1 ? '#FFB300' : 'gray'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(2)}>
                    <Icon
                      name="star"
                      size={30}
                      color={Rating >= 2 ? '#FFB300' : 'gray'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(3)}>
                    <Icon
                      name="star"
                      size={30}
                      color={Rating >= 3 ? '#FFB300' : 'gray'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(4)}>
                    <Icon
                      name="star"
                      size={30}
                      color={Rating >= 4 ? '#FFB300' : 'gray'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRating(5)}>
                    <Icon
                      name="star"
                      size={30}
                      color={Rating >= 5 ? '#FFB300' : 'gray'}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: 'gray',
                    minHeight: 100,
                    marginVertical: 20,
                    paddingHorizontal: 15,
                  }}>
                  <TextInput
                    placeholderTextColor={Colours.TextGrayColour}
                    placeholder="Describe your Experience (optional)"
                    style={{fontSize: 12, color: 'gray'}}
                    multiline
                    onChangeText={setReview}
                    value={Review}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '95%',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colours.PrimaryColor,
                      paddingVertical: 8,
                      width: '45%',
                      borderRadius: 5,
                      marginTop: 15,
                    }}
                    onPress={() => navigation.navigate('Home')}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Family.Medium,
                        color: Colours.light,
                        textAlign: 'center',
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        Rating == 0 ? Colours.GrayColor : Colours.primary,
                      paddingVertical: 8,
                      width: '45%',
                      borderRadius: 5,
                      marginTop: 15,
                    }}
                    disabled={Rating == 0 ? true : false}
                    onPress={submitReview}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Family.Medium,
                        color: Colours.light,
                        textAlign: 'center',
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
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

export default Chat;

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
