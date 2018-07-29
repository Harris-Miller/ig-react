import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import withWindowWidth from '../../mixins/with-window-width';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5
  },
  header: {
    
    marginTop: 10,
    marginBottom: 10,
    
    marginRight: 5
  },
  profilePicContainer: {
    backgroundColor: '#9E9E9E',
    borderRadius: 40,
    height: 80,
    marginRight: 10,
    width: 80
  },
  profilePic: {
    borderRadius: 40,
    height: 80,
    width: 80
  }
});

@withWindowWidth
@withNavigation
@connect()
export default class Header extends Component {
  render() {
    const { profile, windowWidth } = this.props;

    return (
      <View style={[{ width: windowWidth }, styles.container]}>
        <View style={styles.profilePicContainer}>
          <Image source={{ uri: profile.get('profilePicUrl') }} style={styles.profilePic} />
        </View>
      </View>
    );
  }
}
