import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { auth, database } from '../firebase';
import commonStyles from '../common-styles';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    auth.onAuthStateChanged(user => {
      if (user) {
        const uid = auth.currentUser.uid;
        database.ref(`/people/${uid}`).once('value').then(snapshot => {
          if (snapshot.val()) {
            props.navigation.navigate('AppTabs');
          } else {
            props.navigation.navigate('CreateProfile');
          }
        });
      } else {
        props.navigation.navigate('AuthStack')
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
