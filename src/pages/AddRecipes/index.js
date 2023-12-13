/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyRecipes from '../Profile/MyRecipes';
import PostRecipes from './PostRecipes';
import EditRecipe from './EditRecipe';

const Stack = createNativeStackNavigator();

const AddRecipes = () => {
  return (
    <Stack.Navigator initialRouteName="PostRecipes">
      <Stack.Screen
        name="PostRecipes"
        component={PostRecipes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyRecipes"
        component={MyRecipes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditRecipe"
        component={EditRecipe}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AddRecipes;
