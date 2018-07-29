import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import store from '../../store';
import { setCurrentUser } from '../../actions/auth';
import Loading from '../loading';

export default class AutoLogin extends Component {
  constructor(props) {
    super(props);

    AsyncStorage.getItem('jwtToken').then(jwtToken => {
      if (jwtToken) {
        store.dispatch(setCurrentUser(jwtToken));
        props.navigation.navigate('MainStack');
      } else {
        props.navigation.navigate('AuthStack');
      }
    });
  }

  render() {
    return (
      <Loading />
    );
  }
}
