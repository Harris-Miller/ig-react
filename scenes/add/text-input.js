import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: 5
  }
});

export default class MediaInput extends Component {
  render() {
    const { value, onValueChange} = this.props;
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <KeyboardAvoidingView style={[{ width: windowWidth }, styles.container]} enabled>
        <TextInput
          onChangeText={onValueChange}
          value={value}
          placeholder="What's on your mind?"
          placeholderColor="#AAA"
          underlineColorAndroid="#FFF"
          multiline
          numberOfLines={3}
        />
      </KeyboardAvoidingView>
    );
  }
}
