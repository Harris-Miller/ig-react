import React, { Component } from 'react';
import { Dimensions } from 'react-native';

export default function withWindowWidth(Target) {
  return class extends Component {
    state = {
      windowWidth: Dimensions.get('window').width
    };

    componentDidMount() {
      Dimensions.addEventListener('change', this.updateWindowWidth);
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.updateWindowWidth);
    }

    updateWindowWidth = () => {
      this.setState({ windowWidth: Dimensions.get('window').width });
    };

    render() {
      return <Target windowWidth={this.state.windowWidth} {...this.props} />;
    }
  }
}
