/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {User, UserActive} from '../../assets';
import {putPofile} from '../../storages/action/profile';

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

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const editProfile = useSelector(state => state.editProfile);
  const isFocused = useIsFocused();
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [selectedImage, setSelectedImage] = useState('');
  const [nameIsActive, setNameIsActive] = useState(false);
  const [dataProfile, setDataProfile] = useState();

  let token = auth?.data?.token?.accessToken;
  let id_user = auth?.data?.uuid;

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

  const getDetailProfile = async () => {
    try {
      const res = await axios.get(
        `https://ruby-long-kingfisher.cyclic.app/users/${id_user}`,
        {
          headers: {
            token,
          },
        },
      );
      setDataProfile(res.data.result);
      setPhoto(res?.data?.result?.photo);
      setName(res?.data?.result?.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getDetailProfile();
    }
  }, [isFocused, id_user]);

  const submit = () => {
    let bodyData = new FormData();
    bodyData.append('photo', photo);
    bodyData.append('name', name);

    dispatch(putPofile(id_user, bodyData, navigation));
  };

  return (
    <ScrollView>
      <View style={styles.page} contentInsetAdjustmentBehavior="automatic">
        {photo ? (
          <Image source={{uri: selectedImage || photo}} style={styles.image} />
        ) : null}
        <TouchableOpacity onPress={openGallery}>
          <Text style={styles.text}>Change photo profile</Text>
        </TouchableOpacity>
        <View
          style={
            nameIsActive
              ? styles.wrapperTextInputActive
              : styles.wrapperTextInput
          }>
          {nameIsActive ? (
            <UserActive style={styles.iconUser} />
          ) : (
            <User style={styles.iconUser} />
          )}
          <TextInput
            placeholder="myname"
            style={styles.textInput}
            value={name}
            onChangeText={value => setName(value)}
            onFocus={() => setNameIsActive(true)}
            onBlur={() => setNameIsActive(false)}
          />
        </View>
        <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
          <Text style={styles.textBtn}>Update</Text>
          {editProfile.isLoading && (
            <ActivityIndicator
              animating={editProfile.isLoading ? true : false}
              color={'#4d4d4dff'}
            />
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    marginTop: 100,
    borderRadius: 100,
  },
  text: {
    marginTop: 15,
    fontSize: 15,
    textAlign: 'center',
    color: '#aeb4bdff',
    fontFamily: 'Poppins Regular',
  },
  wrapperTextInput: {
    backgroundColor: '#fff',
    marginHorizontal: 28,
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  wrapperTextInputActive: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EFC81A',
    backgroundColor: '#fff',
    marginHorizontal: 28,
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  iconUser: {
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    color: 'black',
    paddingLeft: 10,
    fontFamily: 'Poppins Regular',
    marginTop: 5,
  },
  wrapperBtn: {
    marginTop: 125,
    width: 150,
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    marginBottom: 75,
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
