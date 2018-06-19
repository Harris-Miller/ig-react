import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../common-styles';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="person" size={30} color={tintColor} />
);

export default class User extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'User',
    tabBarIcon: TabBarIcon
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>User</Text>
      </View>
    );
  }
}
