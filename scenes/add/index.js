import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../common-styles';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="add-box" size={30} color={tintColor} />
);

export default class Add extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: TabBarIcon
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Add</Text>
      </View>
    );
  }
}
