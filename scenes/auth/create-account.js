import React from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, Button } from 'react-native';
import { auth, database } from '../../firebase';
import { InputCommon } from '../../components/text-inputs';
import commonStyles from '../../common-styles';

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
        style={commonStyles.container}
        behavior="padding"
        enabled
      >
        <InputCommon
          iconName="account-circle"
          placeholder="User Name*"
          value={this.state.displayName}
          onChangeText={displayName => this.setState({ displayName })}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.email.focusOnInput()}
        />
        <InputCommon
          ref={email => this.email = email}
          iconName="email"
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
          iconName="lock"
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
          iconName="lock"
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
  boldWhite: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
