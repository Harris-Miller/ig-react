import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import commonStyles from '../../common-styles';

class Profile extends Component {
  navigationOptions = {
    tabBarLabel: 'Profile',
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default Profile;
