import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Dimensions, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import immutable from 'immutable';
import moment from 'moment';
import { fetchProfile, addProfile } from '../actions/profiles';
import withWindowWidth from '../mixins/with-window-width';

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
  },
  textContainer: {
    padding: 10
  }
});

@withWindowWidth
@withNavigation
@connect()
export default class Post extends Component {
  static defaultProps = {
    data: new immutable.Map()
  };

  state = {
    imageHeight: 0,
    imageWidth: 0,
    displayHeight: 0
  };

  componentDidMount() {
    const { post } = this.props;

    if (!!post.get('fullUrl')) {
      Image.getSize(post.get('fullUrl'), (width, height) => {
        this.setState({ imageWidth: width, imageHeight: height}, () => {
          this.resizeWidths({ window: Dimensions.get('window') });
          Dimensions.addEventListener('change', this.resizeWidths);
        });
      });
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resizeWidths);
  }

  resizeWidths = ({ window }) => {
    const { imageHeight, imageWidth } = this.state;
    const { width: windowWidth } = window;

    const ratio = windowWidth / imageWidth;
    this.setState({ displayHeight: imageHeight * ratio });
  };

  navigateToProfile = () => {
    const { post, navigation, dispatch } = this.props;
    const userId = post.getIn(['user', 'id']);

    fetchProfile(userId).then(profile => {
      navigation.push('Profile', { profile: immutable.fromJS(profile) });
    });
  }

  render() {
    const { post } = this.props;
    // const { width: windowWidth } = Dimensions.get('window');
    const { windowWidth } = this.state;

    return (
      <View style={[{ width: windowWidth }, styles.container]}>
        <TouchableHighlight onPress={this.navigateToProfile}>
          <View style={styles.header}>
            <View style={styles.profilePicContainer}>
              <Image source={{ uri: post.getIn(['user', 'profilePicUrl']) }} style={styles.profilePic} />
            </View>
            <View>
              <Text style={styles.poster}>{post.getIn(['user', 'displayname'])}</Text>
              <Text>{moment(post.get('createdAt')).format("MMM D [at] h:mma")}</Text>
            </View>
          </View>
        </TouchableHighlight>
        {!!post.get('fullUrl') && (
          <Image source={{ uri: post.get('fullUrl')}} style={{ width: windowWidth, height: this.state.displayHeight }} />
        )}
        <View style={styles.textContainer}>
          <Text>{post.get('text')}</Text>
        </View>
      </View>
    );
  }
}
