/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BookOpen} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {TitlePage} from '../../components';
import {useIsFocused} from '@react-navigation/native';

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
  const [ingredients, setIngredients] = useState();
  const [photo, setPhoto] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    getCategory();
    if (isFocused) {
      setPhoto('');
      setSelectedImage('');
    }
  }, [isFocused]);

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMywibmFtZSI6InJpa2kgbXVoYW1tYWQgbnVyaGlkYXlhdCIsImVtYWlsIjoicmlraW11aGFtbWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGdBNTAuTzVDSE5VY2RLWWVzaVZOQi5YNWFabEQ0U29EemVHbW13ZjJGWW9rWE5nZzRnY3BpIiwicGhvbmVfbnVtYmVyIjoiMDg3NjU0MzIxIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kemV0ZWYxeDAvaW1hZ2UvdXBsb2FkL3YxNzAwOTA4NDU0L3JlY2lwZXMvbTk5cm5oYTRjbDJsa3pkaHpkamwucG5nIiwiY3JlYXRlZF90aW1lIjoiMjAyMy0xMS0wMVQwOTozOTozMy4yMDZaIiwidXBkYXRlZF90aW1lIjoiMjAyMy0xMS0zMFQwOTowNDoxMy45NzBaIiwibGV2ZWwiOjIsInV1aWQiOiIzMjFjYmEiLCJpc19hY3RpdmUiOnRydWUsIm90cCI6bnVsbCwiaWF0IjoxNzAyNDYxOTI0fQ.aDKg3qLK4T2jr2raMfVNAhNYVAPfZp7sxjxtIvhhqto';

  const getCategory = async () => {
    try {
      const res = await axios.get(
        'https://bewildered-rose-leggings.cyclic.app/category',
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

  const openGallery = async () => {
    const image = await launchImageLibrary(options);
    setSelectedImage(image.assets[0].uri);
    setPhoto({
      uri: image.assets[0].uri,
      name: image.assets[0].fileName,
      fileName: image.assets[0].fileName,
      type: image.assets[0].type,
    });
  };

  const submit = async () => {
    let bodyData = new FormData();
    bodyData.append('title', title);
    bodyData.append('ingredients', ingredients);
    bodyData.append('photo', photo);
    bodyData.append('id_category', idCategory);
    try {
      const res = await axios.post(
        'https://bewildered-rose-leggings.cyclic.app/recipe',
        bodyData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      navigation.navigate('MyRecipes');
      setTitle('');
      setIngredients('');
      setPhoto('');
      setIdCategory('');
      setSelectedImage('');
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response.data.messsage || error.response.data.message);
    }
  };
  return (
    <>
      <ScrollView style={styles.page} nestedScrollEnabled={true}>
        <View style={styles.page} contentInsetAdjustmentBehavior="automatic">
          <TitlePage content={'Add Your Recipe'} />
          <View style={styles.inputTitleRecipe}>
            <BookOpen style={styles.iconBook} />
            <TextInput
              style={styles.inputForm}
              placeholder="Title"
              value={title}
              onChangeText={value => setTitle(value)}
            />
          </View>
          <View style={styles.wrapperIngredients}>
            <TextInput
              multiline={true}
              numberOfLines={13}
              placeholder="Ingredients"
              value={ingredients}
              style={styles.inputIngredients}
              onChangeText={value => setIngredients(value)}
            />
          </View>
          {selectedImage ? (
            <View style={styles.wrapperIngredients}>
              <Image style={styles.image} source={{uri: selectedImage}} />
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.wrapperIngredients}
            onPress={openGallery}>
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
          <View style={styles.wrapperBtn}>
            <Text style={styles.textBtn} onPress={submit}>
              POST
            </Text>
          </View>
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
  wrapperIngredients: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 10,
  },
  iconBook: {
    alignSelf: 'center',
    marginLeft: 50,
  },
  inputForm: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginLeft: 5,
    color: '#B6B6B6',
    fontWeight: '900',
    fontFamily: 'Poppins-Black',
  },
  inputIngredients: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginLeft: 5,
    color: '#B6B6B6',
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
  },
  textBtn: {
    padding: 10,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins Regular',
  },
});
