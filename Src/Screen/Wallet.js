import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colours from '../Assets/Colours';
import GLOBAL from '../Utilities/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Family from '../Utilities/Family';

const Wallet = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Balance, setBalance] = useState();

  const getAPIdata = async value => {
    let result = await fetch(
      GLOBAL.BASE_URL + `userWallet&userId=${encodeURIComponent(value)}`,
    );
    result = await result.json();
    setBalance(result.balance);
    setData(result.trans);
  };
  useEffect(async () => {
    await AsyncStorage.getItem('UserID').then(value => {
      getAPIdata(value);
    });
  }, []);

  const TransectionList = ({item}) => (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        borderColor: Colours.GrayColor,
        borderWidth: 1,
        width: '92%',
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        paddingVertical: 8,
        alignSelf: 'center',
      }}>
      <View style={{marginLeft: 15}}>
        <Text
          style={{
            fontSize: 15,
            color: Colours.TextDarkColour,
            fontFamily: Family.Medium,
          }}>
          {item.remark}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.TimeAndDate}>{item.date},</Text>
        </View>
        <Text style={styles.TimeAndDate}>{item.tnx}</Text>
      </View>
      <Text
        style={{
          marginLeft: 'auto',
          fontSize: 18,
          fontFamily: Family.SemiBold,
          marginRight: 10,
          alignSelf: 'flex-end',
          color: item.type == 'credit' ? 'green' : 'red',
        }}>
        {item.type == 'credit' ? '+' : '- '} ₹ {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: Colours.Background}}>
      <View
        style={{
          backgroundColor: Colours.light,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 15,
          width: '92%',
          alignSelf: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            padding: 5,
            fontFamily: Family.Medium,
            color: Colours.TextGrayColour,
          }}>
          Available Balance
        </Text>
        <Text
          style={{
            padding: 5,
            fontFamily: Family.SemiBold,
            color: Colours.PrimaryColor,
            fontSize: 36,
          }}>
          ₹ {Balance}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add money to wallet', {
              Amount: 0,
            });
          }}
          style={styles.RechargeButton}>
          <Text
            style={{
              fontFamily: Family.Medium,
              color: Colours.light,
              textAlign: 'center',
            }}>
            Recharge
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <FlatList data={Data} renderItem={TransectionList} />
      </ScrollView>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  AvailableText: {
    fontSize: 18,
    margin: 5,
    marginLeft: 15,
    color: Colours.TextDarkColour,
  },
  AmountText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 15,
  },
  RechargeButton: {
    backgroundColor: Colours.PrimaryColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '35%',
    alignSelf: 'flex-start',
  },
  RechargeButtonText: {
    color: 'white',
  },
  NavigaionButton: {
    borderColor: 'gray',
    marginHorizontal: 23,
    borderWidth: 1,
    margin: 10,
    borderRadius: 50,
    padding: 10,
    paddingVertical: 5,
    width: 150,
    alignItems: 'center',
  },
  TimeAndDate: {
    fontSize: 10,
    color: Colours.TextDarkColour,
    fontFamily: Family.Regular,
  },
});
