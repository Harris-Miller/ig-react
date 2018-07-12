import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import commonStyles from '../../common-styles';
import { removeCurrentUser } from '../../actions/auth';

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="person" size={30} color={tintColor} />
);

class User extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'User',
    tabBarIcon: TabBarIcon
  };

  signout = () => {
    const { dispatch, navigation } = this.props;

    dispatch(removeCurrentUser());
    navigation.navigate('AuthStack');
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>User</Text>
        <Spacer />
        <Button
          title="Logout"
          onPress={() => this.signout()}
        />
      </View>
    );
  }
}

export default connect()(User);