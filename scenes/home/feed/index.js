import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../../../components/spacer';
import Post from './post';
import { resetFeed } from '../../../actions/feed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    paddingBottom: 5
  }
});

class Home extends Component {
  static navigationOptions = {
    title: 'IG React'
  };

  componentWillMount() {
    this.props.dispatch(resetFeed());
  }

  render() {
    const { auth, feed } = this.props;

    return (
      <ScrollView style={styles.container}>
        {feed.map(post => (
          <Post key={post.get('id')} data={post} />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ auth, feed }) => ({ auth, feed });

export default connect(mapStateToProps)(Home);
