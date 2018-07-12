import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../common-styles';

class Search extends React.Component {
  static navigationOptions = {
    title: 'Search'
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Coming Soon!</Text>
      </View>
    );
  }
}

const SearchStack = createStackNavigator({
  Search
}, {
  initialRouteName: 'Search'
});

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="search" size={30} color={tintColor} />
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: TabBarIcon
};

export default SearchStack;
