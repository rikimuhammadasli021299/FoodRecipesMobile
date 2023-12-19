/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailProfile from './DetailProfile';
import EditProfile from './EditProfile';
import MyRecipes from './MyRecipes';
import SavedRecipes from './SavedRecipes';
import LikedRecipes from './LikedRecipes';
import EditRecipe from '../AddRecipes/EditRecipe';

const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="DetailProfile">
      <Stack.Screen
        name="DetailProfile"
        component={DetailProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyRecipes"
        component={MyRecipes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SavedRecipes"
        component={SavedRecipes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LikedRecipes"
        component={LikedRecipes}
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

export default Profile;
