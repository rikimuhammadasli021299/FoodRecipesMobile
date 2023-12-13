/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {LineIngredients, ArrowBack, IconBookmark, IconLike} from '../../assets';

const DetailRecipe = ({route, navigation}) => {
  const [dataDetailRecipe, setDataDetailRecipe] = useState();
  const {id_recipe} = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getDetailRecipe();
    }
  }, [isFocused, id_recipe]);

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMywibmFtZSI6InJpa2kgbXVoYW1tYWQgbnVyaGlkYXlhdCIsImVtYWlsIjoicmlraW11aGFtbWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGdBNTAuTzVDSE5VY2RLWWVzaVZOQi5YNWFabEQ0U29EemVHbW13ZjJGWW9rWE5nZzRnY3BpIiwicGhvbmVfbnVtYmVyIjoiMDg3NjU0MzIxIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kemV0ZWYxeDAvaW1hZ2UvdXBsb2FkL3YxNzAwOTA4NDU0L3JlY2lwZXMvbTk5cm5oYTRjbDJsa3pkaHpkamwucG5nIiwiY3JlYXRlZF90aW1lIjoiMjAyMy0xMS0wMVQwOTozOTozMy4yMDZaIiwidXBkYXRlZF90aW1lIjoiMjAyMy0xMS0zMFQwOTowNDoxMy45NzBaIiwibGV2ZWwiOjIsInV1aWQiOiIzMjFjYmEiLCJpc19hY3RpdmUiOnRydWUsIm90cCI6bnVsbCwiaWF0IjoxNzAyNDYxOTI0fQ.aDKg3qLK4T2jr2raMfVNAhNYVAPfZp7sxjxtIvhhqto';

  const getDetailRecipe = async () => {
    try {
      const res = await axios.get(
        `https://bewildered-rose-leggings.cyclic.app/recipe/detail/${id_recipe}`,
        {
          headers: {
            token,
          },
        },
      );
      setDataDetailRecipe(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'light-content'}
        />
        <View style={styles.wrapperImage}>
          {!dataDetailRecipe ? null : (
            <Image
              source={{uri: dataDetailRecipe ? dataDetailRecipe?.photo : null}}
              style={styles.image}
            />
          )}

          <View style={styles.wrapperTittle}>
            <Text style={styles.textTitle}>{dataDetailRecipe?.title}</Text>
            <Text style={styles.textAuthor}>By {dataDetailRecipe?.author}</Text>
          </View>
          <ArrowBack
            style={styles.arrowBack}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.iconBookmark}>
            <IconBookmark />
          </View>
          <IconLike style={styles.iconLike} />
        </View>
        <View style={styles.wrapperIngredients}>
          <View style={styles.wrapperTitleIngredients}>
            <Text style={styles.titleIngredients}>Ingredients</Text>
            <LineIngredients style={styles.lineIngredients} />
          </View>
          <View style={styles.wrapperDetailIngredients}>
            <View style={{padding: 15}}>
              {dataDetailRecipe?.ingredients?.map((items, index) => {
                return (
                  <Text style={styles.textDetailIngredients} key={index + 1}>
                    -{items}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailRecipe;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F8F8F8',
  },
  wrapperImage: {
    display: 'flex',
    position: 'relative',
  },
  wrapperTittle: {
    position: 'absolute',
    bottom: 75,
    width: 245,
    left: 28,
  },
  textTitle: {
    color: '#FBFBFB',
    fontSize: 30,
    lineHeight: 45,
    fontWeight: '700',
  },
  textAuthor: {
    marginTop: 5,
    color: '#B0B0B0',
    fontSize: 13,
    fontWeight: '900',
  },
  arrowBack: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  iconBookmark: {
    display: 'flex',
    position: 'absolute',
    bottom: 75,
    alignItems: 'center',
    justifyContent: 'center',
    right: 80,
    borderRadius: 15,
    width: 36,
    height: 36,
    backgroundColor: '#EFC81A',
  },
  iconLike: {
    position: 'absolute',
    bottom: 75,
    right: 30,
  },
  image: {
    width: '100%',
    height: 450,
    objectFit: 'cover',
  },
  wrapperIngredients: {
    display: 'flex',
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: -50,
    marginBottom: 50,
  },
  wrapperTitleIngredients: {
    display: 'flex',
    width: 91,
    marginTop: 30,
    marginLeft: 28,
  },
  titleIngredients: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#18172B',
  },
  lineIngredients: {
    alignSelf: 'center',
  },
  wrapperDetailIngredients: {
    display: 'flex',
    backgroundColor: '#FAF7ED',
    marginHorizontal: 28,
    marginTop: 20,
  },
  textDetailIngredients: {
    color: '#666',
    fontWeight: '900',
    fontSize: 14,
  },
});
