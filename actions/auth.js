import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/set-authorization-token';
import api from '../utils/api';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export async function removeCurrentUser() {
  await AsyncStorage.removeItem('jwtToken');
  setAuthorizationToken();

  return {
    type: REMOVE_CURRENT_USER
  };
}

export async function setCurrentUser(token) {
  await AsyncStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);

  const user = jwtDecode(token);

  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return api.post('/auth', data).then(res => res.data.token);
}

export function singupUser(userObj) {
  return api.post('/users', userObj).then(res => res.data);
}
