import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feed from './feed';

const HomeStack = createStackNavigator({
  Feed
}, {
  initialRouteName: 'Feed'
});

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="home" size={30} color={tintColor} />
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: TabBarIcon
};

export default HomeStack;
