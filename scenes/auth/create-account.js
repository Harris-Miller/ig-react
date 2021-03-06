import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Button, Platform } from 'react-native';
import { connect } from 'react-redux';
import { InputCommon } from '../../components/text-inputs';
import commonStyles from '../../common-styles';
import { singupUser, login, setCurrentUser } from '../../actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    ...Platform.select({
      android: {
        paddingTop: 30
      }
    })
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldWhite: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});

@connect()
class CreateAccount extends Component {
  static navigationOptions = {
    title: 'Create Account'
  };

  state = {
    displayname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  createAccount = () => {
    const { dispatch, navigation } = this.props;
    const { displayname, email, password, confirmPassword } = this.state;

    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    singupUser({ displayname, email, password })
      .then(() => login({ email, password }))
      .then(token => {
        dispatch(setCurrentUser(token));
        navigation.navigate('MainStack');
      })
      .catch(err => {
        Alert.alert(`${err.message}`);
      });
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} centerContent>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
        >
          <InputCommon
            iconName="account-circle"
            placeholder="Display Name*"
            value={this.state.displayname}
            onChangeText={displayname => this.setState({ displayname })}
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
      </ScrollView>
    );
  }
}

export default CreateAccount;
