import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../../common-styles';
import Header from './header';
import MediaInput from './media-input';
import TextInput from './text-input';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="add-box" size={30} color={tintColor} />
);

export default class Add extends Component {
  static navigationOptions = {
    title: 'Add',
    tabBarLabel: 'Add',
    tabBarIcon: TabBarIcon
  };

  state = {
    mediaValue: null,
    textValue: ''
  };

  onMediaChange = () => {
    
  };

  onTextChange = textValue => {
    this.setState({ textValue });
  };

  render() {
    const { mediaValue, textValue } = this.state;

    return (
      <View style={commonStyles.container}>
        <View style={{ flex: 2 }}>
          <Header />
        </View>
        <View style={{ flex: 5 }}>
          <MediaInput value={mediaValue} onValueChange={this.onMediaChange} />
        </View>
        <View style={{ flex: 3 }}>
          <TextInput value={textValue} onValueChange={this.onTextChange} />
        </View>
      </View>
    );
  }
}
