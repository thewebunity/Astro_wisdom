import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Colours from '../Assets/Colours';
import {UserAuthContext} from '../context/UserAuthContext';
import Global from '../Utilities/Global';
import Family from '../Utilities/Family';

const AddMoney = ({navigation, route}) => {
  const {User, Balance} = useContext(UserAuthContext);

  const [Amount, setAmount] = useState();

  const AddAmountGridData = [
    {key: 'A', Amount: 50, Discount: null},
    {key: 'B', Amount: 100, Discount: null},
    {key: 'C', Amount: 200, Discount: null},
    {key: 'D', Amount: 500, Discount: 200},
    {key: 'E', Amount: 1000, Discount: 600},
  ];

  useEffect(() => {
    setAmount(route.params.Amount);
  }, []);

  const AmountSet = amount => {
    setAmount(parseInt(Amount + amount));
  };
  const RenderGrid = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => AmountSet(item.Amount)}
        style={styles.GridBox}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginTop: 5,
            fontFamily: Family.Medium,
          }}>
          ₹ {item.Amount}
        </Text>
        {item.Discount != null && (
          <Text
            style={{
              color: 'green',
              backgroundColor: Colours.GrayColor,
              width: '100%',
              textAlign: 'center',
              marginBottom: -8,
              marginTop: 10,
            }}>
            {item.Discount}% Extra
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: Colours.light,
          width: '92%',
          alignSelf: 'center',
          paddingHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family.Medium,
            color: Colours.TextGrayColour,
            padding: 5,
          }}>
          Available Balance
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontFamily: Family.SemiBold,
            color: Colours.PrimaryColor,
            padding: 5,
            marginLeft: 5,
          }}>
          ₹ {Balance}
        </Text>
        <View
          style={{
            width: '95%',
            borderWidth: 1,
            borderColor: Colours.TextGrayColour,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: 10,
            borderRightWidth: 0,
          }}>
          <TextInput
            placeholder="Enter Amount"
            keyboardType="number-pad"
            value={Amount}
            onChangeText={text => setAmount(text)}
            placeholderTextColor={Colours.TextGrayColour}
            style={{
              color: Colours.TextDarkColour,
              paddingHorizontal: 10,
              fontFamily: Family.Medium,
              flex: 1,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colours.PrimaryColor,
              paddingHorizontal: 25,
              alignItems: 'center',
              borderRadius: 10,
              flexDirection: 'row',
            }}
            onPress={() =>
              navigation.navigate('Payment', {
                amount: Amount,
              })
            }>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Family.Medium,
                color: Colours.light,
              }}>
              Add Money
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colours.light,
          width: '92%',
          alignSelf: 'center',
          paddingHorizontal: 10,
          marginVertical: 10,
          borderRadius: 10,
          paddingVertical: 15,
        }}>
        <FlatList
          data={AddAmountGridData}
          renderItem={RenderGrid}
          numColumns={3}
          keyExtractor={item => '_' + item.key}
        />
      </View>
    </View>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  AmountText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  AvailableText: {
    fontSize: 18,
    margin: 5,
    marginLeft: 15,
    color: Colours.TextDarkColour,
  },
  AmountinputBox: {
    flexDirection: 'row',
    borderColor: Colours.GrayColor,
    borderWidth: 2,
    margin: 5,
    borderRadius: 10,
    paddingLeft: 5,
  },
  addmoneyButton: {
    backgroundColor: Colours.PrimaryColor,
    marginLeft: 'auto',
    padding: 10,
    margin: 3,
    borderRadius: 10,
  },
  addmoneyButtonText: {
    color: 'white',
  },
  GridBox: {
    borderRadius: 8,
    borderColor: Colours.GrayColor,
    borderWidth: 1,
    width: '30%',
    height: 80,
    alignItems: 'center',
    margin: 5,
    justifyContent: 'center',
  },
});
