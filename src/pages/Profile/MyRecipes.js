/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {TitlePage, AlertConfirmation} from '../../components';
import {useIsFocused} from '@react-navigation/native';

const MyRecipes = ({navigation}) => {
  const [recipes, setRecipes] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMyRecipes();
    }
  }, [isFocused]);

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMywibmFtZSI6InJpa2kgbXVoYW1tYWQgbnVyaGlkYXlhdCIsImVtYWlsIjoicmlraW11aGFtbWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGdBNTAuTzVDSE5VY2RLWWVzaVZOQi5YNWFabEQ0U29EemVHbW13ZjJGWW9rWE5nZzRnY3BpIiwicGhvbmVfbnVtYmVyIjoiMDg3NjU0MzIxIiwicGhvdG8iOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kemV0ZWYxeDAvaW1hZ2UvdXBsb2FkL3YxNzAwOTA4NDU0L3JlY2lwZXMvbTk5cm5oYTRjbDJsa3pkaHpkamwucG5nIiwiY3JlYXRlZF90aW1lIjoiMjAyMy0xMS0wMVQwOTozOTozMy4yMDZaIiwidXBkYXRlZF90aW1lIjoiMjAyMy0xMS0zMFQwOTowNDoxMy45NzBaIiwibGV2ZWwiOjIsInV1aWQiOiIzMjFjYmEiLCJpc19hY3RpdmUiOnRydWUsIm90cCI6bnVsbCwiaWF0IjoxNzAyNDYxOTI0fQ.aDKg3qLK4T2jr2raMfVNAhNYVAPfZp7sxjxtIvhhqto';

  const getMyRecipes = async () => {
    try {
      const res = await axios.get(
        'https://bewildered-rose-leggings.cyclic.app/recipe/show/myrecipes',
        {
          headers: {
            token,
          },
        },
      );
      setRecipes(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.page}>
        <TitlePage content={'My Recipes'} />
      </View>
      {recipes?.data?.map(items => {
        return (
          <View style={styles.container} key={items.id_recipe}>
            <TouchableOpacity
              style={{display: 'flex', flexDirection: 'row'}}
              onPress={() =>
                navigation.navigate('DetailRecipe', {
                  id_recipe: items.id_recipe,
                })
              }>
              <Image source={{uri: items.photo}} style={styles.image} />
              <View style={styles.titleRecipe}>
                <Text style={styles.textTitle}>{items.title}</Text>
                <Text style={styles.textCategory}>{items.category}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.action}>
              <Text
                style={styles.textEdit}
                onPress={() =>
                  navigation.navigate('EditRecipe', {
                    id_recipe: items.id_recipe,
                  })
                }>
                Edit
              </Text>
              <Text
                style={styles.textDelete}
                onPress={() =>
                  AlertConfirmation({
                    alertTitle: 'Confirmation',
                    alertMsg: 'Are you sure want to delete this recipe?',
                    action: async function () {
                      try {
                        const res = await axios.delete(
                          `https://bewildered-rose-leggings.cyclic.app/recipe/${items.id_recipe}`,
                          {
                            headers: {
                              token,
                            },
                          },
                        );
                        getMyRecipes();
                        console.log(res.data.message);
                      } catch (error) {
                        console.log(error.message);
                      }
                    },
                  })
                }>
                Delete
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MyRecipes;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginBottom: 30,
    padding: 10,
    borderRadius: 16,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    objectFit: 'cover',
  },
  titleRecipe: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 5,
    marginLeft: 15,
    maxWidth: 180,
  },
  textTitle: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#18172B',
    overflow: 'hidden',
  },
  textCategory: {
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 14,
    color: '#18172B',
  },
  action: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
  },
  textEdit: {
    width: 60,
    height: 30,
    backgroundColor: '#30C0F3',
    borderRadius: 6,
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
    paddingTop: 3,
  },
  textDelete: {
    width: 60,
    height: 30,
    backgroundColor: '#F57E71',
    borderRadius: 6,
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
    paddingTop: 3,
  },
});
