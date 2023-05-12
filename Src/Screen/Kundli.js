import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colours from '../Assets/Colours';
import GLOBAL from '../Utilities/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Family from '../Utilities/Family';
import {
  CalendarDaysIcon,
  MapPinIcon,
  UserCircleIcon,
} from 'react-native-heroicons/solid';

const Kundli = ({navigation}) => {
  const [data, setdata] = useState([]);
  const [userID, setUserID] = useState();

  const CreateKundli = item => {
    navigation.navigate('Your Kundli', {
      name: item.name,
      gender: item.gender,
      kundliId: item.kundliId,
      dob: item.dob,
      tob: item.tob,
      pob: item.pob,
      lat: item.lat,
      lon: item.lon,
    });
  };

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  const getAPIdata = async value => {
    let result = await fetch(
      GLOBAL.BASE_URL + `myKundli&userId=${encodeURIComponent(value)}`,
    );
    result = await result.json();
    setdata(result.response);
    SetLoading(false);
  };
  useEffect(() => {
    SetLoading(true);
    AsyncStorage.getItem('UserID').then(value => {
      setUserID(value);
      getAPIdata(value);
    });
  }, []);

  const [isLoading, SetLoading] = useState(true);

  return (
    <View style={{flex: 1}}>
      <ActivityIndicator
        size={'large'}
        color={'red'}
        animating={isLoading}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '50%',
          zIndex: 1,
        }}
      />
      {isLoading ? <View style={{height: '100%', width: '100%'}}></View> : null}
      {data != null ? (
        <FlatList
          data={data}
          style={{marginTop: 8}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => CreateKundli(item)}
              style={styles.ListBox}>
              <Text
                style={[styles.profile, {backgroundColor: generateColor()}]}>
                {item.name.substring(0, 1)}
              </Text>
              <View style={{flex: 1, marginLeft: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <UserCircleIcon color={Colours.PrimaryColor} size={16} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    flex: 1,
                  }}>
                  <CalendarDaysIcon color={Colours.PrimaryColor} size={16} />
                  <Text style={styles.DOB}>{item.dob},</Text>
                  <Text style={styles.TOB}>{item.tob}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    flex: 1,
                  }}>
                  <MapPinIcon color={Colours.PrimaryColor} size={16} />
                  <Text style={styles.Place}>{item.pob}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{fontSize: 18, alignSelf: 'center', textAlign: 'center'}}>
          No kundli availabe create new Kundli
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Free Kundli');
        }}
        style={styles.createProfileButton}>
        <Text style={styles.createProfileButtonText}>Create New Kundli</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ListBox: {
    backgroundColor: Colours.light,
    shadowOffset: 4,
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '95%',
    alignSelf: 'center',
  },
  profile: {
    fontSize: 20,
    padding: 5,
    borderRadius: 100,
    width: 40,
    height: 40,
    textAlign: 'center',
    color: 'white',
    marginLeft: 3,
    marginRight: 3,
  },
  createProfileButton: {
    backgroundColor: Colours.PrimaryColor,
    borderRadius: 20,
    width: '45%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  createProfileButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Family.Medium,
  },
  DOB: {
    marginLeft: 5,
    fontSize: 12,
    color: Colours.TextGrayColour,
    fontFamily: Family.Regular,
  },
  name: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5,
    color: Colours.TextDarkColour,
    fontFamily: Family.Regular,
  },
  Place: {
    fontSize: 12,
    marginLeft: 5,
    color: Colours.TextGrayColour,
    fontFamily: Family.Regular,
    flex: 1,
  },
  TOB: {
    marginLeft: 10,
    fontSize: 12,
    color: Colours.TextGrayColour,
    fontFamily: Family.Regular,
  },
  gender: {
    marginLeft: 5,
  },
});

export default Kundli;
