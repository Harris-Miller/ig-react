import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: 5
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  profilePicContainer: {
    backgroundColor: '#9E9E9E',
    borderRadius: 20,
    height: 40,
    marginRight: 10,
    width: 40
  },
  profilePic: {
    borderRadius: 20,
    height: 40,
    width: 40
  },
  poster: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ auth }) => ({ auth });

@connect(mapStateToProps)
export default class Header extends Component {
  render() {
    const { auth } = this.props;
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={[{ width: windowWidth }, styles.container]}>
        <View style={styles.header}>
          <View style={styles.profilePicContainer}>
            <Image source={{ uri: auth.getIn(['user', 'profilePicUrl']) }} style={styles.profilePic} />
          </View>
          <View>
            <Text style={styles.poster}>{auth.getIn(['user', 'displayname'])}</Text>
          </View>
        </View>
      </View>
    );
  }
}
