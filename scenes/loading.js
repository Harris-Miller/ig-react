import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { auth } from '../firebase';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('AppTabs')
      } else {
        props.navigation.navigate('AuthStack')
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
