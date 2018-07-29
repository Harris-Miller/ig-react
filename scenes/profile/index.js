import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import immutable from 'immutable';
import commonStyles from '../../common-styles';
import { fetchPosts, addPosts } from '../../actions/posts';
import Loading from '../loading';

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
    fetchPosts(userId).then(posts => dispatch(addPosts(userId, posts)));
  }

  render() {
    const { profile, posts } = this.props;
    const userId = profile.get('id');
    const usersPosts = posts.get(userId) || new immutable.List();

    return (
      <View style={commonStyles.container}>
        <Text>Profile: {userId}</Text>
        {profile && <Text>{profile.get('displayname')}</Text>}
        <View>
          {usersPosts.map(post => (
            <Text key={post.get('id')}>{post.get('text')}</Text>
          ))}
        </View>
      </View>
    );
  }
}
