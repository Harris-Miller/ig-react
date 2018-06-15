import React from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { auth, database } from '../../firebase';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };
  
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  createAccount = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      const uid = auth.currentUser.uid;
      database.ref(`/people/${uid}`).once('value').then(snapshot => {
        if(snapshot.val()) {
          this.props.navigation.navigate('AppTabs');
        } else {
          this.props.navigation.navigate('CreateProfile');
        }
      });
    }).catch(error => {
      Alert.alert(`${error.message}`);
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.text}
          keyboardType="email-address"
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
          title="Login"
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
    width: 250
  }
});
