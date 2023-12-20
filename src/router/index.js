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
  Comments,
  Auth,
  PopularCheck,
  MainCourse,
  Appetizer,
  Dessert,
  ItalianFood,
} from '../pages';
import {BottomNavigatiors} from '../components';
import {useSelector} from 'react-redux';

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
      <Tab.Screen
        name="Comments"
        component={Comments}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const auth = useSelector(state => state.auth);
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      {auth.data ? (
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      )}

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
      <Stack.Screen
        name="PopularCheck"
        component={PopularCheck}
        options={{
          title: 'Popular Recipes',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins Regular',
            color: '#F1CD31',
          },
        }}
      />
      <Stack.Screen
        name="MainCourse"
        component={MainCourse}
        options={{
          title: 'Main Course',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins Regular',
            color: '#F1CD31',
          },
        }}
      />
      <Stack.Screen
        name="Appetizer"
        component={Appetizer}
        options={{
          title: 'Appetizer',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins Regular',
            color: '#F1CD31',
          },
        }}
      />
      <Stack.Screen
        name="Dessert"
        component={Dessert}
        options={{
          title: 'Dessert',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins Regular',
            color: '#F1CD31',
          },
        }}
      />
      <Stack.Screen
        name="ItalianFood"
        component={ItalianFood}
        options={{
          title: 'Italian Food',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins Regular',
            color: '#F1CD31',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
