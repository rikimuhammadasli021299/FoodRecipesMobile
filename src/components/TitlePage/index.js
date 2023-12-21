/* eslint-disable prettier/prettier */
import {StyleSheet, Text} from 'react-native';
import React from 'react';

const TitlePage = ({content}) => {
  return <Text style={styles.titlePage}>{content}</Text>;
};

export default TitlePage;

const styles = StyleSheet.create({
  titlePage: {
    color: '#EFC81A',
    fontFamily: 'Poppins Regular',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 40,
  },
});
