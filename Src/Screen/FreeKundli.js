import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Colours from '../Assets/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Family from '../Utilities/Family';
const GLOBAL = require('../Utilities/Global');

const FreeKundli = ({navigation}) => {
  useEffect(async () => {
    // call your function here

    await AsyncStorage.getItem('UserID').then(value => {
      console.log(value);
      setUserID(value);
      // Do something with the retrieved value
      fetchUserList(value);
    });
  }, []);

  const fetchUserList = async value => {
    return fetch(
      GLOBAL.BASE_URL + `myProfile&userId=${encodeURIComponent(value)}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        console.log(responseJson.response.name);
        handleNameChange(responseJson.response.name);
      });
  };

  const handleCreatekundli = async () => {
    const dob =
      DOB.getDate() + '/' + (DOB.getMonth() + 1) + '/' + DOB.getFullYear();
    const tob = TOB.getHours() + ':' + TOB.getMinutes();

    return fetch(
      GLOBAL.BASE_URL +
        `createKundli&userId=${encodeURIComponent(
          UserID,
        )}&name=${encodeURIComponent(name)}&dob=${encodeURIComponent(
          dob,
        )}&gender=${encodeURIComponent(gender)}&tob=${encodeURIComponent(
          tob,
        )}&pob=${encodeURIComponent(POB)}&lat=${encodeURIComponent(
          latitude,
        )}&lon=${encodeURIComponent(longitude)}&day=${encodeURIComponent(
          DOB.getDate(),
        )}&month=${encodeURIComponent(
          DOB.getMonth() + 1,
        )}&year=${encodeURIComponent(
          DOB.getFullYear(),
        )}&hour=${encodeURIComponent(
          TOB.getHours(),
        )}&minute=${encodeURIComponent(TOB.getMinutes())}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        navigation.navigate('Home');
      });
  };

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [TOB, setTOB] = useState(new Date());
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [openPOBModal, setopenPOBModal] = useState(false);

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
    setSelectedPlace(place);
    setopenPOBModal(false);
  };

  const [POB, setPOB] = useState('');
  const [UserID, setUserID] = useState();

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

  const [selectedStep, setSelectedStep] = useState(1);
  const progress1 = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  const progress3 = useRef(new Animated.Value(0)).current;
  const progress4 = useRef(new Animated.Value(0)).current;
  const start1 = () => {
    Animated.timing(progress1, {
      toValue: 40,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const prev1 = () => {
    Animated.timing(progress1, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const prev2 = () => {
    Animated.timing(progress2, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const prev3 = () => {
    Animated.timing(progress3, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const prev4 = () => {
    Animated.timing(progress4, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const start2 = () => {
    Animated.timing(progress2, {
      toValue: 40,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const start3 = () => {
    Animated.timing(progress3, {
      toValue: 40,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  const start4 = () => {
    Animated.timing(progress4, {
      toValue: 40,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 30,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor:
              selectedStep > 0 ? Colours.PrimaryColor : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>1</Text>
        </View>
        <View
          style={{
            width: 40,
            height: 1,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,

            backgroundColor:
              selectedStep > 1 ? Colours.PrimaryColor : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>2</Text>
        </View>
        <View
          style={{
            width: 40,
            height: 100,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor:
              selectedStep > 2 ? Colours.PrimaryColor : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>3</Text>
        </View>
        <View
          style={{
            width: 40,
            height: 100,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor:
              selectedStep > 3 ? Colours.PrimaryColor : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>4</Text>
        </View>
        <View
          style={{
            width: 40,
            height: 100,
            backgroundColor: '#f2f2f2',
          }}></View>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor:
              selectedStep > 4 ? Colours.PrimaryColor : '#f2f2f2',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>5</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 50,
          position: 'absolute',
          top: -5,
          flexDirection: 'row',
        }}>
        <Animated.View
          style={{
            width: progress1,
            height: 6,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 20,
            backgroundColor: Colours.PrimaryColor,
          }}></Animated.View>

        <Animated.View
          style={{
            width: progress2,
            height: 6,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 20,
            backgroundColor: Colours.PrimaryColor,
          }}></Animated.View>
        <Animated.View
          style={{
            width: progress3,
            height: 6,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 20,
            backgroundColor: Colours.PrimaryColor,
          }}></Animated.View>
        <Animated.View
          style={{
            width: progress4,
            height: 6,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 20,
            backgroundColor: Colours.PrimaryColor,
          }}></Animated.View>
      </View>
      {selectedStep == 1 ? (
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Enter Your Name*</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={handleNameChange}
            value={name}
            placeholder="Name"
            placeholderTextColor={Colours.TextGrayColour}
          />
        </View>
      ) : null}

      {selectedStep == 2 ? (
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Select Your Gender</Text>
          <View style={styles.genderSelection}>
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
      ) : null}

      {selectedStep == 3 ? (
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Date Of Birth*</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => setOpen(true)}>
              <Text style={styles.date}>
                {DOB.getDate() +
                  '/' +
                  (DOB.getMonth() + 1) +
                  '/' +
                  DOB.getFullYear()}
              </Text>

              {/* <Text>Change Date</Text> */}
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
              // onDateChange={setDOB}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
      ) : null}

      {selectedStep == 4 ? (
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Time of Birth*</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setOpens(true)}>
              <Text style={styles.date}>
                {TOB.getHours() + ':' + TOB.getMinutes()}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.Button} onPress={() => setOpens(true)}>
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
      ) : null}

      {selectedStep == 5 ? (
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle}>Place of Birth*</Text>
          <TextInput
            style={styles.nameInput}
            value={POB}
            placeholder="Place of birth"
            onChangeText={handleCityChange}
            onPressIn={() => setopenPOBModal(true)}
            placeholderTextColor={Colours.TextGrayColour}
          />
          <FlatList
            data={places}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handlePlaceSelect(item)}
                style={{marginLeft: 36}}>
                <Text style={styles.place}>{item.formatted_address}</Text>
              </TouchableOpacity>
            )}
          />
          <Modal visible={openPOBModal}>
            <View style={{margin: -5, marginTop: 15}}>
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
                style={styles.nameInput}
                value={POB}
                placeholder="Place of birth"
                onChangeText={handleCityChange}
                placeholderTextColor={Colours.TextDarkColour}
              />
              <FlatList
                data={places}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handlePlaceSelect(item)}
                    style={{marginLeft: 36}}>
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
      ) : null}

      <View style={{flexDirection: 'row'}}>
        {selectedStep > 1 ? (
          <TouchableOpacity
            style={{
              marginTop: 35,
              height: 50,
              width: 110,
              marginHorizontal: 44,
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              alignSelf: 'center',
            }}
            onPress={() => {
              if (selectedStep == 1) {
                setSelectedStep(selectedStep - 1);
                prev1();
              }
              if (selectedStep == 2) {
                setSelectedStep(selectedStep - 1);
                prev2();
              }
              if (selectedStep == 3) {
                setSelectedStep(selectedStep - 1);
                prev3();
              }
              if (selectedStep == 4) {
                setSelectedStep(selectedStep - 1);
                prev4();
              }
              if (selectedStep == 5) {
                setSelectedStep(selectedStep - 1);
                prev4();
              }
              // if (selectedStep == 0) {
              //   setSelectedStep(selectedStep + 1);
              // } else {
              //   setTimeout(() => {
              //     setSelectedStep(selectedStep + 1);
              //   }, 3000);
              // }
            }}>
            <Text>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: 35,
              height: 50,
              width: 110,
              marginHorizontal: 44,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              alignSelf: 'center',
            }}></View>
        )}
        <TouchableOpacity
          style={{
            marginTop: 35,
            height: 50,
            width: 110,
            marginHorizontal: 44,
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            alignSelf: 'center',
          }}
          onPress={() => {
            if (selectedStep == 1) {
              start1();
            }
            if (selectedStep == 2) {
              start2();
            }
            if (selectedStep == 3) {
              start3();
            }
            if (selectedStep == 4) {
              start4();
            }
            if (selectedStep == 5) {
              if (name.length == 0) {
                alert('Please enter Name');
              } else if (gender.length == 0) {
                alert('Please select Gender');
              } else if (POB.length == 0) {
                alert('Enter your Place of Birth');
              } else {
                handleCreatekundli();
              }
            } else {
              setTimeout(() => {
                setSelectedStep(selectedStep + 1);
                console.log('selectedStep', selectedStep);
              }, 1000);
            }
          }}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FreeKundli;

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 20,
    marginLeft: 36,
    marginBottom: 12,
    color: Colours.TextDarkColour,
  },

  place: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    color: Colours.TextDarkColour,
  },
  inputBox: {
    width: '100%',
    marginBottom: 1,
  },
  genderSelection: {
    flexDirection: 'row',
    marginTop: 11,
    alignItems: 'center',
    marginLeft: 39,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
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
  date: {
    marginHorizontal: 40,
    fontSize: 18,
    color: Colours.TextDarkColour,
  },
  nameInput: {
    marginLeft: 35,
    borderColor: Colours.PrimaryColor,
    borderBottomWidth: 1,
    paddingBottom: -19,
    width: 320,
    color: Colours.TextDarkColour,
  },
  Button: {
    borderRadius: 12,
    padding: 5,
  },
});
