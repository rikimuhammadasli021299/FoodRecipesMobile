/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TitlePage, AlertConfirmation} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {IconUser, IconMyUnliked} from '../../assets';
import {useSelector} from 'react-redux';

const LikedRecipes = ({navigation}) => {
  const [likedRecipes, setLikedRecipes] = useState();
  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (isFocused) {
      getMyLikedRecipes();
    }
  }, [isFocused]);

  let token = auth?.data?.token?.accessToken;

  const getMyLikedRecipes = async () => {
    try {
      const res = await axios.get(
        'https://crowded-goat-trunks.cyclic.app/event/liked?limit=100',
        {
          headers: {
            token,
          },
        },
      );
      setLikedRecipes(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        <TitlePage content={'Liked Recipes'} />
      </View>
      {likedRecipes?.data?.length > 0 ? (
        likedRecipes?.data?.map(items => {
          return (
            <View style={styles.container} key={items.id_recipe}>
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
                <View style={styles.bookmark}>
                  <IconMyUnliked
                    onPress={() =>
                      AlertConfirmation({
                        alertTitle: 'Confirmation',
                        alertMsg:
                          'Are you sure want to remove this recipe from your liked recipes?',
                        action: async function () {
                          try {
                            const res = await axios.delete(
                              `https://crowded-goat-trunks.cyclic.app/event/like/${items.id}`,
                              {
                                headers: {
                                  token,
                                },
                              },
                            );
                            getMyLikedRecipes();
                            console.log(res.data.message);
                          } catch (error) {
                            console.log(error.message);
                          }
                        },
                      })
                    }
                  />
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
            No recipes liked yet
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LikedRecipes;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginBottom: 30,
    padding: 10,
    borderRadius: 16,
    elevation: 5,
  },
  image: {
    width: 80,
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
    maxWidth: 165,
  },
  action: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  bookmark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: '#EFC81A',
  },
});
