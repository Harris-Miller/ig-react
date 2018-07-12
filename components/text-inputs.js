import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderColor: '#111',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10
  },
  icon: {
    borderColor: '#111',
    borderRightWidth: 1,
    height: 50,
    width: 50,
    padding: 10
  },
  input: {
    height: 50,
    padding: 10
  },
  text: {
    height: 30
  }
});


// TODO: rename
export class InputCommon extends React.Component {
  state = {
    containerWidth: 0,
    inputWidth: 0
  };

  componentDidMount() {
    this.resizeWidths({ window: Dimensions.get('window') });
    Dimensions.addEventListener('change', this.resizeWidths);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resizeWidths);
  }

  resizeWidths = ({ window }) => {
    const { width } = window;

    this.setState({
      containerWidth: width - 30,
      inputWidth: width - (30 + 50 + 1 + 1)
    });
  };

  focusOnInput() {
    this.input.focus();
  }

  render() {
    const { containerWidth, inputWidth } = this.state;

    return (
      <View style={[styles.container, { width: containerWidth }]}>
        <View style={styles.icon}><Icon name={this.props.iconName} size={30} color="#111" /></View>
        <View style={[styles.input, { width: inputWidth }]}>
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
