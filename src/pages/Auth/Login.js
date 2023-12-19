/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../../storages/action/auth';
import {
  imgPopular2,
  IconUser,
  Lock,
  LockDark,
  User,
  showPassword,
  hidePassword,
} from '../../assets';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [emailIsActive, setEmailIsActive] = useState(false);
  const [passwordIsActive, setPasswordIsActive] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visiblePassword, setVisiblePassword] = useState(false);

  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const submitLogin = () => {
    dispatch(loginAction(email, password));
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
          <Image source={imgPopular2} style={styles.image} im />
        </View>
        <View style={styles.WrapperTitle}>
          <Text style={styles.title}>Welcome !</Text>
          <Text style={styles.subTitle}>Log in to your existing account</Text>
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
          <View
            style={
              passwordIsActive ? styles.wrapperEmailActive : styles.wrapperEmail
            }
            onPressIn={() => setPasswordIsActive(true)}>
            {passwordIsActive ? <Lock /> : <LockDark />}
            <TextInput
              placeholder="Password"
              secureTextEntry={!visiblePassword}
              style={styles.inputEmail}
              value={password}
              onFocus={() => setPasswordIsActive(true)}
              onBlur={() => setPasswordIsActive(false)}
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={styles.showHidePassword}>
              <Image source={visiblePassword ? hidePassword : showPassword} />
            </TouchableOpacity>
          </View>
          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Passowrd?
          </Text>
          <TouchableOpacity style={styles.wrapperBtn} onPress={submitLogin}>
            <Text style={styles.textBtn}>LOGIN</Text>
            {auth.isLoading ? (
              <ActivityIndicator
                animating={auth.isLoading ? true : false}
                color={'#4d4d4dff'}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.signUp}>
            Don't have an account?{' '}
            <Text
              style={styles.textSignUp}
              onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
  },
  wrapperImage: {
    display: 'flex',
    position: 'relative',
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
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EFC81A',
    elevation: 5,
  },
  wrapperEmail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#F5F5F5',
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
    color: 'black',
  },
  showHidePassword: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 7,
    marginBottom: 30,
    color: '#999',
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  wrapperBtn: {
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    padding: 15,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
  },
  signUp: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Poppins Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  textSignUp: {
    color: '#EFC81A',
  },
});
