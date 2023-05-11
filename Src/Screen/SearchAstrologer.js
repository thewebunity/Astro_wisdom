import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Global from '../Utilities/Global';
import Colours from '../Assets/Colours';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Verified from 'react-native-vector-icons/dist/Octicons';

const SearchAstrologer = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState('');
  const handleSearch = async text => {
    setSearch(text);
    if (text.length > 2) {
      const response = await fetch(Global.BASE_URL + `search&search=${text}`);
      const data = await response.json();
      setData(data.response);
    } else {
      setData([]);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fafafa',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}>
        <TextInput
          placeholder="Search...."
          style={{
            width: '80%',
            flex: 1,
            fontFamily: 'Poppins-Regular',
            color: Colours.black,
          }}
          placeholderTextColor={Colours.black}
          onChangeText={text => handleSearch(text)}
          autoFocus={true}
        />
        <Text
          style={{fontSize: 18, color: Colours.black}}
          onPress={() => navigation.goBack()}>
          {' '}
          X
        </Text>
      </View>
      {Search.length < 1 ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                color: Colours.black,
              }}>
              No User Found
            </Text>
          </View>
        </View>
      ) : null}

      <FlatList
        data={Data}
        style={{marginTop:10}}
        renderItem={({item}) => {
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
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Icon
                    name="star"
                    size={10}
                    color={item.rating >= 1 ? '#FFB300' : 'gray'}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color={item.rating >= 2 ? '#FFB300' : 'gray'}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color={item.rating >= 3 ? '#FFB300' : 'gray'}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color={item.rating >= 4 ? '#FFB300' : 'gray'}
                  />
                  <Icon
                    name="star"
                    size={10}
                    color={item.rating >= 5 ? '#FFB300' : 'gray'}
                  />
                </View>
              </View>
              <View style={{marginLeft: 30}}>
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
                <Text style={{fontSize: 10, color: Colours.TextGrayColour}}>
                  {item.expertise}
                </Text>
                <Text style={{fontSize: 10, color: Colours.TextGrayColour}}>
                  {item.language}
                </Text>
                <Text style={{fontSize: 10, color: Colours.TextGrayColour}}>
                  Expirence {item.expirence} Years
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchAstrologer;
