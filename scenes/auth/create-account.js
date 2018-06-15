import React from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { auth } from '../../firebase';

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
      <KeyboardAvoidingView style={styles.container}>
        <Text>Create Account</Text>
        <TextInput
          style={styles.text}
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
          style={styles.text}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    width: 250,
    padding: 100,
    margin: 100
  }
});
