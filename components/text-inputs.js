import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: rename
export class InputCommon extends React.Component {
  focusOnInput() {
    this.input.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}><Icon name={this.props.iconName} size={30} color="#000" /></View>
        <View style={styles.input}>
          <TextInput
            ref={input => this.input = input}
            style={styles.text}
            placeholderTextColor="#000"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            value={this.props.value}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
            blurOnSubmit={this.props.blurOnSubmit}
            secureTextEntry={this.props.secureTextEntry}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#D81B60',
    borderColor: '#757575',
    borderRadius: 5,
    borderWidth: 1,
    width: Dimensions.get('window').width - 30,
    marginBottom: 10
  },
  icon: {
    borderColor: '#757575',
    borderRightWidth: 1,
    height: 50,
    width: 50,
    padding: 10
  },
  input: {
    width: Dimensions.get('window').width - (30 + 50 + 1 + 1),
    height: 50,
    padding: 10
  },
  text: {
    height: 30
  }
});
