import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import AutoLogin from './scenes/auth/auto-login';
import Auth from './scenes/auth';
import CreateAccount from './scenes/auth/create-account';
import Home from './scenes/home';
import Search from './scenes/search';
import Add from './scenes/add';
import User from './scenes/user';
import Profile from './scenes/profile';

const AuthStack = createStackNavigator({
  Auth,
  CreateAccount
}, {
  initialRouteName: 'Auth'
});

const AppTabs = createBottomTabNavigator({
  Home,
  Search,
  Add,
  User
});

const TopLevelSwitch = createSwitchNavigator({
  AutoLogin,
  AuthStack,
  AppTabs,
  Profile
}, {
  initialRouteName: 'AutoLogin'
});

export default () => (
  <Provider store={store}>
    <TopLevelSwitch />
  </Provider>
);
