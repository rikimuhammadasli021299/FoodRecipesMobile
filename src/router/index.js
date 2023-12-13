/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  AddRecipes,
  Profile,
  Splash,
  DetailRecipe,
  SearchRecipes,
  Chat,
} from '../pages';
import {BottomNavigatiors} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigatiors {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="AddRecipes"
        component={AddRecipes}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailRecipe"
        component={DetailRecipe}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchRecipes"
        component={SearchRecipes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
