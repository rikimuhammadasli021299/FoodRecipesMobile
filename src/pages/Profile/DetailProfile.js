/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {
  IconUser,
  IconMyRecipes,
  IconMyLike,
  IconMyBookmark,
  ArrowGo,
} from '../../assets';

const DetailProfile = ({navigation}) => {
  const [dataProfile, setDataProfile] = useState();
  const isFocused = useIsFocused();
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMywibmFtZSI6InJpa2kgbXVoYW1tYWQgbnVyaGlkYXlhdCIsImVtYWlsIjoicmlraW11aGFtbWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGdBNTAuTzVDSE5VY2RLWWVzaVZOQi5YNWFabEQ0U29EemVHbW13ZjJGWW9rWE5nZzRnY3BpIiwicGhvbmVfbnVtYmVyIjoiMDg3NjU0MzIxIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kemV0ZWYxeDAvaW1hZ2UvdXBsb2FkL3YxNzAwOTA4NDU0L3JlY2lwZXMvbTk5cm5oYTRjbDJsa3pkaHpkamwucG5nIiwiY3JlYXRlZF90aW1lIjoiMjAyMy0xMS0wMVQwOTozOTozMy4yMDZaIiwidXBkYXRlZF90aW1lIjoiMjAyMy0xMS0zMFQwOTowNDoxMy45NzBaIiwibGV2ZWwiOjIsInV1aWQiOiIzMjFjYmEiLCJpc19hY3RpdmUiOnRydWUsIm90cCI6bnVsbCwiaWF0IjoxNzAyNDYxOTI0fQ.aDKg3qLK4T2jr2raMfVNAhNYVAPfZp7sxjxtIvhhqto';
  let id_user = '321cba';

  const getDetailProfile = async () => {
    try {
      const res = await axios.get(
        `https://bewildered-rose-leggings.cyclic.app/users/${id_user}`,
        {
          headers: {
            token,
          },
        },
      );
      setDataProfile(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getDetailProfile();
    }
  }, [isFocused, id_user]);
  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.wrapperImage}>
          {!dataProfile ? null : (
            <Image source={{uri: dataProfile?.photo}} style={styles.image} />
          )}
          <Text style={styles.textName}>{dataProfile?.name}</Text>
        </View>
        <View style={styles.wrapperTab}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('EditProfile')}>
            <IconUser />
            <Text style={styles.tabTitle}>Edit Profile</Text>
            <ArrowGo style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('MyRecipes')}>
            <IconMyRecipes />
            <Text style={styles.tabTitle}>My Recipe</Text>
            <ArrowGo style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('SavedRecipes')}>
            <IconMyBookmark />
            <Text style={styles.tabTitle}>Saved Recipe</Text>
            <ArrowGo style={styles.arrowGo} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('LikedRecipes')}>
            <IconMyLike />
            <Text style={styles.tabLiked}>Liked Recipe</Text>
            <ArrowGo style={styles.arrowGo} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
  },
  wrapperImage: {
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEC302',
  },
  textName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  image: {
    width: 84,
    height: 84,
    objectFit: 'cover',
    borderRadius: 70,
  },
  wrapperTab: {
    display: 'flex',
    backgroundColor: '#FFF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 20,
    marginHorizontal: 7,
    marginTop: -40,
    height: 400,
    elevation: 3,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 20,
    position: 'relative',
  },
  tabTitle: {
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 15,
    fontWeight: '500',
    color: '#4d4d4dff',
  },
  tabLiked: {
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    marginTop: 3,
    marginLeft: 19,
    fontWeight: '500',
    color: '#4d4d4dff',
  },
  arrowGo: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
});
