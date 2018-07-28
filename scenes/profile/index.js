import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import commonStyles from '../../common-styles';
import { fetchProfile, addProfile } from '../../actions/profiles';
import Loading from '../loading';

const mapStateToProps = ({ profiles }) => ({ profiles });

@connect(mapStateToProps)
@withMappedNavigationProps()
class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile'
  });

  componentDidMount() {
    const { profiles, userId, dispatch } = this.props;

    if (userId && !profiles.find(user => user.get('id') === userId)) {
      fetchProfile(userId).then(newProfile => dispatch(addProfile(newProfile)));
    }
  }

  render() {
    const { userId, profiles } = this.props;
    const profile = profiles.find(user => user.get('id') === userId);

    if (!profile) {
      return <Loading />;
    }

    return (
      <View style={commonStyles.container}>
        <Text>Profile: {userId}</Text>
        {profile && <Text>{profile.get('displayname')}</Text>}
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
