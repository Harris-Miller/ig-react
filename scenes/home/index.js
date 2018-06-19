import React from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, database } from '../../firebase';
import commonStyles from '../../common-styles';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="home" size={30} color={tintColor} />
);

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: TabBarIcon
  };

  componentDidMount() {
    const uid = auth.currentUser.uid;
    console.log(uid);
    database.ref(`/people/${uid}`).once('value').then(snapshot => console.log(snapshot.val()));
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          title="Logout"
          onPress={() => auth.signOut()}
        />
      </View>
    );
  }
}
