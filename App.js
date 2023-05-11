import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Src/Screen/Login';
import Splash from './Src/Screen/Splash';
import Otp from './Src/Screen/Otp';
import Profile from './Src/Screen/Profile';
import CreateProfile from './Src/Screen/CreateProfile';
import BottomNavigationbar from './Src/Assets/BottomNavigationbar';
import Test from './Src/Screen/Test';
import Wallet from './Src/Screen/Wallet';
import AddMoney from './Src/Screen/AddMoney';
import FreeKundli from './Src/Screen/FreeKundli';
import Kundli from './Src/Screen/Kundli';
import KundliDetails from './Src/Screen/KundliDetails';
import ChatIntakeForm from './Src/Screen/ChatIntakeForm';
import Chat from './Src/Screen/Chat';
import Accept from './Src/Screen/Accept';
import Blog from './Src/Screen/Blog';
import Review from './Src/Screen/Review';
import {UserAuthContextProvider} from './Src/context/UserAuthContext';
import SearchAstrologer from './Src/Screen/SearchAstrologer';
import BlogList from './Src/Screen/MyAccountScreens/BlogList';
import ChatWithAstrologer from './Src/Screen/MyAccountScreens/ChatWithAstrologer';
import HelpSupport from './Src/Screen/MyAccountScreens/HelpSupport';
import OrderHistory from './Src/Screen/MyAccountScreens/OrderHistory';
import Family from './Src/Utilities/Family';
import VoiceCall from './Src/Screen/VoiceCall';
import CallAccept from './Src/Screen/CallAccept';
import Payment from './Src/Screen/Payment';
import VoiceIntakeForm from './Src/Screen/VoiceIntakeForm';
import Success from './Src/Screen/Success';
import Error from './Src/Screen/Error';
import ViewChat from './Src/Screen/ViewChat';

const Stack = createNativeStackNavigator();
const App = () => {
  const requestPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  };
  useEffect(() => {
    requestPermission();
  }, []);

  const granted = PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.RECORD_AUDIO,
  );
  granted
    .then(data => {
      if (!data) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ];
        PermissionsAndroid.requestMultiple(permissions);
      }
    })
    .catch(err => {
      console.log(err.toString());
    });

  return (
    <UserAuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontFamily: Family.Medium,
              fontSize: 16,
            },
          }}
          initialRouteName={'Splash'}>
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen
            name="Blog"
            component={Blog}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchAstrologer"
            component={SearchAstrologer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Success"
            component={Success}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Error"
            component={Error}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ViewChat" component={ViewChat} />
          <Stack.Screen name="Chat Intake Form" component={ChatIntakeForm} />
          <Stack.Screen
            name="Chats"
            component={Chat}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Blogs" component={BlogList} />
          <Stack.Screen
            name="Chat With Astrologer"
            component={ChatWithAstrologer}
          />
          <Stack.Screen name="Help & Support" component={HelpSupport} />
          <Stack.Screen name="Order History" component={OrderHistory} />
          <Stack.Screen name="Your Kundli" component={KundliDetails} />
          <Stack.Screen name="Kundli" component={Kundli} />
          <Stack.Screen
            name="Accept"
            component={Accept}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Add money to wallet" component={AddMoney} />
          <Stack.Screen name="Free Kundli" component={FreeKundli} />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="VoiceIntakeForm" component={VoiceIntakeForm} />
          <Stack.Screen
            name="BottomNavigationBar"
            component={BottomNavigationbar}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CallAccept"
            component={CallAccept}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Create Profile"
            component={CreateProfile}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="Review" component={Review} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Verify Phone"
            component={Otp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VoiceCall"
            component={VoiceCall}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserAuthContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
