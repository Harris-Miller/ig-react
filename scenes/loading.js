import React from 'react';
import { AsyncStorage, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import store from '../store';
import { setCurrentUser } from '../actions/auth';
import commonStyles from '../common-styles';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    AsyncStorage.getItem('jwtToken').then(jwtToken => {
      if (jwtToken) {
        store.dispatch(setCurrentUser(jwtToken));
        props.navigation.navigate('AppTabs');
      } else {
        props.navigation.navigate('AuthStack');
      }
    });
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Instaclone</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
