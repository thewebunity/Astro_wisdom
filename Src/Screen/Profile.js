import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Colours from '../Assets/Colours';
import Verified from 'react-native-vector-icons/dist/Octicons';
import Dots from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Chat from 'react-native-vector-icons/dist/Ionicons';
import Phone from 'react-native-vector-icons/dist/MaterialIcons';
import Info from 'react-native-vector-icons/dist/Entypo';
import Star from 'react-native-vector-icons/dist/AntDesign';
import Family from '../Utilities/Family';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {UserAuthContext} from '../context/UserAuthContext';
const GLOBAL = require('../Utilities/Global');

const Profile = ({navigation, route}) => {
  const [isLoading, SetLoading] = useState(false);
  const {User, Balance} = useContext(UserAuthContext);
  const [Amount, setAmount] = useState(0);

  const fetchUserList = async AstrologerID => {
    return fetch(
      GLOBAL.BASE_URL +
        `astrologerProfile&astrologerId=${encodeURIComponent(
          AstrologerID,
        )}&userId=${encodeURIComponent(User)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.response);
        setUserReviewData(responseJson.response.review);
        SetLoading(false);
      });
  };

  const [Data, setData] = useState({});
  const [UserReviewData, setUserReviewData] = useState([]);
  const [totalCost, settotalCost] = useState(0);
  const [modal, setmodal] = useState(false);

  const checkUserBalance = (rate, astrologerId) => {
    const totalCost = rate * 5;
    settotalCost(totalCost);
    if (Balance >= totalCost) {
      navigation.navigate('Chat Intake Form', {
        AstrologerId: astrologerId,
      });
    } else {
      setmodal(true);
    }
  };

  const AddFollowing = async AstrologerID => {
    return fetch(
      GLOBAL.BASE_URL +
        `addFollower&userId=${encodeURIComponent(
          User,
        )}&astrologerId=${encodeURIComponent(AstrologerID)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.response);
        fetchUserList(AstrologerID);
      });
  };

  useEffect(() => {
    SetLoading(true);
    const AstrologerID = route.params.AstrologerId;
    console.log('astroP', AstrologerID);
    fetchUserList(AstrologerID);
  }, []);

  const UserReview = ({item}) => {
    return (
      <View style={styles.Container}>
        <View style={{flexDirection: 'row'}}>
          <Image source={item.photo} style={styles.ReviewPicture} />
          <Text style={styles.ReviewName}>{item.user}</Text>
        </View>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Icon
            name="star"
            size={14}
            color={1 <= item.star ? '#FFB300' : 'gray'}
          />
          <Icon
            name="star"
            size={14}
            color={2 <= item.star ? '#FFB300' : 'gray'}
          />
          <Icon
            name="star"
            size={14}
            color={3 <= item.star ? '#FFB300' : 'gray'}
          />
          <Icon
            name="star"
            size={14}
            color={4 <= item.star ? '#FFB300' : 'gray'}
          />
          <Icon
            name="star"
            size={14}
            color={5 <= item.star ? '#FFB300' : 'gray'}
          />
        </View>
        <Text
          style={{
            fontFamily: Family.Regular,
            fontSize: 10,
            color: Colours.TextGrayColour,
            alignSelf: 'flex-end',
          }}>
          {item.reviewDate}
        </Text>
        {item.review == '' ? null : (
          <Text style={styles.ReviewText}>{item.review}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colours.Background}}>
      <ActivityIndicator
        size={'large'}
        color={Colours.PrimaryColor}
        animating={isLoading}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '50%',
          zIndex: 1,
        }}
      />
      {isLoading ? <View style={{height: '100%', width: '100%'}}></View> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Image
            blurRadius={8}
            style={{
              position: 'absolute',
              height: '120%',
              width: '120%',
              margin: -20,
            }}
            source={{
              uri: 'https://media.istockphoto.com/id/1417193727/photo/astrological-zodiac-signs-inside-of-horoscope-circle-astrology-knowledge-of-stars-in-the-sky.jpg?b=1&s=170667a&w=0&k=20&c=26xz3OhRSdR-pARB9ydGMaqFA5YSAIK2L3QRp88EiSI=',
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 40}}>
            <View style={{alignItems: 'center'}}>
              <Image source={{uri: Data.photo}} style={styles.profilePicture} />
              <TouchableOpacity
                onPress={() => {
                  AddFollowing(route.params.AstrologerId);
                }}>
                {Data.userFollowing == 0 ? (
                  <Text style={styles.followButton}>Follow</Text>
                ) : (
                  <Text style={styles.followingButton}>Following</Text>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <View style={{flexDirection: 'row', margin: 10, width: '78%'}}>
                <Text style={styles.nameText}>{Data.profileName}</Text>
                <Verified name="verified" size={20} color="green" />
                <TouchableOpacity style={{marginLeft: 'auto'}}>
                  <Dots name="dots-vertical" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 8, marginTop: -10}}>
                <Text
                  style={{
                    color: Colours.light,
                    width: 250,
                    fontFamily: Family.Medium,
                  }}>
                  {' '}
                  {Data.expertise}
                </Text>
                <Text
                  style={{
                    color: Colours.light,
                    width: 250,
                    fontFamily: Family.Medium,
                  }}>
                  {' '}
                  {Data.language}
                </Text>
                <Text
                  style={{
                    color: Colours.light,
                    width: 250,
                    fontFamily: Family.Medium,
                  }}>
                  {' '}
                  Exp: {Data.expirence} Years
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      fontFamily: Family.Medium,
                    }}>
                    {' '}
                    ₹{Data.rate}{' '}
                  </Text>
                  <Text style={{color: 'white'}}> /min </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.HorizontalLine}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 6,
            }}>
            <Chat name="ios-chatbubbles-outline" size={25} color="white" />
            <Text style={{color: 'white', fontFamily: Family.Medium}}>
              {' '}
              {Data.messageTime}
            </Text>
            <Text
              style={{
                marginRight: 38,
                color: 'white',
                fontFamily: Family.Medium,
              }}>
              {' '}
              mins
            </Text>
            <View style={styles.verticalLine}></View>
            <Phone
              name="phone"
              size={25}
              color="white"
              style={{marginLeft: 38}}
            />
            <Text style={{color: 'white', fontFamily: Family.Medium}}>
              {Data.callTime}
            </Text>
            <Text style={{color: 'white', fontFamily: Family.Medium}}>
              {' '}
              Mins
            </Text>
          </View>
        </View>

        <View style={styles.Container}>
          <Text style={styles.CategoryHeading}>Description</Text>
          <Text>{Data.description}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.CategoryHeading}>Rating and Review</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 25,
                marginLeft: -1,
                marginVertical: 30,
              }}>
              <Text style={styles.RatingNumber}>{Data.rating}</Text>
              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Icon
                  name="star"
                  size={10}
                  color={Data.rating >= 1 ? '#FFB300' : 'gray'}
                />
                <Icon
                  name="star"
                  size={10}
                  color={Data.rating >= 2 ? '#FFB300' : 'gray'}
                />
                <Icon
                  name="star"
                  size={10}
                  color={Data.rating >= 3 ? '#FFB300' : 'gray'}
                />
                <Icon
                  name="star"
                  size={10}
                  color={Data.rating >= 4 ? '#FFB300' : 'gray'}
                />
                <Icon
                  name="star"
                  size={10}
                  color={Data.rating >= 5 ? '#FFB300' : 'gray'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="user" size={18} color="gray" />
                <Text
                  style={{
                    fontFamily: Family.Regular,
                    fontSize: 12,
                    color: Colours.TextGrayColour,
                    marginLeft: 5,
                  }}>
                  {Data.orders} orders
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.barContainer}>
                {[5, 4, 3, 2, 1].map(item => (
                  <View style={styles.barRow} key={item}>
                    <Text style={styles.barText}>{item} star</Text>
                    <View style={styles.progressBar}>
                      <View style={styles.progress} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <Text style={styles.CategoryHeading}>User Review</Text>
          <FlatList renderItem={UserReview} data={UserReviewData} />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 'auto',
          justifyContent: 'center',
          padding: 5,
        }}>
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate('Chat Intake Form', {
            //   AstrologerId: route.params.AstrologerId,
            // })
            checkUserBalance(Data.rate, route.params.AstrologerId)
          }
          style={[
            styles.BottomButton,
            {
              borderColor:
                Data.liveStatus == 'online'
                  ? Data.waitTime == 0
                    ? 'green'
                    : 'red'
                  : 'gray',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Chat
              name="ios-chatbubbles-outline"
              size={25}
              color={
                Data.liveStatus == 'online'
                  ? Data.waitTime == 0
                    ? 'green'
                    : 'red'
                  : 'gray'
              }
            />
          </View>
          <View style={styles.BottomButtonTextBox}>
            <Text
              style={[
                styles.BottomButtonText,
                {
                  color:
                    Data.liveStatus == 'online'
                      ? Data.waitTime == 0
                        ? 'green'
                        : 'red'
                      : 'gray',
                },
              ]}>
              Chat
            </Text>
            <Text
              style={[
                styles.BottomButtonText,
                {
                  color:
                    Data.liveStatus == 'online'
                      ? Data.waitTime == 0
                        ? 'green'
                        : 'red'
                      : 'gray',
                },
              ]}>
              Currently {Data.liveStatus == 'online' ? 'Online' : 'Offline'}
            </Text>
            {Data.waitTime == 0 ? null : (
              <Text style={{fontSize: 10, color: 'red', textAlign: 'center'}}>
                Wait {Data.waitTime}m
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.BottomButton,
            {
              borderColor:
                Data.liveStatus == 'online'
                  ? Data.waitTime == 0
                    ? 'green'
                    : 'red'
                  : 'gray',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Phone
              name="phone"
              size={25}
              color={
                Data.liveStatus == 'online'
                  ? Data.waitTime == 0
                    ? 'green'
                    : 'red'
                  : 'gray'
              }
            />
          </View>

          <View style={styles.BottomButtonTextBox}>
            <Text
              style={[
                styles.BottomButtonText,
                {
                  color:
                    Data.liveStatus == 'online'
                      ? Data.waitTime == 0
                        ? 'green'
                        : 'red'
                      : 'gray',
                },
              ]}>
              Call
            </Text>
            <Text
              style={[
                styles.BottomButtonText,
                {
                  color:
                    Data.liveStatus == 'online'
                      ? Data.waitTime == 0
                        ? 'green'
                        : 'red'
                      : 'gray',
                },
              ]}>
              Currently {Data.liveStatus == 'online' ? 'Online' : 'Offline'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setmodal(!modal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontFamily: Family.Medium,
                fontSize: 12,
                color: Colours.primary,
                marginVertical: 10,
              }}>
              Minimum Requires Balance to chat with astrologer is Rs.
              {totalCost}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: Family.Medium,
                color: Colours.gray,
              }}>
              Recharge your Wallet
            </Text>
            <TextInput
              placeholder="Enter Amount"
              placeholderTextColor={Colours.GrayColor}
              maxLength={10}
              onChangeText={setAmount}
              value={Amount}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderColor: Colours.GrayColor,
                borderRadius: 10,
                marginVertical: 15,
              }}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={{
                backgroundColor: Colours.primary,
                paddingVertical: 8,
                width: '30%',
                borderRadius: 5,
                marginTop: 5,
              }}
              onPress={() =>
                navigation.navigate('Add money to wallet', {
                  Amount,
                })
              }>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Family.Medium,
                  color: Colours.light,
                  textAlign: 'center',
                }}>
                Add Money
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  Container: {
    borderRadius: 5,
    borderColor: Colours.GrayColor,
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 5,
  },
  followButton: {
    backgroundColor: '#FFB300',
    padding: 20,
    borderRadius: 8,
    paddingVertical: 5,
    margin: 5,
    fontSize: 12,
  },
  followingButton: {
    backgroundColor: Colours.GrayColor,
    padding: 20,
    borderRadius: 8,
    paddingVertical: 5,
    margin: 5,
    fontSize: 12,
  },
  nameText: {
    fontSize: 18,
    color: 'white',
    marginRight: 5,
    fontFamily: Family.Medium,
  },
  HorizontalLine: {
    backgroundColor: Colours.GrayColor,
    height: 1,
    width: '100%',
    marginTop: 20,
  },
  verticalLine: {
    width: 1,
    backgroundColor: Colours.GrayColor,
    height: '100%',
  },
  CategoryHeading: {
    fontFamily: Family.Medium,
    color: 'black',
    margin: 5,
  },
  Image: {
    height: 85,
    width: 85,
    borderRadius: 100,
  },
  ReviewPicture: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  ReviewName: {
    fontSize: 15,
    color: 'black',
    margin: 5,
    marginLeft: 10,
    fontFamily: Family.Medium,
  },
  ReviewText: {
    marginLeft: 10,
    fontFamily: Family.Medium,
    color: Colours.TextGrayColour,
  },
  Star: {
    backgroundColor: '#f542bc',
    borderRadius: 100,
    padding: 18,
    marginRight: 5,
  },
  buynow: {
    backgroundColor: '#FFB300',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 6,
    marginTop: 'auto',
    marginBottom: 10,
    marginLeft: 20,
  },
  BottomButton: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 4,
    padding: 1,
    flexDirection: 'row',
    marginTop: 'auto',
    marginHorizontal: 10,
    width: '45%',
    paddingHorizontal: 6,
  },
  BottomButtonTextBox: {
    alignItems: 'center',
    marginLeft: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  BottomButtonText: {
    fontSize: 10,
    fontFamily: Family.Medium,
  },
  RatingNumber: {
    fontSize: 29,
    color: 'black',
    textAlign: 'center',
    fontFamily: Family.Medium,
  },
  barContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  barText: {
    fontSize: 12,
    fontFamily: Family.Regular,
    color: Colours.TextGrayColour,
  },
  progressBar: {
    backgroundColor: '#ccc',
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  progress: {
    backgroundColor: '#ffc107',
    height: 10,
    borderRadius: 5,
    width: 130,
  },
});
