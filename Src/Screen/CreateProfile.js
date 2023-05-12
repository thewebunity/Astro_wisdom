import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Colours from '../Assets/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Family from '../Utilities/Family';

const GLOBAL = require('../Utilities/Global');

const CreateProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [Address, handleAddressChange] = useState('');
  const [TOB, setTOB] = useState(new Date());
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [openPOBModal, setopenPOBModal] = useState(false);

  const [City, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    SetLoading(true);
    AsyncStorage.getItem('UserID').then(value => {
      console.log('async' + value);
      setUserID(value);
      getProfileData(value);
    });
  }, []);
  const [UserID, setUserID] = useState();

  const getProfileData = async value => {
    console.log(
      GLOBAL.BASE_URL + `myProfile&userId=${encodeURIComponent(value)}`,
    );

    return fetch(
      GLOBAL.BASE_URL + `myProfile&userId=${encodeURIComponent(value)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        console.log(responseJson.response.name);
        handleNameChange(responseJson.response.name);
        handleGenderChange(responseJson.response.gender);
        handlePOBChange(responseJson.response.placeOfBirth);
        handleAddressChange(responseJson.response.address);
        setCity(responseJson.response.city);
        SetLoading(false);
      });
  };

  const CheckValidation = () => {
    if (name.length == 0) {
      alert('Enter Your Name');
    } else if (gender.length == 0) {
      alert('Select Your Gender');
    } else if (latitude == 0) {
      alert('Enter Your Place of Birth Properly');
    } else if (Address.length == 0) {
      alert('Enter Your Address');
    } else if (City.length == 0) {
      alert('Enter Your City');
    } else {
      handleCreateProfile();
    }
  };

  const handleCreateProfile = async () => {
    const dob =
      DOB.getDate() + '/' + (DOB.getMonth() + 1) + '/' + DOB.getFullYear();
    const tob = TOB.getHours() + ':' + TOB.getMinutes();
    return fetch(
      GLOBAL.BASE_URL +
        `updateProfile&name=${encodeURIComponent(
          name,
        )}&dob=${encodeURIComponent(dob)}&gender=${encodeURIComponent(
          gender,
        )}&tob=${encodeURIComponent(tob)}&pob=${encodeURIComponent(
          POB,
        )}&address=${encodeURIComponent(Address)}&city=${encodeURIComponent(
          City,
        )}&userId=${encodeURIComponent(UserID)}&lat=${encodeURIComponent(
          latitude,
        )}&lon=${encodeURIComponent(longitude)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        alert('Profile created Succesfull');
        navigation.navigate('BottomNavigationBar');
      });
  };

  const handleCityChange = text => {
    setPOB(text);
    if (text) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${text}&key=AIzaSyB7Y0M-RQdTga_32iAxYutKvfNm6DncfNM `,
      )
        .then(response => response.json())
        .then(data => {
          setPlaces(data.results);
          console.log(data);
        });
    } else {
      setPlaces([]);
    }
  };

  const handlePlaceSelect = place => {
    setLongitude(place.geometry.location.lng);
    setLatitude(place.geometry.location.lat);
    setPOB(place.formatted_address);
    setPlaces([]);
  };

  const [POB, setPOB] = useState('');

  const handleNameChange = text => {
    setName(text);
  };
  const handleTOBChange = value => {
    setTOB(value);
  };
  const handleGenderChange = value => {
    setGender(value);
  };
  const handlePOBChange = value => {
    setPOB(value);
  };
  const handleUserID = value => {
    setUserID(value);
    console.log(UserID);
  };

  const [isLoading, SetLoading] = useState(true);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 18,
            marginTop: 20,
            color: Colours.TextDarkColour,
            fontFamily: Family.Medium,
          }}>
          Complete Profile
        </Text>
        <Text
          style={{
            color: Colours.TextGrayColour,
            marginBottom: 30,
            fontFamily: Family.Regular,
          }}>
          to get best prediction in every call with your favourite astrologer ,
          every time
        </Text>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Name*</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={handleNameChange}
            value={name}
            placeholder="Name"
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={styles.genderSelection}>
          <Text style={styles.inputTitle}>Gender</Text>

          <View style={{flexDirection: 'row'}}>
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

        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Date Of Birth*</Text>
          <View
            style={{flexDirection: 'row', marginVertical: 10, marginTop: 5}}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={styles.date}>
                {DOB.getDate() +
                  '/' +
                  (DOB.getMonth() + 1) +
                  '/' +
                  DOB.getFullYear()}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.Button}
              onPress={() => setOpen(true)}>
              <Text>Change Date</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View>
                <DatePicker
                  modal
                  open={open}
                  date={DOB}
                  mode="date"
                  onConfirm={date => {
                    setOpen(false);
                    setDOB(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Time of Birth*</Text>
          <View
            style={{flexDirection: 'row', marginVertical: 10, marginTop: 5}}>
            <TouchableOpacity onPress={() => setOpens(true)}>
              <Text style={styles.date}>
                {TOB.getHours() + ':' + TOB.getMinutes()}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.Button}
              onPress={() => setOpens(true)}>
              <Text>Change Time</Text>
            </TouchableOpacity> */}
            <DatePicker
              modal
              open={opens}
              date={TOB}
              mode="time"
              onConfirm={TOB => {
                setOpens(false);
                setTOB(TOB);
              }}
              onCancel={() => {
                setOpens(false);
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setopenPOBModal(true)}
          style={styles.inputBox}>
          <Text style={styles.inputTitle}>Place of Birth*</Text>
          <TextInput
            style={styles.nameInput}
            value={POB}
            placeholder="Place of birth"
            onPressIn={() => setopenPOBModal(true)}
            onChangeText={handleCityChange}
            placeholderTextColor={'gray'}
          />
          <FlatList
            data={places}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handlePlaceSelect(item)}>
                <Text style={styles.place}>{item.formatted_address}</Text>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>

        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Current Address*</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={handleAddressChange}
            value={Address}
            placeholder="Enter Flat, House No, Building, Apartment"
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={setCity}
            value={City}
            placeholder="City"
            placeholderTextColor={'gray'}
          />
        </View>
        <TouchableOpacity
          onPress={() => CheckValidation()}
          style={styles.createProfileButton}>
          <Text style={styles.createProfileButtonText}>Create Profile</Text>
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
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.nameInput, {marginLeft: 5}]}
            value={POB}
            placeholder="Place of birth"
            onChangeText={handleCityChange}
            placeholderTextColor={'gray'}
          />
          <FlatList
            data={places}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setopenPOBModal(false);
                  handlePlaceSelect(item);
                }}>
                <Text style={styles.place}>{item.formatted_address}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  DOBbutton: {},
  date: {
    marginRight: 'auto',
    color: Colours.black,
    fontFamily: Family.Regular,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  nameInput: {
    borderBottomWidth: 1,
    borderColor: '#FFB300',
    padding: 5,
    marginBottom: 10,
    width: '120%',
    color: Colours.black,
    fontFamily: Family.Regular,
  },
  genderSelection: {
    marginBottom: 20,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    fontFamily: Family.Regular,
  },
  genderOptionSelected: {
    backgroundColor: 'gray',
  },
  genderOptionText: {
    color: 'black',
    fontFamily: Family.Regular,
  },
  genderOptionTextSelected: {
    color: 'white',
    fontFamily: Family.Regular,
  },
  createProfileButton: {
    backgroundColor: Colours.PrimaryColor,
    borderRadius: 50,
    width: '50%',
    marginVertical: 15,
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  createProfileButtonText: {
    color: 'white',
    fontFamily: Family.SemiBold,
  },
  inputTitle: {
    color: Colours.TextGrayColour,
    fontFamily: Family.Regular,
    marginRight: 20,
    marginVertical: 5,
    fontSize: 15,
  },
});

export default CreateProfile;
