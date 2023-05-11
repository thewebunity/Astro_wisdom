import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {UserAuthContext} from '../../context/UserAuthContext';
import Colours from '../../Assets/Colours';
import Family from '../../Utilities/Family';

const OrderHistory = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Call, setCall] = useState([]);
  const [index, setindex] = useState(0);
  const {User} = useContext(UserAuthContext);

  const getOrder = async () => {
    const response = await fetch(
      `https://astrowisdom.in/api/activity.php?method=chatHistory&userId=${User}`,
    );

    const data = await response.json();
    setData(data.chat);
    setCall(data.call);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: '50%',
            padding: 10,
            backgroundColor: index == 0 ? Colours.PrimaryColor : Colours.light,
          }}
          onPress={() => setindex(0)}>
          <Text
            style={{
              fontFamily: Family.Medium,
              textAlign: 'center',
              fontSize: 14,
              color: index == 0 ? Colours.light : Colours.TextGrayColour,
            }}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            padding: 10,
            backgroundColor: index == 1 ? Colours.PrimaryColor : Colours.light,
          }}
          onPress={() => setindex(1)}>
          <Text
            style={{
              fontFamily: Family.Medium,
              textAlign: 'center',
              fontSize: 14,
              color: index == 1 ? Colours.light : Colours.TextGrayColour,
            }}>
            Call
          </Text>
        </TouchableOpacity>
      </View>

      {index == 0 ? (
        <FlatList
          data={Data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: Colours.light,
                  padding: 10,
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Chat Id : {item.chatId}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Astrologer : {item.astrologerId}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Duration : {item.duration} sec
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Room Id : {item.room}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Time: {item.creationDate}
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: Colours.primary,
                    width: '30%',
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('ViewChat', {
                      RoomId: item.room,
                      AstrologerId: item.astrologerId,
                      userId: item.userId,
                    });
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: Family.Regular,
                      fontSize: 12,
                      color: Colours.light,
                    }}>
                    View Message
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <FlatList
          data={Call}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: Colours.light,
                  padding: 10,
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Call Id : {item.callId}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Astrologer : {item.astrologerId}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Duration : {item.duration} sec
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Room Id : {item.room}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Regular,
                    color: Colours.TextGrayColour,
                  }}>
                  Time: {item.creationDate}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
