import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../common-styles';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="search" size={30} color={tintColor} />
);

export default class Search extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: TabBarIcon
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Search</Text>
      </View>
    );
  }
}
