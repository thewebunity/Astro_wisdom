import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  ToastAndroid,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Colours from '../Assets/Colours';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';
import Global from '../Utilities/Global';
import {UserAuthContext} from '../context/UserAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Family from '../Utilities/Family';

const ChatIntakeForm = ({navigation, route}) => {
  const {AstrologerId, url} = route.params;

  const [gender, setGender] = useState('');
  const [DOB, setDOB] = useState(new Date());
  const [Time, setTime] = useState(new Date());
  const [PDate, setPDate] = useState(new Date());
  const [PTime, setPTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openPD, setOpenPD] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openPTime, setOpenPTime] = useState(false);
  const [userId, setuserId] = useState('');
  const [Data, setData] = useState();
  const [Name, setName] = useState('');
  const [POB, setPOB] = useState('');
  const [openPOBModal, setopenPOBModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState();

  const {User, Balance, getAstrolgerdata, CSModal, Modalstate} =
    useContext(UserAuthContext);

  const handleGenderChange = value => {
    setGender(value);
  };

  const [Marrital, setMarrital] = useState();
  const [Topic, setTopic] = useState();

  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setInputValue('');
    console.log(DOB);
  };

  useEffect(async () => {
    await AsyncStorage.getItem('UserID').then(value => {
      setuserId(value);
      getProfileData(value);
    });
  }, []);

  const getProfileData = async value => {
    return fetch(
      Global.BASE_URL + `myProfile&userId=${encodeURIComponent(value)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        console.log(responseJson.response.name);
        setName(responseJson.response.name);
        setGender(responseJson.response.gender);
      });
  };

  const CheckValidation = () => {
    if (Name.length == 0) {
      alert('Please enter Name');
    } else if (gender.length == 0) {
      alert('Please Select Gender');
    } else if (Latitude == 0) {
      alert('Please Enter Place of Birth Properly');
    } else {
      StartChart();
    }
  };

  const StartChart = async () => {
    const TOB = Time.getHours() + ':' + Time.getMinutes();
    const date =
      DOB.getDate() + '/' + (DOB.getMonth() + 1) + '/' + DOB.getFullYear();
    Modalstate(url);
    AsyncStorage.getItem('UserID').then(async value => {
      setuserId(value);
      const RoomId = 'txn' + Math.floor(Math.random() * 100000000);
      const response = await fetch(
        `https://astrowisdom.in/api/activity.php?method=chatRequest&astrologerId=${AstrologerId}`,
      );
      const createdChatStaus = await fetch(
        `https://astrowisdom.in/api/activity.php?method=createChat&userId=${userId}&astrologerId=${AstrologerId}&roomId=${RoomId}&status=created&name=${Name}&dob=${date}&gender=${gender}&tob=${TOB}&pob=${POB}&lat=${Latitude}&lon=${Longitude}`,
      );
      const collectionset = firestore().collection('chat');
      const newRef = collectionset.doc();
      newRef.set({
        id: newRef.id,
        userId: value,
        AstrologerId: AstrologerId,
        RoomId: RoomId,
        createdAt: firestore.FieldValue.serverTimestamp(),
        status: 'requested',
      });
    });
    navigation.navigate('Chat');
  };

  const handleCityChange = text => {
    setPOB(text);
    if (text.length > 4) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}}.json?access_token=pk.eyJ1IjoiYXN0cm93aXNkb20iLCJhIjoiY2xoYmhheHdoMHJuZDNkbnM2ZGo1a3N1aSJ9.fRwqQFdkcdTxkBXXayi-BQ`,
      )
        .then(response => response.json())
        .then(data => {
          setPlaces(data.features);
        });
    } else {
      setPlaces([]);
    }
  };

  const handlePlaceSelect = place => {
    setLongitude(place.center[0]);
    setLatitude(place.center[1]);
    setPOB(place.place_name);
    setPlaces([]);
  };

  const getdata = () => {
    return fetch(
      Global.BASE_URL +
        `astrologerProfile&astrologerId=${encodeURIComponent(AstrologerId)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson.response);
      });
  };

  useEffect(() => {
    getdata();

    return getdata();
  }, []);

  return (
    <View>
      <ScrollView style={{}}>
        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Name*</Text>
          <TextInput
            style={styles.InputFeild}
            placeholder="Name"
            onChangeText={setName}
            value={Name}
          />
        </View>
        <View style={styles.InputBox}>
          <View style={styles.genderSelection}>
            <Text style={styles.InputTitle}>Gender</Text>
            <TouchableOpacity
              onPress={() => handleGenderChange('male')}
              style={[
                styles.genderOption,
                gender === 'male' && styles.genderOptionSelected,
              ]}>
              <Text
                style={[
                  styles.genderOptionText,
                  gender === 'male' && styles.genderOptionTextSelected,
                ]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGenderChange('female')}
              style={[
                styles.genderOption,
                gender === 'female' && styles.genderOptionSelected,
              ]}>
              <Text
                style={[
                  styles.genderOptionText,
                  gender === 'female' && styles.genderOptionTextSelected,
                ]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Date of Birth*</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              borderBottomWidth: 1,
              borderColor: Colours.PrimaryColor,
            }}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={styles.date}>
                {DOB.getDate() +
                  '/' +
                  (DOB.getMonth() + 1) +
                  '/' +
                  DOB.getFullYear()}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              date={DOB}
              mode="date"
              onConfirm={date => {
                setOpen(false);
                setDOB(date);
              }}
              maximumDate={new Date()}
              format="DD-MM-YYYY"
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Time of Birth*</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              borderBottomWidth: 1,
              borderColor: Colours.PrimaryColor,
            }}>
            <TouchableOpacity onPress={() => setOpenTime(true)}>
              <Text style={styles.date}>
                {Time.getHours() + ':' + Time.getMinutes()}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openTime}
              date={Time}
              mode="time"
              onConfirm={date => {
                setOpenTime(false);
                setTime(date);
              }}
              onCancel={() => {
                setOpenTime(false);
              }}
            />
          </View>
        </View>

        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Place of Birth*</Text>
          <TextInput
            style={styles.InputFeild}
            placeholder="Place of birth"
            placeholderTextColor={Colours.TextGrayColour}
            onChangeText={setPOB}
            onPressIn={() => setopenPOBModal(true)}
            value={POB}
          />
        </View>

        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Marital Status</Text>
          <Picker
            style={{fontFamily: Family.Light, color: Colours.TextGrayColour}}
            selectedValue={Marrital}
            onValueChange={(itemValue, itemIndex) => setMarrital(itemValue)}>
            <Picker.Item label="Select Marital" value="java" />
            <Picker.Item label="Single" value="Single" />
            <Picker.Item label="Married" value="Married" />
            <Picker.Item label="Divorced" value="Divorced" />
            <Picker.Item label="Separated" value="Separated" />
            <Picker.Item label="Widowed" value="Widowed" />
          </Picker>
        </View>

        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Occupation*</Text>
          <TextInput
            style={styles.InputFeild}
            placeholder="Occupation"
            placeholderTextColor={Colours.TextGrayColour}
          />
        </View>
        <View style={styles.InputBox}>
          <Text style={styles.InputTitle}>Topic of Concern</Text>
          <Picker
            selectedValue={Topic}
            style={{
              fontFamily: Family.Light,
              color: Colours.TextGrayColour,
            }}
            onValueChange={(itemValue, itemIndex) => setTopic(itemValue)}>
            <Picker.Item label="Topic Of Concern" value="Topic Of Concern" />
            <Picker.Item
              label="Child Name Consultation"
              value="Child Name Consultation"
            />
            <Picker.Item
              label="Business Name Consultation"
              value="Business Name Consultation"
            />
            <Picker.Item
              label="Gem Stone Consultation"
              value="Gem Stone Consultation"
            />
            <Picker.Item
              label="commodity trading Consultation"
              value="commodity trading Consultation"
            />
            <Picker.Item label="Match Making" value="Match Making" />
            <Picker.Item
              label="Birth Time Rectification"
              value="Birth Time Rectification"
            />
          </Picker>
        </View>

        <View style={[styles.InputBox, {flexDirection: 'row'}]}>
          <CheckBox
            value={isChecked}
            onValueChange={handleCheckboxChange}
            style={{borderColor: Colours.TextGrayColour}}
          />
          <Text
            style={{fontFamily: Family.Light, color: Colours.TextGrayColour}}>
            Enter Partner Detail
          </Text>
        </View>
        {isChecked && (
          <View>
            <View style={styles.InputBox}>
              <Text style={styles.InputTitle}>Enters Partner Name*</Text>
              <TextInput
                style={styles.InputFeild}
                placeholder="Name"
                placeholderTextColor={Colours.TextGrayColour}
              />
            </View>
            <View style={styles.InputBox}>
              <Text style={styles.InputTitle}>Date Of Birth*</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderColor: Colours.PrimaryColor,
                }}>
                <TouchableOpacity onPress={() => setOpenPD(true)}>
                  <Text style={styles.date}>{PDate.toDateString()}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={openPD}
                  date={PDate}
                  mode="date"
                  onConfirm={date => {
                    setOpenPD(false);
                    setPDate(date);
                  }}
                  maximumDate={new Date()}
                  onCancel={() => {
                    setOpenPD(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.InputBox}>
              <Text style={styles.InputTitle}>Time Of Birth*</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderColor: Colours.PrimaryColor,
                }}>
                <TouchableOpacity onPress={() => setOpenPTime(true)}>
                  <Text style={styles.date}>{PTime.toTimeString()}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={openPTime}
                  date={PTime}
                  mode="time"
                  onConfirm={date => {
                    setOpenPTime(false);
                    setPTime(date);
                  }}
                  onCancel={() => {
                    setOpenPTime(false);
                  }}
                />
              </View>
            </View>

            <View style={styles.InputBox}>
              <Text style={styles.InputTitle}>
                Enters Partner Place of Birth*
              </Text>
              <TextInput
                style={styles.InputFeild}
                placeholder="Place of Birth"
                placeholderTextColor={Colours.TextGrayColour}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.createProfileButton}
          onPress={() => {
            CheckValidation();
          }}>
          <Text style={styles.createProfileButtonText}>Start Chat</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={openPOBModal}>
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.inputTitle, {textAlign: 'center'}]}>
              Enter Place of Birth
            </Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => setopenPOBModal(false)}>
              <Text
                style={{
                  fontFamily: Family.Medium,
                  color: Colours.TextGrayColour,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.nameInput, {marginLeft: 5}]}
            value={POB}
            placeholder="Enter Place of birth"
            placeholderTextColor={Colours.TextGrayColour}
            onChangeText={handleCityChange}
          />
          <FlatList
            data={places}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setopenPOBModal(false);
                  handlePlaceSelect(item);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Family.Medium,
                    color: Colours.TextGrayColour,
                    marginVertical: 10,
                  }}>
                  {item.place_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ChatIntakeForm;

const styles = StyleSheet.create({
  InputBox: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  InputTitle: {
    fontSize: 15,
    color: 'black',
    marginRight: 50,
    fontFamily: Family.Light,
    color: Colours.TextGrayColour,
  },
  nameInput: {
    borderBottomWidth: 1,
    borderColor: '#FFB300',
    padding: 5,
    marginBottom: 10,
    width: '120%',
    fontFamily: Family.Light,
    color: Colours.TextGrayColour,
  },
  inputTitle: {
    color: 'black',
    marginRight: 20,
    marginVertical: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  InputFeild: {
    borderBottomWidth: 1,
    borderColor: Colours.PrimaryColor,
    paddingBottom: -5,
    fontFamily: Family.Light,
    color: Colours.TextGrayColour,
  },
  genderSelection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  genderOption: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  ModalImage: {
    marginHorizontal: 33,
    marginTop: 25,
  },
  genderOptionSelected: {
    backgroundColor: 'gray',
  },
  genderOptionText: {
    color: 'black',
  },
  genderOptionTextSelected: {
    color: 'white',
  },
  Button: {
    backgroundColor: Colours.GrayColor,
    borderRadius: 12,
    padding: 5,
    marginLeft: 'auto',
  },
  createProfileButton: {
    backgroundColor: Colours.PrimaryColor,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 20,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  createProfileButtonText: {
    fontFamily: Family.Regular,
    color: Colours.light,
  },
  date: {
    fontFamily: Family.Light,
    color: Colours.TextGrayColour,
  },
});
