import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import './firebase';
import store from './store';
import Loading from './scenes/loading';
import Auth from './scenes/auth';
import CreateAccount from './scenes/auth/create-account';
import CreateProfile from './scenes/auth/create-profile';
import Home from './scenes/home';
import Feed from './scenes/feed';

const AuthStack = createStackNavigator({
  Auth,
  CreateAccount,
  CreateProfile
}, {
  initialRouteName: 'Auth'
});

const AppTabs = createBottomTabNavigator({
  Home,
  Feed
});

const TopLevelSwitch = createSwitchNavigator({
  Loading,
  AuthStack,
  AppTabs
}, {
  initialRouteName: 'Loading'
});

export default () => (
  <Provider store={store}>
    <TopLevelSwitch />
  </Provider>
);