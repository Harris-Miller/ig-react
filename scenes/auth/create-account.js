import React from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { auth } from '../../firebase';
import commonStyles from '../../common-styles';

export default class CreateAccount extends React.Component {
  static navigationOptions = {
    title: 'Create Account'
  };

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  createAccount = () => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.props.navigation.navigate('CreateProfile');
    }).catch(error => {
      Alert.alert(`${error.message}`);
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={commonStyles.container}>
        <Text>Create Account</Text>
        <TextInput
          style={commonStyles.text}
          onChangeText={email => this.setState({ email })}
          placeholder="email"
          value={this.state.email}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => this.password.focus()}
          blurOnSubmit={false}
        />
        <TextInput
          ref={input => { this.password = input; }}
          style={commonStyles.text}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          placeholder="password"
          value={this.state.password}
          autoCapitalize="none"
          returnKeyType="go"
          onSubmitEditing={this.createAccount}
        />
        <Button
          title="Create Account"
          onPress={this.createAccount}
        />
      </KeyboardAvoidingView>
    );
  }
}
