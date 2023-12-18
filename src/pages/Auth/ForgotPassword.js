/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {IconForgotPassword, User, IconUser} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {getOTPAction} from '../../storages/action/auth';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState();
  const [emailIsActive, setEmailIsActive] = useState(false);
  const dispatch = useDispatch();
  const authGetOTP = useSelector(state => state.authGetOTP);

  const submit = () => {
    dispatch(getOTPAction(email, navigation));
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'dark-content'}
        />
        <View style={styles.wrapperImage}>
          <IconForgotPassword />
        </View>
        <View style={styles.WrapperTitle}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subTitle}>
            We just need your registered e-mail addres to send your password
            reset
          </Text>
        </View>
        <View style={styles.wrapperForm}>
          <TouchableOpacity
            style={
              emailIsActive ? styles.wrapperEmailActive : styles.wrapperEmail
            }>
            {emailIsActive ? <IconUser /> : <User />}
            <TextInput
              placeholder="examplexxx@gmail.com"
              value={email}
              style={styles.inputEmail}
              onFocus={() => setEmailIsActive(true)}
              onBlur={() => setEmailIsActive(false)}
              onChangeText={value => setEmail(value)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
        <Text style={styles.textBtn}>Reset Password</Text>
        {authGetOTP.isLoading ? (
          <ActivityIndicator
            animating={authGetOTP.isLoading ? true : false}
            color={'#4d4d4dff'}
          />
        ) : null}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F5F5F5',
    display: 'flex',
    position: 'relative',
  },
  wrapperImage: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    marginTop: 80,
  },
  image: {
    width: '100%',
    height: 275,
    objectFit: 'cover',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  WrapperTitle: {
    display: 'flex',
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 20,
    color: '#EFC81A',
  },
  subTitle: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#C4C4C4',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  wrapperForm: {
    display: 'flex',
    marginBottom: 50,
    marginHorizontal: 15,
  },
  wrapperEmailActive: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EFC81A',
  },
  wrapperEmail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  inputEmail: {
    marginTop: 3,
    marginLeft: 5,
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    width: '100%',
    backgroundColor: '#FFF',
    color: 'black',
  },
  wrapperBtn: {
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 155,
    marginBottom: 30,
  },
  textBtn: {
    padding: 15,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
  },
});
