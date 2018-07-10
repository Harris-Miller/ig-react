import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import MLogo from '../../components/m-logo';
import { InputCommon } from '../../components/text-inputs';
import commonStyles from '../../common-styles';
import { login, setCurrentUser } from '../../actions/auth';

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

class Auth extends Component {
  static navigationOptions = {
    title: 'IG React'
  };

  state = {
    email: '',
    password: ''
  };

  signin = () => {
    const { dispatch, navigation } = this.props;
    const { email, password } = this.state;

    login({ email, password })
      .then(token => {
        dispatch(setCurrentUser(token));
        navigation.navigate('AppTabs');
      })
      .catch(err => {
        Alert.alert(`${err.message}`);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={commonStyles.container}
        behavior="padding"
        enabled
      >
        <View style={{ margin: 30 }}>
          <MLogo />
        </View>
        <View>
          <InputCommon
            iconName="account-circle"
            placeholder="email"
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
            placeholder="password"
            ref={input => { this.password = input; }}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            returnKeyType="go"
            onSubmitEditing={this.signin}
          />
        </View>
        <Button
          color="#000"
          title="Login"
          onPress={this.signin}
        />
        <Text style={styles.boldWhite}>Forgot your password?</Text>
        <Text>Don't have an account? <Text style={styles.boldWhite} onPress={() => this.props.navigation.navigate('CreateAccount')}>Sign up now</Text></Text>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Auth);