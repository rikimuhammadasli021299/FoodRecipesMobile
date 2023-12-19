/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  User,
  UserActive,
  MessageCircle,
  MessageCircleActive,
  Home,
  HomeActive,
  PlusSquare,
  PlusSquareActive,
} from '../../../assets';

const TabItems = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <HomeActive /> : <Home />;
    }
    if (label === 'AddRecipes') {
      return isFocused ? <PlusSquareActive /> : <PlusSquare />;
    }

    if (label === 'Comments') {
      return isFocused ? <MessageCircleActive /> : <MessageCircle />;
    }
    if (label === 'Profile') {
      return isFocused ? <UserActive /> : <User />;
    }

    return <HomeActive />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.wrapperLabel(label, isFocused)}>
        <Icon />
        <Text style={styles.text(isFocused, label)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabItems;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapperLabel: (label, isFocused) => ({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 10,
    backgroundColor: isFocused
      ? null
      : '#f6f5fcff' && label === 'Home'
      ? '#f6f5fcff'
      : null,
  }),
  text: (isFocused, label) => ({
    fontSize: 12,
    color: isFocused ? '#EFC81A' : '#666666',
    display: isFocused ? 'none' : 'flex' && label === 'Home' ? 'flex' : 'none',
    alignSelf: 'center',
    marginLeft: 9,
  }),
});
