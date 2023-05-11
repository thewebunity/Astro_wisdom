import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import Colours from '../Assets/Colours';
import React, {useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Search from 'react-native-vector-icons/dist/Ionicons';
import Filter from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Grid from 'react-native-vector-icons/dist/Fontisto';
import Verified from 'react-native-vector-icons/dist/Octicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import Header from '../Assets/Header';
import Family from '../Utilities/Family';
import {UserAuthContext} from '../context/UserAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
const GLOBAL = require('../Utilities/Global');

const ChatScreen = ({navigation, route}) => {
  const IsFocused = useIsFocused();
  const [Data, setData] = useState([]);
  const [Alldata, setAlldata] = useState([]);
  const {
    User,
    getAstrolgerdata,
    CSModal,
    Modalstate,
    ChatFilter,
    FilterValue,
    Userurl,
  } = useContext(UserAuthContext);
  const [modal, setmodal] = useState(false);
  const [totalCost, settotalCost] = useState(0);
  const [Filtermodal, setFiltermol] = useState(false);
  const [SelectedIndex, setSelectedIndex] = useState(0);
  const [WaitList, setWaitList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [UserID, setUserID] = useState();
  const [UserBalance, setUserBalance] = useState();
  const [Amount, setAmount] = useState(0);

  const getData = async value => {
    setisLoading(true);
    const response = await fetch(
      GLOBAL.BASE_URL + 'astrologerChatList&userId=' + value,
    );
    const data = await response.json();
    setData(data.past);
    setAlldata(data.past);
    setWaitList(data.waitlist);
    setisLoading(false);
    setUserBalance(data.balance);
    if (FilterValue != null && Data.length != 0) {
      DataFilter(FilterValue);
    }
  };

  const handleSearch = text => {
    if (text.length > 0) {
      let templist = Data.filter(item => {
        return item.profileName.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(templist);
    } else {
      setData(Alldata);
    }
  };

  const checkUserBalance = (rate, astrologerId, photo) => {
    getAstrolgerdata()
      .then(result => {
        const totalCost = rate * 5;
        settotalCost(totalCost);
        if (UserBalance >= totalCost) {
          navigation.navigate('Chat Intake Form', {
            AstrologerId: astrologerId,
            url: photo,
          });
        } else {
          setmodal(true);
        }
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  const DataFilter = keyword => {
    const Result = Data.filter(value => {
      return value.category.includes(keyword);
    });
    setData(Result);
  };

  const LTH = () => {
    const Result = Data.sort((a, b) => a.rate - b.rate);
    setData(Result);
    setFiltermol(false);
  };
  const HTL = () => {
    const Result = Data.sort((a, b) => b.rate - a.rate);
    setData(Result);
    setFiltermol(false);
  };
  const Rating = () => {
    const Result = Data.sort((a, b) => b.rating - a.rating);
    setData(Result);
    setFiltermol(false);
  };
  const Experience = () => {
    const Result = Data.sort((a, b) => b.expirence - a.expirence);
    setData(Result);
    setFiltermol(false);
  };

  const CheckAlreadyRequested = async (value, rate, astrologerId, photo) => {
    let index = 0;
    for (index = 0; index < WaitList.length; index++) {
      const element = WaitList[index];
      if (element.astrologerId == value) {
        Alert.alert('You Already Requested this Astrologer');
        break;
      }
    }
    if (index >= WaitList.length) {
      checkUserBalance(rate, astrologerId, photo);
    }
  };

  const sortingData = index => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        LTH();
        break;
      case 1:
        HTL();
        break;
      case 2:
        Rating();
        break;
      case 3:
        Experience();
        break;
      default:
        break;
    }
  };
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Low to High (Price)',
      value: 'LTH',
    },
    {
      id: '1',
      label: 'High to Low (Price)',
      value: 'HTL',
    },
    {
      id: '1',
      label: 'Sort By Rating ',
      value: 'Rating',
    },
    {
      id: '1',
      label: 'Sort By Experience ',
      value: 'Experience',
    },
  ]);

  useEffect(() => {
    setisLoading(true);
    AsyncStorage.getItem('UserID').then(value => {
      setUserID(value);
      getData(value);
    });
  }, []);

  useEffect(() => {
    setisLoading(true);
    AsyncStorage.getItem('UserID').then(value => {
      setUserID(value);
      getData(value);
    });
  }, [IsFocused]);

  const AstrologerList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', {
            AstrologerId: item.astrologerId,
          });
        }}
        style={{
          backgroundColor: 'white',
          marginVertical: 5,
          alignItems: 'center',
          borderColor: '#DDDCDC',
          borderWidth: 1,
          marginHorizontal: 5,
          borderRadius: 10,
          paddingHorizontal: 15,
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <View>
          <Image
            source={{uri: item.photo}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: 'cover',
              margin: 10,
              marginHorizontal: 5,
            }}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Icon
              name="star"
              size={12}
              color={item.rating >= 1 ? '#FFB300' : 'gray'}
            />
            <Icon
              name="star"
              size={12}
              color={item.rating >= 2 ? '#FFB300' : 'gray'}
            />
            <Icon
              name="star"
              size={12}
              color={item.rating >= 3 ? '#FFB300' : 'gray'}
            />
            <Icon
              name="star"
              size={12}
              color={item.rating >= 4 ? '#FFB300' : 'gray'}
            />
            <Icon
              name="star"
              size={12}
              color={item.rating >= 5 ? '#FFB300' : 'gray'}
            />
          </View>
        </View>
        <View style={{marginLeft: 12}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 15,
                marginRight: 5,
                color: Colours.TextDarkColour,
                fontFamily: Family.SemiBold,
              }}>
              {item.profileName.charAt(0).toUpperCase() +
                item.profileName.slice(1)}
            </Text>
            <Verified name="verified" size={20} color="green" />
          </View>
          <Text
            style={{
              width: 205,
              fontSize: 12,
              color: Colours.TextGrayColour,
              fontFamily: Family.Medium,
            }}>
            {item.expertise}
          </Text>
          <Text
            style={{
              width: 205,
              fontSize: 12,
              color: Colours.TextGrayColour,
              fontFamily: Family.Medium,
            }}>
            {item.language}
          </Text>
          <Text
            style={{
              width: 205,
              fontSize: 12,
              color: Colours.TextGrayColour,
              fontFamily: Family.Medium,
            }}>
            Expirence {item.expirence} Years
          </Text>
        </View>
        <View style={{marginLeft: 'auto'}}>
          <TouchableOpacity
            onPress={() => {
              if (WaitList == null) {
                checkUserBalance(item.rate, item.astrologerId, item.photo);
              } else {
                CheckAlreadyRequested(
                  item.astrologerId,
                  item.rate,
                  item.astrologerId,
                  item.photo,
                );
              }
            }}
            style={{
              borderRadius: 20,
              marginLeft: 'auto',
              borderColor: item.waitTime == 0 ? 'green' : 'red',
              borderWidth: 2,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 5,
              // flexDirection:'row'
            }}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: Family.Medium,
                color: Colours.TextDarkColour,
              }}>
              Chat
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: Family.SemiBold,
                color: Colours.TextGrayColour,
              }}>
              ₹{item.rate}/min
            </Text>
          </TouchableOpacity>

          {item.waitTime == 0 ? null : (
            <Text style={{fontSize: 10, color: 'red', textAlign: 'center'}}>
              Wait {item.waitTime}m
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const WaitListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile', {
            AstrologerId: item.astrologerId,
          });
        }}
        style={{
          backgroundColor: 'white',
          marginVertical: 2,
          alignItems: 'center',
          borderColor: '#DDDCDC',
          borderWidth: 1,
          marginHorizontal: 5,
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
        }}>
        <View>
          <Image
            source={{uri: item.photo}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={{marginLeft: 12}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                marginRight: 5,
                color: Colours.TextGrayColour,
              }}>
              {item.profileName.charAt(0).toUpperCase() +
                item.profileName.slice(1)}
            </Text>
            <Verified name="verified" size={20} color="green" />
          </View>
          <Text style={{color: 'black', fontSize: 10}}>₹{item.rate}/min</Text>
        </View>

        <View
          style={{
            marginLeft: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Search
            name="pause-circle-outline"
            size={40}
            color={item.rating >= 3 ? '#FFB300' : 'gray'}
          />
          <TouchableOpacity
            onPress={() => Reject(item.astrologerId, item.roomId)}>
            <Feather
              name="x-circle"
              size={35}
              color={item.rating >= 3 ? '#FFB300' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //-----------------------------------------------------------------------
  const Reject = (AstrologerId, RoomId) => {
    fetch(
      GLOBAL.BASE_URL +
        `createChat&userId=${UserID}&astrologerId=${AstrologerId}&roomId=${RoomId}&status=decline`,
    );
    getData(UserID);
  };

  return (
    <View style={{flex: 1}}>
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

      <Header navigation={navigation} name={'Chat'} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getData(UserID)}
          />
        }>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 5,
            paddingVertical: 10,
          }}
          horizontal={true}>
          <TouchableOpacity
            style={styles.headerFilters}
            onPress={() => {
              setData(Alldata);
              ChatFilter(null);
            }}>
            <Grid name="nav-icon-grid-a" size={14} color="gray" />
            <Text style={styles.headerFiltersText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => DataFilter('love')}
            style={styles.headerFilters}>
            <Grid name="heart" size={14} color="red" />
            <Text style={styles.headerFiltersText}>Love</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => DataFilter('Education')}
            style={styles.headerFilters}>
            <Filter name="book-education-outline" size={20} color="blue" />
            <Text style={styles.headerFiltersText}>Education</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => DataFilter('career')}
            style={styles.headerFilters}>
            <Filter name="medical-bag" size={20} color="blue" />
            <Text style={styles.headerFiltersText}>Career</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerFilters}
            onPress={() => DataFilter('Marriage')}>
            <Icon name="mars-double" size={20} color="purple" />
            <Text style={styles.headerFiltersText}>Marriage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerFilters}
            onPress={() => DataFilter('Health')}>
            <FontAwesome5 name="clinic-medical" size={20} color="pink" />
            <Text style={styles.headerFiltersText}>Health</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerFilters}
            onPress={() => DataFilter('Wealth')}>
            <Entypo name="wallet" size={20} color="blue" />
            <Text style={styles.headerFiltersText}>Wealth</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerFilters}
            onPress={() => DataFilter('Business')}>
            <FontAwesome5 name="business-time" size={20} color="blue" />
            <Text style={styles.headerFiltersText}>Business</Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colours.light,
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 50,
            }}>
            <Search name="search-outline" size={30} color="#d1cdcd" />
            <TextInput
              style={{
                color: Colours.TextGrayColour,
                fontFamily: Family.Medium,
                paddingHorizontal: 5,
                flex: 1,
              }}
              placeholder="Search Astrologer"
              placeholderTextColor="#777"
              onChangeText={text => handleSearch(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => setFiltermol(true)}
            style={{marginLeft: 10, marginRight: 10}}>
            <Filter name="filter-plus-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList data={Data} renderItem={AstrologerList} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Your Chat request is rejected by Astrologer</Text>
            <Text>
              You should also explore other astrologer and connect with them{' '}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFB300',
                width: '100%',
                paddingVertical: 15,
                borderRadius: 30,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: Colours.PrimaryColor,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={modal}
        onRequestClose={() => {
          setmodal(!modal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setmodal(false);
              }}
              style={{marginLeft: 'auto', marginTop: -10}}>
              <Feather name="x-circle" size={20} color={'gray'} />
            </TouchableOpacity>
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
              value={Amount}
              onChangeText={setAmount}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderColor: Colours.GrayColor,
                borderRadius: 10,
                marginVertical: 15,
                color: Colours.TextGrayColour,
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={Filtermodal}
        onRequestClose={() => {
          setmodal(!Filtermodal);
        }}
        style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
        <View
          style={{
            marginTop: 'auto',
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setFiltermol(false);
            }}
            style={{marginLeft: 'auto', marginTop: -10}}>
            <Feather name="x-circle" size={20} color={'gray'} />
          </TouchableOpacity>
          {radioButtons.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{marginLeft: 10, color: Colours.black}}>
                {item.label}
              </Text>
              <TouchableOpacity
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#000',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  sortingData(index);
                }}>
                {SelectedIndex == index ? (
                  <View
                    style={{
                      height: 16,
                      width: 16,
                      borderRadius: 8,
                      backgroundColor: 'black',
                    }}></View>
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Modal>

      <Modal visible={CSModal} transparent={true}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 50,
              height: 350,
              width: 280,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                marginTop: 10,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              You're all set!
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={{
                    uri: Userurl,
                  }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginHorizontal: '40%',
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                marginTop: 'auto',
                textAlign: 'center',
                marginBottom: 10,
              }}>
              While you wait for Astrologer you may also explore other
              Astrologer and join their waitlist
            </Text>
            <TouchableOpacity
              onPress={() => {
                getData(User);
                Modalstate();
              }}
              style={{
                marginTop: 5,
                backgroundColor: Colours.PrimaryColor,
                alignItems: 'center',
                margin: 15,
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <Text style={{color: 'white'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {WaitList == null ? null : (
        <View style={{marginTop: 'auto'}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 15,
              margin: 10,
              borderColor: Colours.GrayColor,
              borderBottomWidth: 2,
              width: '95%',
            }}>
            WaitList
          </Text>
          <FlatList data={WaitList} renderItem={WaitListItem} />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: Colours.PrimaryColor,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
  },
  headerIcons: {
    marginRight: 12,
  },
  headerWallet: {
    marginLeft: 'auto',
    backgroundColor: 'white',
    width: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 13,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    backgroundColor: Colours.GrayColor,
    height: 40,
    width: '90%',
    paddingLeft: 10,
    marginVertical: 5,
  },

  headerFilters: {
    borderRadius: 100,
    backgroundColor: Colours.Background,
    width: 60,
    height: 60,
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  headerFiltersText: {
    fontSize: 10,
    color: Colours.TextGrayColour,
    fontFamily: Family.Light,
    marginTop: 3,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: Colours.GrayColor,
    borderWidth: 1,
  },
  searchInput: {
    paddingHorizontal: 10,
    width: '100%',
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
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
});
