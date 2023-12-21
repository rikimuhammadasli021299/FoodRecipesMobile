/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {IconSearch} from '../../assets';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const ListRecipes = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getRecipes();
    }
  }, [isFocused]);

  const getRecipes = async () => {
    try {
      const res = await axios.get(
        'https://crowded-goat-trunks.cyclic.app/recipe?popular=popular',
      );
      setResult(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSearchRecipes = async () => {
    try {
      const res = await axios.get(
        `https://crowded-goat-trunks.cyclic.app/recipe?search=${keyword}`,
      );
      setResult(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <ScrollView style={styles.page}>
      <View style={styles.searchBar}>
        <IconSearch style={styles.iconSearch} />
        <TextInput
          placeholder="Search Pasta, Bread, etc."
          style={styles.inputSearch}
          value={keyword}
          onChangeText={value => setKeyword(value)}
          autoCorrect={true}
          returnKeyType="done"
          onSubmitEditing={getSearchRecipes}
        />
      </View>
      {result?.length > 0 ? (
        result?.map(items => {
          return (
            <View style={styles.wrapperRecipe} key={items.id_recipe}>
              <TouchableOpacity
                style={{display: 'flex', flexDirection: 'row'}}
                onPress={() =>
                  navigation.navigate('ShowComments', {
                    id_recipe: items.id_recipe,
                  })
                }>
                <Image
                  source={{uri: items.photo}}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 10,
                  }}
                />
                <View style={styles.wrapperStatus}>
                  <Text style={styles.textTitle}>{items.title}</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.textStatus}>
                      {items.comments} Comments
                    </Text>
                    <View style={styles.dot} />
                    <Text style={styles.textCategory}>{items.category}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })
      ) : result === undefined ? null : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 28,
          }}>
          <Text
            style={{
              color: '#aeb4bdff',
              fontFamily: 'Poppins Regular',
              fontSize: 23,
            }}>
            Recipes not found
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ListRecipes;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
  },
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
    marginBottom: 30,
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
  wrapperRecipe: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 28,
  },
  wrapperStatus: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginLeft: 11,
  },
  textTitle: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#18172B',
  },
  textStatus: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 12,
    color: '#18172B',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#6E80B0',
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 7,
  },
  textCategory: {
    fontWeight: '900',
    fontSize: 12,
    color: '#6E80B0',
  },
});
