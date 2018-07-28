import React, { Component } from 'react';
import { StackActions, withNavigation } from 'react-navigation';
import immutable from 'immutable';
import { Dimensions, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';

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
    fontSize: 16
  },
  textContainer: {
    padding: 10
  }
});

@withNavigation
class Result extends Component {
  static defaultProps = {
    user: new immutable.Map()
  };

  navigateToProfile = () => {
    this.props.navigation.push('Profile', { userId: this.props.user.get('id') });
  }

  render() {
    const { user, searchedValue } = this.props;
    const { width: windowWidth } = Dimensions.get('window');

    const searchedStartIndex = user.get('searchname').indexOf(searchedValue);
    const displayName = user.get('displayname');

    const highlightedDisplayName = (
      <View>
        <Text>
          {displayName.substring(0, searchedStartIndex)}
          <Text style={{ fontWeight: 'bold' }}>{displayName.substring(searchedStartIndex, searchedStartIndex + searchedValue.length)}</Text>
          {displayName.substring(searchedStartIndex + searchedValue.length, displayName.length)}
        </Text>
      </View>
    );

    return (
      <View>
        <TouchableHighlight style={[{ width: windowWidth }, styles.container]} onPress={this.navigateToProfile}>
          <View style={styles.header}>
            <View style={styles.profilePicContainer}>
              <Image source={{ url: user.get('profilePicUrl') }} style={styles.profilePic} />
            </View>
            {highlightedDisplayName}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Result;
