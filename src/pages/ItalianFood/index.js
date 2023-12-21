/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {IconUser, IconMyUnliked, IconBookmark} from '../../assets';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const ItalianFood = ({navigation}) => {
  const isFocused = useIsFocused();
  const [dataItalianFood, setDataItalianFood] = useState();

  const getItalianFood = async () => {
    try {
      const res = await axios.get(
        'https://crowded-goat-trunks.cyclic.app/recipe?category=11',
      );
      setDataItalianFood(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getItalianFood();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        {dataItalianFood?.length > 0 ? (
          dataItalianFood.map((items, index) => {
            return (
              <View style={styles.container} key={index + 1}>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  onPress={() =>
                    navigation.navigate('DetailRecipe', {
                      id_recipe: items.id_recipe,
                    })
                  }>
                  <Image source={{uri: items.photo}} style={styles.image} />
                  <View style={styles.titleRecipe}>
                    <Text style={styles.textTitle}>{items.title}</Text>
                    <Text style={styles.textCategory}>{items.category}</Text>
                    <View style={styles.wrapperAuthor}>
                      <IconUser />
                      <Text style={styles.textAuthor}>{items.author}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.action}>
                  <View style={styles.like}>
                    <Text style={styles.countLike}>{items.liked}</Text>
                    <IconMyUnliked />
                  </View>
                  <View style={styles.bookmark}>
                    <Text style={styles.countBookmark}>{items.bookmark}</Text>
                    <IconBookmark style={{marginTop: 2}} />
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 28,
            }}>
            <Text
              style={{
                color: '#aeb4bdff',
                fontFamily: 'Poppins Regular',
                fontSize: 23,
              }}>
              No recipes yet
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ItalianFood;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginTop: 30,
    padding: 10,
    borderRadius: 16,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 90,
    borderRadius: 16,
    objectFit: 'cover',
  },
  titleRecipe: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 5,
    marginLeft: 15,
    maxWidth: 200,
  },
  textTitle: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#18172B',
  },
  textCategory: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 14,
    color: '#18172B',
  },
  wrapperAuthor: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  textAuthor: {
    alignSelf: 'flex-end',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '900',
    color: '#6E80B0',
    maxWidth: 100,
  },
  action: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  bookmark: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#EFC81A',
  },
  like: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#EFC81A',
    gap: 5,
  },
  countLike: {
    marginTop: 11,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    color: 'white',
  },
  countBookmark: {
    marginTop: 11,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    color: 'white',
  },
});
