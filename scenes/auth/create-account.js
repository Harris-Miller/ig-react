import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
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

  email = () => (
    <TextInput
      style={styles.text}
      keyboardType="email-address"
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={email => this.setState({ email })}
      placeholder="email"
      value={this.state.email}
      autoCapitalize="none"
      returnKeyType="next"
    />
  );

  password = () => (
    <TextInput
      style={styles.text}
      secureTextEntry={true}
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={password => this.setState({ password })}
      placeholder="password"
      value={this.state.password}
      autoCapitalize="none"
      returnKeyType="go"
      onSubmitEditing={this.createAccount}
    />
  );

  createAccount = () => {
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.props.navigation.navigate('AppTabs');
    }).catch(error => {
      alert(`${error.message}`);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Create Account</Text>
        {this.email()}
        {this.password()}
        <Button
          title="Create Account"
          onPress={this.createAccount}
        />
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
  },
  text: {
    width: 75,
    padding: 50
  }
});
