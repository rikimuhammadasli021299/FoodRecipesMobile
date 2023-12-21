/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getComments} from '../../storages/action/comments';
import {IconSend} from '../../assets';
import {postCommentAction} from '../../storages/action/comments';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const ShowComments = ({route}) => {
  const [dataDetailRecipe, setDataDetailRecipe] = useState();
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {id_recipe} = route.params;
  const auth = useSelector(state => state.auth);
  const showComments = useSelector(state => state.showComments);

  let token = auth?.data?.token?.accessToken;

  const getDetailRecipe = async () => {
    try {
      const res = await axios.get(
        `https://crowded-goat-trunks.cyclic.app/recipe/detail/${id_recipe}`,
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

  useEffect(() => {
    if (isFocused) {
      getDetailRecipe();
      dispatch(getComments(id_recipe));
    }
  }, [isFocused, id_recipe]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  const submit = () => {
    dispatch(postCommentAction(id_recipe, comment));
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.page(dimensions)}>
        <Text style={styles.text}>{dataDetailRecipe?.data?.title}</Text>
        {dataDetailRecipe?.data?.photo && (
          <Image
            source={{uri: dataDetailRecipe?.data?.photo}}
            style={styles.image}
          />
        )}
        <Text style={styles.textComments}>Comments</Text>
        <View style={styles.wrapperComments}>
          {showComments?.data?.data.length > 0 ? (
            showComments?.data?.data.map(items => {
              return (
                <View style={styles.cardComment} key={items.id_comment}>
                  <Image source={{uri: items.photo}} style={styles.imgUser} />
                  <Text style={styles.textUsername}>{items.commenter}</Text>
                  <Text style={styles.textComment}>{items.commentar}</Text>
                  <Text style={styles.date}>
                    {items.created_at.split('T')[0]}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.textNoComments}>No Comments</Text>
          )}
        </View>
      </View>
      <View style={styles.wrapperPostComments(dimensions)}>
        <View style={styles.wrapperInputComments}>
          <TextInput
            style={styles.inputComments}
            value={comment}
            placeholder="Comments"
            onChangeText={value => setComment(value)}
          />
        </View>
        <TouchableOpacity style={styles.wrapperIconSend} onPress={submit}>
          <IconSend style={styles.iconSend} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ShowComments;

const styles = StyleSheet.create({
  page: dimensions => ({
    display: 'flex',
    backgroundColor: '#fff',
    marginBottom: 30,
    minHeight: (dimensions.window.height * 100) / 100,
  }),
  text: {
    fontFamily: 'Poppins Regular',
    fontSize: 21,
    textAlign: 'center',
    marginTop: 15,
  },
  image: {
    width: 300,
    height: 200,
    objectFit: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
  },
  textComments: {
    fontFamily: 'Poppins Regular',
    fontSize: 17,
    marginTop: 10,
    marginLeft: 15,
  },
  wrapperComments: {
    display: 'flex',
    marginHorizontal: 15,
    marginTop: 10,
    paddingTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFC81A',
    borderRadius: 10,
    marginBottom: 70,
  },
  cardComment: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
    marginBottom: 20,
  },
  imgUser: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 100,
  },
  textUsername: {
    alignSelf: 'center',
    fontFamily: 'Poppins Regular',
    color: 'black',
    marginLeft: 7,
    fontSize: 11,
    width: '30%',
    paddingRight: 7,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  textComment: {
    alignSelf: 'center',
    fontFamily: 'Poppins Regular',
    fontSize: 11,
    marginLeft: 7,
    paddingLeft: 7,
    width: '30%',
    color: 'black',
  },
  date: {
    fontFamily: 'Poppins Regular',
    fontSize: 11,
    color: 'black',
    marginLeft: 15,
    alignSelf: 'center',
    width: '20%',
  },
  textNoComments: {
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    fontSize: 17,
    marginBottom: 20,
  },
  wrapperPostComments: dimensions => ({
    display: 'flex',
    flexDirection: 'row',
    minWidth: (dimensions.screen.width * 100) / 100,
    position: 'absolute',
    bottom: 10,
    justifyContent: 'space-evenly',
  }),
  wrapperInputComments: {
    width: '80%',
  },
  wrapperIconSend: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    width: 45,
    height: 45,
    backgroundColor: '#EEEEEE',
    position: 'relative',
  },
  inputComments: {
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EFC81A',
    width: '100%',
    backgroundColor: '#EEEEEE',
    color: 'black',
  },
  iconSend: {
    position: 'absolute',
    left: 7,
  },
});
