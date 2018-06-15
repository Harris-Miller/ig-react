import React from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { auth, database } from '../../firebase';
import commonStyles from '../../common-styles';

export default class CreateProfile extends React.Component {
  static navigationOptions = {
    title: 'Create Account'
  };

  constructor() {
    super();

    this.state = {
      displayName: '',
      profilePic: ''
    };
  }

  createProfile = () => {
    if (!this.state.displayName) {
      Alert.alert('Display Name is required');
      return;
    }

    const displayName = this.state.displayName;
    const searchDisplayName = displayName.toLowerCase();
    const searchReverseDisplayName = searchDisplayName.split(' ').reverse().join(' ');

    const _searchIndex = {
      displayName: searchDisplayName,
      reversedDisplayName: searchReverseDisplayName
    };

    const uid = auth.currentUser.uid;
    database.ref(`/people/${uid}`).set({
      displayName,
      _searchIndex
    }).then(() => {
      this.props.navigation.navigate('AppTabs');
    }).catch(error => {
      Alert.alert(`${error.message}`);
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={commonStyles.container}>
        <Text>Create Profile</Text>
        <TextInput
          style={commonStyles.text}
          onChangeText={displayName => this.setState({ displayName })}
          placeholder="Display Name"
          value={this.state.displayName}
          onSubmitEditing={this.createProfile}
        />
        <Button
          title="Create Profile"
          onPress={this.createProfile}
        />
      </KeyboardAvoidingView>
    );
  }
}
