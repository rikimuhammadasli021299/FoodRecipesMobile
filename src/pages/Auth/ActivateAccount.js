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
import {IconForgotPassword, IconUser, User} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {activateAccountAction} from '../../storages/action/auth';
import AlertFailed from '../../components/AlertConfirmation/AlertFailed';

const ActivateAccount = ({navigation}) => {
  const [otp, setOtp] = useState();
  const [otpIsActive, setOtpIsActive] = useState(false);
  const dispatch = useDispatch();
  const authRegister = useSelector(state => state.authRegister);
  const authActivateAccount = useSelector(state => state.authActivateAccount);

  const submit = () => {
    console.log('type of', typeof otp);
    if (otp === '' || !otp) {
      AlertFailed('Code OTP is required');
    } else {
      return dispatch(
        activateAccountAction(authRegister.data.uuid, otp, navigation),
      );
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
        <View style={styles.WrapperTitle}>
          <Text style={styles.title}>Activate Account</Text>
          <Text style={styles.subTitle}>
            Please check your email to get yor code activation
          </Text>
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
        </View>
      </View>
      <TouchableOpacity style={styles.wrapperBtn} onPress={submit}>
        <Text style={styles.textBtn}>Activate Email</Text>
        {authActivateAccount.isLoading ? (
          <ActivityIndicator
            animating={authActivateAccount.isLoading ? true : false}
            color={'#4d4d4dff'}
          />
        ) : null}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ActivateAccount;

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
