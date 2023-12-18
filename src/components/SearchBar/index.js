/* eslint-disable prettier/prettier */
import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';

import {IconSearch} from '../../assets';

const SearchBar = ({navigation: navigate}) => {
  return (
    <View style={styles.searchBar}>
      <IconSearch style={styles.iconSearch} />
      <TextInput
        placeholder="Search Pasta, Bread, etc."
        style={styles.inputSearch}
        onPressIn={() => navigate('SearchRecipes')}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#EFEFEF',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    overflow: 'hidden',
    padding: 5,
    marginHorizontal: 28,
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    alignSelf: 'center',
    marginLeft: 30,
  },
  inputSearch: {
    backgroundColor: '#EFEFEF',
    width: '100%',
    marginLeft: 5,
    color: 'black',
    fontWeight: '900',
  },
});
