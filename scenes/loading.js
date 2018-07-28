import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import commonStyles from '../common-styles';

export default () => (
  <View style={commonStyles.container}>
    <Text>Instaclone</Text>
    <ActivityIndicator size="large" />
  </View>
);
