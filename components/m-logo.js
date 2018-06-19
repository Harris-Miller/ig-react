import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => (
  <View style={style.background}>
    <Text style={style.lettering}>M</Text>
  </View>
);

const style = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D81B60',
    height: 100,
    width: 100
  },
  lettering: {
    color: '#FFFFFF',
    fontSize: 90,
    fontWeight: '900',
    textAlign: 'center'
  }
});
