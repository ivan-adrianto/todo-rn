import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import BottomNavigator from '../components/BottomNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';
import AddTask from '../pages/AddTask';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const options = {
  headerStyle: {
    backgroundColor: '#1DD1A1',
    height: 71,
  },
  headerTitleAlign: 'center',
  headerLeft: null,
  headerShown: false
};

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={props => <BottomNavigator {...props} />}
      backBehavior="history">
      <Tab.Screen name="home" component={Home} options={{...options}} />
      <Tab.Screen name="tasks" component={Home} options={{...options}} />
      <Tab.Screen name="add-task" component={AddTask} options={{...options, tabBarVisible: false}} />
      <Tab.Screen name="signal" component={Home} options={{...options}} />
      <Tab.Screen name="profile" component={Home} options={{...options}} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  if (!isLoggedIn) {
    return (
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen
          name="register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
