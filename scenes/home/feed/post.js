import React, { Component } from 'react';
import immutable from 'immutable';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: 5
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5
  },
  profilePic: {
    borderRadius: 20,
    height: 40,
    width: 40
  },
  poster: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  textContainer: {
    padding: 10
  }
});

class Post extends Component {
  static propTypes = {

  };

  static defaultProps = {
    data: new immutable.Map()
  };

  state = {
    imageHeight: 0
  };

  componentDidMount() {
    const { data } = this.props;

    if (!!data.get('fullUrl')) {
      const { width: windowWidth } = Dimensions.get('window');

      Image.getSize(data.get('fullUrl'), (width, height) => {
        const ratio = windowWidth / width;
        this.setState({ imageHeight: height * ratio });
      });
    }
  }

  render() {
    const { data } = this.props;
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={[styles.container, { width: windowWidth }]}>
        <View style={styles.header}>
          <Image source={{ uri: data.getIn(['user', 'profilePicUrl']) }} style={styles.profilePic} />
          <Text style={styles.poster}>{data.getIn(['user', 'displayname'])}</Text>
        </View>
        {!!data.get('fullUrl') && (
          <Image source={{ uri: data.get('fullUrl')}} style={{ width: windowWidth, height: this.state.imageHeight }} />
        )}
        <View style={styles.textContainer}>
          <Text>{data.get('text')}</Text>
        </View>
      </View>
    );
  }
}

export default Post;
