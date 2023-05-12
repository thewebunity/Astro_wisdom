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
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colours from '../Assets/Colours';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Translate from 'react-native-vector-icons/dist/MaterialIcons';
import ChartIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Phone from 'react-native-vector-icons/dist/MaterialIcons';
import Chat from 'react-native-vector-icons/dist/Ionicons';
import GLOBAL from '../Utilities/Global';
import Family from '../Utilities/Family';
import Header from '../Assets/Header';
import {UserAuthContext} from '../context/UserAuthContext';
import {SliderBox} from 'react-native-image-slider-box';

export default function Home({navigation}) {
  const [LiveAstrologerData, setLiveAstrologerData] = useState([]);
  const [isLoading, SetLoading] = useState(false);
  const [slider, setslider] = useState([]);
  const [KnowledgeBoxData, setKnowledgeBoxData] = useState([]);
  const [TestimonialData, setTestimonialData] = useState([]);
  const {ChatFilter, getAstrolgerdata} = useContext(UserAuthContext);

  const Navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsuscribe;
  }, [Navigation]);

  const getAstrolger = async value => {
    let result = await fetch(GLOBAL.BASE_URL + 'homeScreen&userId=' + value);
    result = await result.json();
    setLiveAstrologerData(result.astrologer.response);
    setslider(result.slider);
    setKnowledgeBoxData(result.blog);
    setTestimonialData(result.testimonial);
    SetLoading(false);
    if (result.ongoing == null) {
    } else {
      OngoingChatNavigate(
        result.ongoing.roomId,
        result.ongoing.astrologerId,
        result.ongoing.userId,
      );
    }
    getAstrolgerdata();
  };

  useEffect(() => {
    SetLoading(true);
    AsyncStorage.getItem('UserID').then(value => {
      getAstrolger();
    });
  }, []);

  const OngoingChatNavigate = (RoomId, AstrologerId, userId) => {
    navigation.navigate('Chats', {
      RoomId,
      AstrologerId,
      userId,
    });
  };

  const KnowledgeBox = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Blog', {blogId: item.blogId})}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DDDCDC',
        borderWidth: 1,
        marginHorizontal: 5,
        width: 250,
        borderRadius: 10,
      }}>
      <Image
        source={{uri: item.img}}
        style={{
          width: 250,
          height: 150,
          marginBottom: 7,
          resizeMode: 'cover',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <Text
        style={{
          textAlign: 'justify',
          color: 'black',
          fontFamily: Family.Regular,
          fontSize: 11,
          paddingHorizontal: 5,
        }}>
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90%',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 10,
            color: Colours.TextGrayColour,
            fontFamily: Family.Light,
          }}>
          by {item.postBy}
        </Text>
        <Icon
          name="eye"
          size={15}
          color="black"
          style={{marginLeft: 'auto', marginRight: 10}}
        />
        <Text
          style={{
            fontSize: 10,
            color: Colours.TextGrayColour,
            fontFamily: Family.Light,
          }}>
          {item.view}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const LiveAstrologer = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Profile', {AstrologerId: item.astrologerId});
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DDDCDC',
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        paddingVertical: 10,
        width: 140,
      }}>
      <Image
        source={{uri: item.photo}}
        style={{margin: 7, height: 65, width: 65, borderRadius: 50}}
      />
      <Text
        numberOfLines={1}
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 13,
          fontFamily: Family.Regular,
        }}>
        {item.profileName.charAt(0).toUpperCase() + item.profileName.slice(1)}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          color: 'black',
          fontFamily: Family.Regular,
        }}>
        ₹ {item.rate}/min
      </Text>
      <TouchableOpacity
        style={{
          borderColor: '#25B023',
          borderWidth: 1,
          borderRadius: 15,
          paddingHorizontal: 10,
          marginTop: 5,
        }}>
        <Text
          style={{
            fontSize: 10,
            color: '#25B023',
            padding: 5,
            fontFamily: Family.Medium,
          }}>
          Connect
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  //-----------------------------------------------

  return (
    <View style={styles.container}>
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
      <Header navigation={navigation} name={'AstroWisdom'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <SliderBox
            images={slider}
            sliderBoxHeight={200}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            width: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.QuickButtonsBox}
            onPress={() => {
              ChatFilter('love');
              navigation.navigate('Chat');
            }}>
            <ChartIcon
              name="heart-multiple-outline"
              size={40}
              color="#fc6600"
            />
            <Text style={styles.QuickButtonsText}>
              Love & {'\n'}Relationships
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.QuickButtonsBox}
            onPress={() => {
              ChatFilter('Career');
              navigation.navigate('Chat');
            }}>
            <ChartIcon
              name="book-education-outline"
              size={40}
              color="#fc6600"
            />
            <Text style={styles.QuickButtonsText}>Career</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.QuickButtonsBox}
            onPress={() => {
              ChatFilter('Money');
              navigation.navigate('Chat');
            }}>
            <Icon name="rupee" size={40} color="#fc6600" />
            <Text style={styles.QuickButtonsText}>Wealth</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            width: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={styles.QuickButtonsBox}
            onPress={() => {
              ChatFilter('Best in Class');
              navigation.navigate('Chat');
            }}>
            <ChartIcon name="bag-checked" size={40} color="#fc6600" />
            <Text style={styles.QuickButtonsText}>Best in Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.QuickButtonsBox}
            onPress={() => {
              ChatFilter('Women Only');
              navigation.navigate('Chat');
            }}>
            <ChartIcon name="face-woman-outline" size={40} color="#fc6600" />
            <Text style={styles.QuickButtonsText}>Women Only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.QuickButtonsBox}
            onPress={() => navigation.navigate('Kundli')}>
            <ChartIcon name="chart-box-outline" size={40} color="#fc6600" />
            <Text style={styles.QuickButtonsText}>Free Kundli</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.BoxBackground}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.CategoryHeading}>Live Astrologer</Text>
              <TouchableOpacity
                style={styles.VieMoreButton}
                onPress={() => navigation.navigate('Chat')}>
                <Text style={styles.VieMoreText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.HorizontalScroll}>
              <FlatList
                data={LiveAstrologerData}
                renderItem={LiveAstrologer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.astrologerId}
              />
            </View>
          </View>
          <View style={styles.BoxBackground}>
            <Text style={styles.CategoryHeading}>Knowledge Box</Text>
            <View style={styles.HorizontalScroll}>
              <FlatList
                data={KnowledgeBoxData}
                renderItem={KnowledgeBox}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.BoxBackground}>
            <Text style={styles.CategoryHeading}>Clients Testimonial</Text>

            <View style={styles.TestimonialsBox}>
              <Swiper autoplayTimeout={1000} autoplay={true}>
                {TestimonialData.map(item => (
                  <View style={styles.TestimonialDataBox}>
                    <Image
                      source={{uri: item.img}}
                      style={{width: 60, height: 60, borderRadius: 30}}
                    />
                    <View style={{marginLeft: 20}}>
                      <Text style={{color: 'black'}}>
                        {item.name.slice(0, 20)}
                      </Text>
                      <Text style={{color: Colours.TextGrayColour}}>
                        {item.content.slice(0, 50)}
                      </Text>
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 6,
            backgroundColor: '#fff',
            paddingTop: 25,
            paddingBottom: 50,
          }}>
          <View>
            <Image
              source={require('../Images/shield.png')}
              style={{width: '100%', height: 50, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: Family.Light,
                color: Colours.TextDarkColour,
                marginVertical: 5,
                textAlign: 'center',
              }}>
              Private &{'\n'}Confidential
            </Text>
          </View>
          <View>
            <Image
              source={require('../Images/verifies.png')}
              style={{width: '100%', height: 50, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: Family.Light,
                color: Colours.TextDarkColour,
                marginVertical: 5,
                textAlign: 'center',
              }}>
              Verified {'\n'}Astrologer
            </Text>
          </View>
          <View>
            <Image
              source={require('../Images/debit-card.png')}
              style={{width: '100%', height: 50, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: Family.Light,
                color: Colours.TextDarkColour,
                marginVertical: 5,
                textAlign: 'center',
              }}>
              Secure {'\n'} Payments
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-around',
          position: 'absolute',
          bottom: 10,
        }}>
        <TouchableOpacity
          style={styles.BottomButton}
          onPress={() => navigation.navigate('Chat')}>
          <Chat name="chatbubbles" size={18} color={'white'} />
          <Text style={styles.BottomButtonText}>Chat With Astrologer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BottomButton}
          onPress={() => navigation.navigate('Call')}>
          <Phone name="phone" size={18} color={'white'} />
          <Text style={styles.BottomButtonText}>Call With Astrologer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.Background,
  },
  VieMoreButton: {
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  },
  VieMoreText: {
    color: Colours.TextGrayColour,
    fontSize: 12,
    fontFamily: Family.Medium,
  },
  header: {
    paddingVertical: 15,
    backgroundColor: Colours.PrimaryColor,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 15,
    fontFamily: Family.Medium,
  },
  headerIcons: {
    marginRight: 12,
  },
  headerWallet: {
    marginLeft: 'auto',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 13,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 30,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: Colours.GrayColor,
    borderWidth: 1,
  },
  searchInput: {
    paddingHorizontal: 10,
    fontFamily: Family.Medium,
    fontSize: 12,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 170,
  },
  QuickButtonsBox: {
    width: '30%',
    marginVertical: 10,
    // borderWidth: 1,
    // borderColor: Colours.GrayColor,
    marginHorizontal: '1.5%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colours.light,
  },
  QuickButtonsText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Family.Regular,
    color: Colours.TextDarkColour,
    marginTop: 15,
  },
  CategoryHeading: {
    fontFamily: Family.Medium,
    margin: 10,
    color: Colours.PrimaryColor,
    fontSize: 14,
  },
  HorizontalScroll: {
    flexDirection: 'row',
    paddingHorizontal: 7,
  },
  BoxBackground: {
    backgroundColor: 'white',
    marginVertical: 4,
    paddingBottom: 15,
  },
  TestimonialsBox: {
    height: 120,
    width: 350,
    alignSelf: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  TestimonialDataBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  BottomButton: {
    backgroundColor: Colours.PrimaryColor,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  BottomButtonText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 10,
    fontFamily: Family.Medium,
  },
});
