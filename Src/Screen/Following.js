import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Global from '../Utilities/Global';
import Colours from '../Assets/Colours';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Verified from 'react-native-vector-icons/dist/Octicons';
import Header from '../Assets/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Family from '../Utilities/Family';

const Following = ({navigation}) => {
  const [Data, setData] = useState();

  const GetFollowingData = async value => {
    const response = await fetch(
      Global.BASE_URL + `myFollowing&userId=${value}`,
    );
    const data = await response.json();
    setData(data.response);
    console.log(data.response);
  };

  useEffect(() => {
    AsyncStorage.getItem('UserID').then(value => {
      console.log(value);
      GetFollowingData(value);
    });
  }, []);

  const FollowingList = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Profile', {
          AstrologerId: item.astrologerId,
        });
      }}
      style={{
        backgroundColor: 'white',
        marginVertical: 2,
        borderColor: '#DDDCDC',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 5,
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
      <View style={{marginLeft: 30}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: Family.SemiBold,
              fontSize: 16,
              marginRight: 5,
              color: Colours.TextGrayColour,
            }}>
            {item.profileName}
          </Text>
          <Verified
            name="verified"
            size={20}
            color="green"
            style={{marginTop: 4}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Header navigation={navigation} name={'Following'} />
      <ScrollView>
        <FlatList data={Data} renderItem={FollowingList} />
      </ScrollView>
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({});
