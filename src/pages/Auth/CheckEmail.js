/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {IconForgotPassword} from '../../assets';
import React from 'react';

const CheckEmail = ({navigation}) => {
  const handleCheckEmail = () => {
    Linking.openURL('https://gmail.app.goo.gl');
    navigation.navigate('ResetPassword');
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
          <Text style={styles.subTitle}>
            Request for reset password send in your email
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.wrapperBtn}>
        <Text style={styles.textBtn} onPress={handleCheckEmail}>
          Check Your Email
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckEmail;

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
  subTitle: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 15,
    color: '#46505C',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  wrapperBtn: {
    backgroundColor: '#EFC81A',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 295,
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
