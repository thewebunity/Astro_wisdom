import React, {useState, useEffect} from 'react';
const UserAuthContext = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../Utilities/Global';

const UserAuthContextProvider = ({children}) => {
  const [User, setUser] = useState('');
  const [Balance, setBalance] = useState('');
  const [CSModal, setModal] = useState(false);
  const [FilterValue, setFilterValue] = useState(null);
  const [Userurl, setUserurl] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    AsyncStorage.getItem('UserID').then(value => {
      setUser(value);
      getAstrolgerdata();
    });
  }

  const getAstrolgerdata = async () => {
    let result = await fetch(Global.BASE_URL + 'homeScreen&userId=' + User);
    result = await result.json();
    console.log('Modal', CSModal);
    // setModal(!Modal);
    setBalance(result.wallet);
  };

  const Modalstate = url => {
    setModal(!CSModal);
    setUserurl(url);
  };

  const ChatFilter = value => {
    setFilterValue(value);
  };

  return (
    <UserAuthContext.Provider
      value={{
        Balance,
        User,
        getAstrolgerdata,
        CSModal,
        Userurl,
        Modalstate,
        ChatFilter,
        FilterValue,
        getUser,
      }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export {UserAuthContext, UserAuthContextProvider};
