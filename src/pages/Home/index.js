/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  logoDessert,
  IconSearch,
  logoMainCourse,
  logoAppetizer,
  italianFoods,
} from '../../assets';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {OneSignal} from 'react-native-onesignal';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const [popularRecipes, setPopularRecipes] = useState();
  const [popularForYou, setPopularForYou] = useState();
  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);
  let id_user = auth?.data?.uuid;
  let email_user = auth?.data?.email;

  const getPopularRecipes = async () => {
    try {
      const res = await axios.get(
        'https://crowded-goat-trunks.cyclic.app/recipe?popular=popular',
      );
      setPopularRecipes(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPopularForYou = async () => {
    try {
      const res = await axios.get(
        'https://crowded-goat-trunks.cyclic.app/recipe',
      );
      setPopularForYou(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getPopularRecipes();
      getPopularForYou();
    }
  }, [isFocused]);

  useEffect(() => {
    OneSignal.User.addTag('userID', id_user);
    OneSignal.User.addEmail(email_user);
  }, [id_user]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{backgroundColor: '#FCFCFC'}}>
      <View style={styles.page}>
        <View style={styles.searchBar}>
          <IconSearch style={styles.iconSearch} />
          <TextInput
            placeholder="Search Pasta, Bread, etc."
            style={styles.inputSearch}
            onPressIn={() => navigation.navigate('SearchRecipes')}
          />
        </View>
        <Text style={styles.textPopular}>Popular Recipes</Text>
        <Text
          style={styles.textPopularCheck}
          onPress={() => navigation.navigate('PopularCheck')}>
          Popular Check
        </Text>
        <View style={styles.cardPopular}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={popularRecipes}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    key={item.id_recipe}
                    onPress={() =>
                      navigation.navigate('DetailRecipe', {
                        id_recipe: item.id_recipe,
                      })
                    }>
                    <ImageBackground
                      source={{uri: item.photo}}
                      style={styles.imgPopular}
                      imageStyle={{borderRadius: 10}}>
                      <Text style={styles.titlePopularRecipes}>
                        {item.title}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
        <View style={styles.newRecipesTitle}>
          <Text style={styles.newRecipes}>New Recipes</Text>
          <Text
            style={styles.moreInfo}
            onPress={() => navigation.navigate('NewRecipes')}>
            More Info
          </Text>
        </View>
        <View style={styles.wrapperNewRecipes}>
          <TouchableOpacity
            style={{display: 'flex'}}
            onPress={() => navigation.navigate('MainCourse')}>
            <Image
              source={logoMainCourse}
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
            <Text style={styles.textNewRecipes}>Main Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{display: 'flex'}}
            onPress={() => navigation.navigate('Appetizer')}>
            <Image
              source={logoAppetizer}
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
            <Text style={styles.textNewRecipes}>Appetizer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{display: 'flex'}}
            onPress={() => navigation.navigate('Dessert')}>
            <Image
              source={logoDessert}
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
            <Text style={styles.textNewRecipes}>Dessert</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{display: 'flex'}}
            onPress={() => navigation.navigate('ItalianFood')}>
            <Image
              source={italianFoods}
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: 10,
                alignSelf: 'center',
              }}
            />
            <Text style={styles.textNewRecipes}>Italian Food</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textPopular}>Latest Recipes</Text>
        <View style={styles.cardPopular}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <FlatList
              data={popularForYou}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    key={item.id_recipe}
                    onPress={() =>
                      navigation.navigate('DetailRecipe', {
                        id_recipe: item.id_recipe,
                      })
                    }>
                    <View style={styles.wrapperImgPopularForYou}>
                      <Image
                        source={{uri: item.photo}}
                        style={styles.imgPopularForYou}
                      />
                      <View style={styles.titlePopularForYou}>
                        <Text style={styles.textPopularForYou}>
                          {item.title}
                        </Text>
                        <Text
                          style={styles.ingredients}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          {item.ingredients.join(',')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FCFCFC',
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 35,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    alignSelf: 'center',
    marginLeft: 30,
  },
  inputSearch: {
    backgroundColor: '#EFEFEF',
    width: '100%',
    marginLeft: 5,
    color: '#B6B6B6',
    fontWeight: '900',
  },
  textPopular: {
    marginTop: 30,
    marginHorizontal: 28,
    fontWeight: '500',
    fontSize: 21,
    color: '#3F3A3A',
    fontFamily: 'Poppins Regular',
  },
  textPopularCheck: {
    marginHorizontal: 28,
    fontFamily: 'Poppins Regular',
    fontWeight: '900',
    fontSize: 16,
    color: '#666',
  },
  cardPopular: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  imgPopular: {
    display: 'flex',
    width: 250,
    height: 150,
    marginLeft: 28,
    justifyContent: 'flex-end',
    objectFit: 'cover',
  },
  titlePopularRecipes: {
    color: '#FBFBFB',
    paddingBottom: 10,
    marginLeft: 10,
    width: 90,
    fontSize: 16,
    fontWeight: '700',
  },
  newRecipesTitle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 28,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  newRecipes: {
    fontWeight: '500',
    fontSize: 21,
    color: '#3F3A3A',
    fontFamily: 'Poppins Regular',
  },
  moreInfo: {
    fontWeight: '500',
    color: '#6D61F2',
    alignSelf: 'center',
    fontFamily: 'Poppins Regular',
  },
  wrapperNewRecipes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 28,
    marginTop: 10,
    paddingVertical: 10,
  },
  textNewRecipes: {
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    color: '#18172B',
  },
  wrapperImgPopularForYou: {
    display: 'flex',
    width: 190,
    height: 150,
    marginLeft: 28,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    objectFit: 'cover',
    marginBottom: 15,
    elevation: 5,
    position: 'relative',
    borderRadius: 6,
  },
  imgPopularForYou: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  titlePopularForYou: {
    display: 'flex',
    height: '35%',
    width: '100%',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    position: 'absolute',
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  textPopularForYou: {
    marginHorizontal: 10,
    fontWeight: '900',
    color: '#3F3A3A',
    fontFamily: 'Poppins Regular',
  },
  ingredients: {
    marginHorizontal: 10,
    fontWeight: '900',
    color: '#3F3A3A',
    fontSize: 10,
    fontFamily: 'Poppins Regular',
  },
});
