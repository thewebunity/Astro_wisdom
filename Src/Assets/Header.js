import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Colours from '../Assets/Colours';
import Family from '../Utilities/Family';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Search from 'react-native-vector-icons/dist/Ionicons';
import {UserAuthContext} from '../context/UserAuthContext';
const Header = ({navigation, name}) => {
  const {User, getAstrolgerdata} = useContext(UserAuthContext);
  useEffect(() => {
    getAstrolgerdata(User);
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{name}</Text>
        <TouchableOpacity
          onPressIn={() => navigation.navigate('SearchAstrologer')}
          style={[styles.headerWallet]}>
          <Text
            style={{
              color: Colours.TextDarkColour,
              fontSize: 16,
              fontFamily: Family.Medium,
            }}>
            <Search
              name="search-outline"
              size={23}
              color={Colours.PrimaryColor}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Wallet');
          }}
          style={styles.headerIcons}>
          <Text
            style={{
              color: Colours.TextDarkColour,
              fontSize: 14,
              fontFamily: Family.Medium,
            }}>
            <Entypo name="wallet" size={20} color={Colours.PrimaryColor} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Create Profile')}
          style={styles.headerIcons}>
          <Icon name="user-o" size={18} color={Colours.PrimaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: Colours.light,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 16,
    color: Colours.PrimaryColor,
    marginLeft: 15,
    fontFamily: Family.Medium,
  },
  headerIcons: {
    marginRight: 12,
  },
  headerWallet: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 8,
  },
});
