/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
  LineIngredients,
  ArrowBack,
  IconBookmark,
  IconMyBookmark,
  IconMyLike,
  IconMyUnliked,
} from '../../assets';
import {AlertConfirmation} from '../../components';
import {useSelector} from 'react-redux';

const DetailRecipe = ({route, navigation}) => {
  const [dataDetailRecipe, setDataDetailRecipe] = useState();
  const [savedRecipes, setSavedRecipes] = useState();
  const [likedRecipes, setLikedRecipes] = useState();
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const {id_recipe} = route.params;
  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (isFocused) {
      getDetailRecipe();
      getMySavedRecipes();
      getMyLikedRecipes();
    }
  }, [isFocused, id_recipe]);

  let token = auth?.data?.token?.accessToken;

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
      setDataDetailRecipe(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMySavedRecipes = async () => {
    try {
      const res = await axios.get(
        'https://bewildered-rose-leggings.cyclic.app/event/bookmarked',
        {
          headers: {
            token,
          },
        },
      );
      setSavedRecipes(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMyLikedRecipes = async () => {
    try {
      const res = await axios.get(
        'https://bewildered-rose-leggings.cyclic.app/event/liked',
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

  const checkBookmarked = () => {
    savedRecipes?.data?.map(items => {
      if (id_recipe === items.id_recipe) {
        bookmarked ? null : setBookmarked(true);
      }
      return false;
    });
  };

  const checkLiked = () => {
    likedRecipes?.data?.map(items => {
      if (id_recipe === items.id_recipe) {
        return liked ? null : setLiked(true);
      }
      return false;
    });
  };

  const idBookmark = savedRecipes?.data
    ?.map(items => {
      if (id_recipe === items.id_recipe) {
        return items.id;
      }
    })
    .filter(id => typeof id === 'number');

  const idLiked = likedRecipes?.data
    ?.map(items => {
      if (id_recipe === items.id_recipe) {
        return items.id;
      }
    })
    .filter(id => typeof id === 'number');

  const deleteBookmarked = () => {
    console.log('delete bookmark', idBookmark[0]);
    AlertConfirmation({
      alertTitle: 'Confirmation',
      alertMsg: 'Are you sure want to unbookmark this recipes?',
      action: async function () {
        try {
          const res = await axios.delete(
            `https://bewildered-rose-leggings.cyclic.app/event/bookmark/${idBookmark[0]}`,
            {
              headers: {
                token,
              },
            },
          );
          bookmarked ? setBookmarked(false) : setBookmarked(true);
          getDetailRecipe();
          getMySavedRecipes();
          checkBookmarked();
          console.log(res.data.message);
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const postBookmarked = () => {
    console.log('add bookmark');
    let data = {
      recipes_id: id_recipe,
      status: 'bookmark',
    };
    AlertConfirmation({
      alertTitle: 'Confirmation',
      alertMsg: 'Are you sure want to bookmark this recipes?',
      action: async function () {
        try {
          const res = await axios.post(
            'https://bewildered-rose-leggings.cyclic.app/event',
            data,
            {
              headers: {
                token,
                'content-type': 'application/x-www-form-urlencoded',
              },
            },
          );
          setBookmarked(true);
          getDetailRecipe();
          getMySavedRecipes();
          checkBookmarked();
          console.log(res.data.message);
        } catch (error) {
          console.log(error.message);
        }
      },
    });
  };

  const postLiked = () => {
    console.log('add like');
    let data = {
      recipes_id: id_recipe,
      status: 'like',
    };
    AlertConfirmation({
      alertTitle: 'Confirmation',
      alertMsg: 'Are you sure want to like this recipes?',
      action: async function () {
        try {
          const res = await axios.post(
            'https://bewildered-rose-leggings.cyclic.app/event',
            data,
            {
              headers: {
                token,
                'content-type': 'application/x-www-form-urlencoded',
              },
            },
          );
          setLiked(true);
          getDetailRecipe();
          getMyLikedRecipes();
          checkLiked();
          console.log(res.data.message);
        } catch (error) {
          console.log(error.message);
        }
      },
    });
  };

  const deleteLiked = () => {
    console.log('delete like', idLiked[0]);
    AlertConfirmation({
      alertTitle: 'Confirmation',
      alertMsg: 'Are you sure want to unlike this recipes?',
      action: async function () {
        try {
          const res = await axios.delete(
            `https://bewildered-rose-leggings.cyclic.app/event/like/${idLiked[0]}`,
            {
              headers: {
                token,
              },
            },
          );
          liked ? setLiked(false) : setLiked(true);
          getDetailRecipe();
          getMyLikedRecipes();
          checkLiked();
          console.log(res.data.message);
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  dataDetailRecipe?.data ? checkBookmarked() : null;
  dataDetailRecipe?.data ? checkLiked() : null;

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
              source={{
                uri: dataDetailRecipe?.data
                  ? dataDetailRecipe?.data?.photo
                  : null,
              }}
              style={styles.image}
            />
          )}

          <View style={styles.wrapperTittle}>
            <Text style={styles.textTitle}>
              {dataDetailRecipe?.data?.title}
            </Text>
            <Text style={styles.textAuthor}>
              By {dataDetailRecipe?.data?.author}
            </Text>
          </View>
          <ArrowBack
            style={styles.arrowBack}
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity
            onPress={bookmarked ? deleteBookmarked : postBookmarked}>
            <View style={styles.iconBookmark(bookmarked)}>
              {bookmarked ? <IconBookmark /> : <IconMyBookmark />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={liked ? deleteLiked : postLiked}>
            <View style={styles.iconLiked(liked)}>
              {liked ? <IconMyUnliked /> : <IconMyLike />}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperIngredients}>
          <View style={styles.wrapperTitleIngredients}>
            <Text style={styles.titleIngredients}>Ingredients</Text>
            <LineIngredients style={styles.lineIngredients} />
          </View>
          <View style={styles.wrapperDetailIngredients}>
            <View style={{padding: 15}}>
              {dataDetailRecipe?.data?.ingredients?.map((items, index) => {
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
  iconBookmark: bookmarked => ({
    display: 'flex',
    position: 'absolute',
    bottom: 75,
    alignItems: 'center',
    justifyContent: 'center',
    right: 80,
    borderRadius: 16,
    width: 36,
    height: 36,
    backgroundColor: bookmarked ? '#EFC81A' : '#FFFFFF',
  }),
  iconLiked: liked => ({
    display: 'flex',
    position: 'absolute',
    bottom: 75,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    borderRadius: 16,
    width: 36,
    height: 36,
    backgroundColor: liked ? '#EFC81A' : '#FFFFFF',
  }),
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
