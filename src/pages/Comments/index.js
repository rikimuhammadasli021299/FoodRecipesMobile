/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListRecipes from './ListRecipes';

const Stack = createNativeStackNavigator();

const Comments = () => {
  return (
    <Stack.Navigator initialRouteName="ListRecipes">
      <Stack.Screen
        name="ListRecipes"
        component={ListRecipes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Comments;
