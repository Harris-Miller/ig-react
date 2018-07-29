import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import immutable from 'immutable';
import { fetchPosts, addPosts, clearPosts } from '../../actions/posts';
import Loading from '../loading';
import Header from './header';
import Post from '../../components/post';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="search" size={30} color={tintColor} />
);

const mapStateToProps = ({ profiles, posts }) => ({ profiles, posts });

@connect(mapStateToProps)
@withMappedNavigationProps()
export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('profile').get('displayname')
  });

  componentDidMount() {
    const { profile, dispatch } = this.props;
    const userId = profile.get('id');
    fetchPosts(userId).then(posts => {
      dispatch(clearPosts(userId));
      dispatch(addPosts(userId, posts))
    });
  }

  render() {
    const { profile, posts } = this.props;
    const userId = profile.get('id');
    const usersPosts = posts.get(userId) || new immutable.List();

    return (
      <View>
        <Header profile={profile} />
        <View>
          {usersPosts.map(post => (
            <Post key={post.get('id')} post={post} />
          ))}
        </View>
      </View>
    );
  }
}
