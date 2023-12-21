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
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {User, UserActive} from '../../assets';
import {putPofile} from '../../storages/action/profile';
import AlertUploadPhoto from '../../components/AlertConfirmation/AlertUploadPhoto';

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

  const getDetailProfile = async () => {
    try {
      const res = await axios.get(
        `https://crowded-goat-trunks.cyclic.app/users/${id_user}`,
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
        <TouchableOpacity
          onPress={() =>
            AlertUploadPhoto({
              alertTitle: 'Add photo',
              alertMsg: 'Where will you add the photo?',
              camera: requestPermission,
              gallery: galleryLaunch,
            })
          }>
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
