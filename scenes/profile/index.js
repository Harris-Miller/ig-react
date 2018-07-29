import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import immutable from 'immutable';
import commonStyles from '../../common-styles';
import { fetchProfile, addProfile } from '../../actions/profiles';
import { fetchPosts, addPosts } from '../../actions/posts';
import Loading from '../loading';
import { isImmutable } from '../../node_modules/immutable';

const mapStateToProps = ({ profiles, posts }) => ({ profiles, posts });

@connect(mapStateToProps)
@withMappedNavigationProps()
class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile'
  });

  componentDidMount() {
    const { profiles, userId, dispatch } = this.props;

    if (userId && !profiles.find(user => user.get('id') === userId)) {
      Promise.all([
        fetchProfile(userId).then(profile => dispatch(addProfile(profile))),
        fetchPosts(userId).then(posts => dispatch(addPosts(userId, posts)))
      ]);
    }
  }

  render() {
    const { userId, profiles, posts } = this.props;
    const profile = profiles.find(user => user.get('id') === userId);
    const usersPosts = posts.get(userId) || new immutable.List();

    if (!profile) {
      return <Loading />;
    }

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

const ProfileStack = createStackNavigator({
  Profile
});

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="search" size={30} color={tintColor} />
);

export default ProfileStack;
