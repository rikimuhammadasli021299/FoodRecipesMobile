/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  IconForgotPassword,
  IconUser,
  User,
  Lock,
  LockDark,
  hidePassword,
  showPassword,
  UnlockDark,
  Unlock,
} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {resetPasswordAction} from '../../storages/action/auth';
import AlertFailed from '../../components/AlertConfirmation/AlertFailed';

const ResetPassword = ({navigation}) => {
  const [otp, setOtp] = useState();
  const [otpIsActive, setOtpIsActive] = useState(false);
  const [password, setPassword] = useState();
  const [passwordIsActive, setPasswordIsActive] = useState();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordIsActive, setConfirmPasswordIsActive] = useState();
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const authResetPassword = useSelector(state => state.authResetPassword);

  const toggleShowPassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const toggleShowConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  const submit = () => {
    console.log('type of', typeof otp);
    if (password === confirmPassword) {
      return dispatch(resetPasswordAction(otp, password, navigation));
    } else {
      AlertFailed('Reset Password Failed', 'Password is mismatch');
      console.log('Password is mismatch');
    }
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
        <View style={styles.wrapperForm}>
          <TouchableOpacity
            style={
              otpIsActive ? styles.wrapperEmailActive : styles.wrapperEmail
            }>
            {otpIsActive ? <IconUser /> : <User />}
            <TextInput
              placeholder="Code OTP"
              value={otp}
              style={styles.inputEmail}
              onFocus={() => setOtpIsActive(true)}
              onBlur={() => setOtpIsActive(false)}
              onChangeText={value => setOtp(value)}
            />
          </TouchableOpacity>
          <View
            style={
              passwordIsActive ? styles.wrapperEmailActive : styles.wrapperEmail
            }
            onPressIn={() => setPasswordIsActive(true)}>
            {passwordIsActive ? <Lock /> : <LockDark />}
            <TextInput
              placeholder="Create new password"
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
          <View
            style={
              confirmPasswordIsActive
                ? styles.wrapperEmailActive
                : styles.wrapperEmail
            }
            onPressIn={() => setConfirmPasswordIsActive(true)}>
            {confirmPasswordIsActive ? <Unlock /> : <UnlockDark />}
            <TextInput
              placeholder="New password"
              secureTextEntry={!visibleConfirmPassword}
              style={styles.inputEmail}
              value={confirmPassword}
              onFocus={() => setConfirmPasswordIsActive(true)}
              onBlur={() => setConfirmPasswordIsActive(false)}
              onChangeText={value => setConfirmPassword(value)}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              style={styles.showHidePassword}>
              <Image
                source={visibleConfirmPassword ? hidePassword : showPassword}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
        <Text style={styles.textBtn}>Reset Password</Text>
        {authResetPassword.isLoading ? (
          <ActivityIndicator
            animating={authResetPassword.isLoading ? true : false}
            color={'#4d4d4dff'}
          />
        ) : null}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResetPassword;

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
    elevation: 5,
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
  showHidePassword: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 10,
  },
  wrapperBtn: {
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 105,
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
