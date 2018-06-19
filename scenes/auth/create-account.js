import React from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, Button, Platform } from 'react-native';
import { auth, database } from '../../firebase';
import commonStyles from '../../common-styles';
import { InputCommon } from '../../components/text-inputs';

export default class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Create Account'
  };

  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  createAccount = () => {
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const uid = auth.currentUser.uid;
        const displayName = this.state.displayName;
        const searchDisplayName = displayName.toLowerCase();
        const searchReverseDisplayName = searchDisplayName.split(' ').reverse().join(' ');

        const _searchIndex = {
          displayName: searchDisplayName,
          reversedDisplayName: searchReverseDisplayName
        };

        return Promise.all([
          auth.currentUser.updateProfile({ displayName: this.state.displayName }),
          database.ref(`/people/${uid}`).set({ displayName, _searchIndex })
        ]);
      })
      .then(() => this.props.navigation.navigate('AppTabs'))
      .catch(error => {
        Alert.alert(`${error.message}`);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
      >
        <InputCommon
          iconName={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
          placeholder="User Name*"
          value={this.state.displayName}
          onChangeText={displayName => this.setState({ displayName })}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.email.focusOnInput()}
        />
        <InputCommon
          ref={email => this.email = email}
          iconName={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'}
          placeholder="Email*"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focusOnInput()}
        />
        <InputCommon
          ref={password => this.password = password}
          iconName={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
          placeholder="Password*"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          returnKeyType="next"
          blurOnSubmit={false}
          secureTextEntry={true}
          onSubmitEditing={() => this.confirmPassword.focusOnInput()}
        />
        <InputCommon
          ref={confirmPassword => this.confirmPassword = confirmPassword}
          iconName={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
          placeholder="Confirm Password*"
          value={this.state.confirmPassword}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          returnKeyType="go"
          blurOnSubmit={false}
          secureTextEntry={true}
          onSubmitEditing={this.createAccount}
        />
        <Button
          color="#000"
          title="Create Account"
          onPress={this.createAccount}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldWhite: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
