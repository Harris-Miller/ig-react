import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => (
  <View style={style.background}>
    <Text style={style.lettering}>IG</Text>
  </View>
);

const style = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    height: 110,
    width: 110
  },
  lettering: {
    color: '#FFF',
    fontSize: 90,
    fontWeight: '900',
    textAlign: 'center'
  }
});
