import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: 5
  }
});

@withNavigation
@connect()
export default class Header extends Component {
  render() {
    const { profile } = this.props;
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={[{ width: windowWidth }, styles.container]}>
        <Text>{profile.get('displayname')}</Text>
      </View>
    );
  }
}
