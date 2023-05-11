import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colours from '../Assets/Colours';
import Family from '../Utilities/Family';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Global from '../Utilities/Global';

const Blog = ({navigation, route}) => {
  const blogId = route.params.blogId;
  const [Data, setData] = useState();
  const [isLoading, SetLoading] = useState(true);

  const getBlogData = async () => {
    let result = await fetch(
      Global.BASE_URL + 'blogDetail&blogId=' + route.params.blogId,
    );
    result = await result.json();
    setData(result.response);
    SetLoading(true);
  };

  useEffect(() => {
    SetLoading(true);
    getBlogData();
  }, []);

  return (
    <View>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="chevron-back-outline" size={25} color="white" />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.headerText}>
            {Data && Data.title}
          </Text>
        </View>
        <ScrollView>
          <View>
            <Image style={styles.image} source={{uri: Data && Data.photo}} />
            <Text
              style={{
                lineHeight: 20,
                color: 'black',
                fontSize: 16,
                marginHorizontal: 10,
                marginBottom: 5,
                marginTop: 10,
                fontFamily: Family.Medium,
                color: Colours.PrimaryColor,
              }}>
              {Data && Data.title}
            </Text>
          </View>
          <Text
            style={{
              color: Colours.TextDarkColour,
              marginLeft: 10,
              fontFamily: Family.Regular,
            }}>
            Posted by {Data && Data.postBy}
          </Text>
          <Text
            style={{
              lineHeight: 20,
              color: 'black',
              fontSize: 12,
              color: Colours.TextDarkColour,
              marginLeft: 10,
              marginTop: 20,
              fontFamily: Family.Regular,
            }}>
            {Data && Data.content}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Blog;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: Colours.PrimaryColor,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 14,
    color: 'white',
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
    marginRight: 5,
  },
  image: {
    width: '100%',
    height: 170,
  },
});
