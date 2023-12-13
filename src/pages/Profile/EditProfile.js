/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EditProfile = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Cooming Soon!</Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 23,
    textAlign: 'center',
    color: '#aeb4bdff',
    fontFamily: 'Poppins Regular',
  },
});
