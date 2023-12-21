/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BookOpen} from '../../assets';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {TitlePage} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AlertUploadPhoto from '../../components/AlertConfirmation/AlertUploadPhoto';
import AlertFailed from '../../components/AlertConfirmation/AlertFailed';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWitdh: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
  storageOptions: {
    path: 'image',
  },
};
const PostRecipes = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [category, setCategory] = useState();
  const [open, setOpen] = useState(false);
  const [idCategory, setIdCategory] = useState(null);
  const [itemsCategory, setItemsCategory] = useState([{label: '', value: ''}]);
  const [title, setTitle] = useState();
  const [titleIsAcitve, setTitleIsAcitve] = useState(false);
  const [ingredients, setIngredients] = useState();
  const [ingredientsIsActive, setIngredientsIsActive] = useState(false);
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    getCategory();
    if (isFocused) {
      setPhoto('');
      setSelectedImage('');
    }
  }, [isFocused]);

  let token = auth?.data?.token?.accessToken;

  const getCategory = async () => {
    try {
      const res = await axios.get(
        'https://crowded-goat-trunks.cyclic.app/category',
        {
          headers: {
            token,
          },
        },
      );
      setCategory(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getListCategory = () => {
    let data = category.map(items => {
      return {label: items.name, value: items.id_category};
    });
    setItemsCategory(data);
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App Needs Camera Access',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('access camera success');
        cameraLaunch();
      } else {
        console.log('access camera failed');
        console.log(PermissionsAndroid.RESULTS.GRANTED);
      }
    } catch (err) {
      console.log('err');
      console.log(err);
    }
  };

  const cameraLaunch = () => {
    launchCamera(options, res => {
      console.log('respons camera ', res);
      if (res.didCancel) {
        console.log('user cancel camera');
      } else if (res.error) {
        console.log('camera error', res.errorMessage);
      } else {
        console.log('camera success');
        console.log(res);
        setSelectedImage(res.assets[0].uri);
        setPhoto({
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          fileName: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
    });
  };

  const galleryLaunch = () => {
    launchImageLibrary(options, res => {
      console.log('respons gallery ', res);
      if (res.didCancel) {
        console.log('user cancel gallery');
      } else if (res.error) {
        console.log('gallery error', res.errorMessage);
      } else {
        console.log('gallery success');
        console.log(res);
        setSelectedImage(res.assets[0].uri);
        setPhoto({
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          fileName: res.assets[0].fileName,
          type: res.assets[0].type,
        });
      }
    });
  };

  const submit = async () => {
    setIsLoading(true);
    if (!title) {
      AlertFailed('Failed', 'Title is required');
      setIsLoading(false);
      return false;
    }
    if (!ingredients) {
      AlertFailed('Failed', 'Ingredients is required');
      setIsLoading(false);
      return false;
    }

    let bodyData = new FormData();
    bodyData.append('title', title);
    bodyData.append('ingredients', ingredients);
    bodyData.append('photo', photo);
    bodyData.append('id_category', idCategory);
    try {
      const res = await axios.post(
        'https://crowded-goat-trunks.cyclic.app/recipe',
        bodyData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setIsLoading(false);
      navigation.navigate('MyRecipes');
      setTitle('');
      setIngredients('');
      setPhoto('');
      setIdCategory('');
      setSelectedImage('');
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
      AlertFailed(
        'Failed',
        error.response.data.messsage || error.response.data.message,
      );
      setIsLoading(false);
    }
  };
  return (
    <>
      <ScrollView style={styles.page} nestedScrollEnabled={true}>
        <View style={styles.page} contentInsetAdjustmentBehavior="automatic">
          <TitlePage content={'Add Your Recipe'} />
          <View
            style={
              titleIsAcitve
                ? styles.inputTitleRecipeActive
                : styles.inputTitleRecipe
            }>
            <BookOpen style={styles.iconBook} />
            <TextInput
              style={styles.inputForm}
              placeholder="Title"
              value={title}
              onChangeText={value => setTitle(value)}
              onFocus={() => setTitleIsAcitve(true)}
              onBlur={() => setTitleIsAcitve(false)}
            />
          </View>
          <View
            style={
              ingredientsIsActive
                ? styles.wrapperIngredientsActive
                : styles.wrapperIngredients
            }>
            <TextInput
              multiline={true}
              numberOfLines={13}
              placeholder="Ingredients"
              value={ingredients}
              style={styles.inputIngredients}
              onChangeText={value => setIngredients(value)}
              onFocus={() => setIngredientsIsActive(true)}
              onBlur={() => setIngredientsIsActive(false)}
            />
          </View>
          {selectedImage ? (
            <View style={styles.wrapperIngredients}>
              <Image style={styles.image} source={{uri: selectedImage}} />
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.wrapperIngredients}
            onPress={() =>
              AlertUploadPhoto({
                alertTitle: 'Add photo',
                alertMsg: 'Where will you add the photo?',
                camera: requestPermission,
                gallery: galleryLaunch,
              })
            }>
            <Text style={styles.addPhoto}>Add Photo</Text>
          </TouchableOpacity>
          <View style={styles.dropDown}>
            <DropDownPicker
              open={open}
              value={idCategory}
              items={itemsCategory}
              setOpen={setOpen}
              setValue={setIdCategory}
              setItems={setItemsCategory}
              listMode="SCROLLVIEW"
              onPress={getListCategory}
              placeholder="Category"
            />
          </View>
          <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
            <Text style={styles.textBtn}>POST</Text>
            {isLoading ? (
              <ActivityIndicator
                animating={isLoading ? true : false}
                color={'#4d4d4dff'}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default PostRecipes;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputTitleRecipe: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitleRecipeActive: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFC81A',
    elevation: 5,
  },
  wrapperIngredients: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
  },
  wrapperIngredientsActive: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFC81A',
    elevation: 5,
  },
  iconBook: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  inputForm: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginLeft: 5,
    color: 'black',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
  },
  inputIngredients: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginLeft: 5,
    color: 'black',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
    textAlignVertical: 'top',
  },
  addPhoto: {
    padding: 13,
    color: '#6e6767ff',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  },
  dropDown: {
    marginHorizontal: 28,
    marginTop: 15,
  },
  wrapperBtn: {
    marginHorizontal: 115,
    marginTop: 25,
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    marginBottom: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textBtn: {
    padding: 10,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins Regular',
  },
});
