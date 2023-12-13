import {StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <Router />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
