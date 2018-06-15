import React from 'react';
import { View, Text, Image } from 'react-native';

export default class Card extends React.Component {
  render() {
    const post = this.props.post;

    return (
      <View>
        <View>
          <Text>{'TODO'}</Text>
        </View>
      </View>
    );
  }
}
