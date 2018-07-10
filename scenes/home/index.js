import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../common-styles';
import { removeCurrentUser } from '../../actions/auth';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="home" size={30} color={tintColor} />
);

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: TabBarIcon
  };

  signout = () => {
    const { dispatch, navigation } = this.props;

    dispatch(removeCurrentUser());
    navigation.navigate('AuthStack');
  };

  componentDidMount() {
    // const uid = auth.currentUser.uid;
    // console.log(uid);
    // database.ref(`/people/${uid}`).once('value').then(snapshot => console.log(snapshot.val()));
  }

  render() {
    const { auth } = this.props;

    return (
      <View style={commonStyles.container}>
        <Text>Welcome, {auth.getIn(['user', 'displayname'])}</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          title="Logout"
          onPress={() => this.signout()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
