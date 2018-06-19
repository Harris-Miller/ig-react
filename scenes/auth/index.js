import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import { auth, database } from '../../firebase';
import MLogo from '../../components/m-logo';
import { InputCommon } from '../../components/text-inputs';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'IG React'
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
        <View style={{ margin: 30 }}>
          <MLogo />
        </View>
        <View>
          <InputCommon
            iconName={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
            placeholder="email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <InputCommon
            iconName={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
            placeholder="password"
            ref={input => { this.password = input; }}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            returnKeyType="go"
            onSubmitEditing={this.createAccount}
          />
        </View>
        <Button
          color="#000"
          title="Login"
          onPress={this.createAccount}
        />
        <Text style={styles.boldWhite}>Forgot your password?</Text>
        <Text>Don't have an account? <Text style={styles.boldWhite} onPress={() => this.props.navigation.navigate('CreateAccount')}>Sign up now</Text></Text>
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
