import React, { Component } from 'react';
import immutable from 'immutable';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: 5
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  profilePicContainer: {
    backgroundColor: '#9E9E9E',
    borderRadius: 20,
    height: 40,
    marginRight: 10,
    width: 40
  },
  profilePic: {
    borderRadius: 20,
    height: 40,
    width: 40
  },
  poster: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  textContainer: {
    padding: 10
  }
});

class Post extends Component {
  static defaultProps = {
    data: new immutable.Map()
  };

  state = {
    imageHeight: 0,
    imageWidth: 0,
    displayHeight: 0
  };

  componentDidMount() {
    const { data } = this.props;

    if (!!data.get('fullUrl')) {
      Image.getSize(data.get('fullUrl'), (width, height) => {
        this.setState({ imageWidth: width, imageHeight: height}, () => {
          this.resizeWidths({ window: Dimensions.get('window') });
          Dimensions.addEventListener('change', this.resizeWidths);
        });
      });
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.resizeWidths);
  }

  resizeWidths = ({ window }) => {
    const { imageHeight, imageWidth } = this.state;
    const { width: windowWidth } = window;

    const ratio = windowWidth / imageWidth;
    this.setState({ displayHeight: imageHeight * ratio });
  };

  render() {
    const { data } = this.props;
    const { width: windowWidth } = Dimensions.get('window');

    return (
      <View style={[{ width: windowWidth }, styles.container]}>
        <View style={styles.header}>
          <View style={styles.profilePicContainer}>
            <Image source={{ uri: data.getIn(['user', 'profilePicUrl']) }} style={styles.profilePic} />
          </View>
          <View>
            <Text style={styles.poster}>{data.getIn(['user', 'displayname'])}</Text>
            <Text>{moment(data.get('createdAt')).format("MMM D [at] h:mma")}</Text>
          </View>
        </View>
        {!!data.get('fullUrl') && (
          <Image source={{ uri: data.get('fullUrl')}} style={{ width: windowWidth, height: this.state.displayHeight }} />
        )}
        <View style={styles.textContainer}>
          <Text>{data.get('text')}</Text>
        </View>
      </View>
    );
  }
}

export default Post;
