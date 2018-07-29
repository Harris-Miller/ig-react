import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../../../components/spacer';
import Post from '../../../components/post';
import { fetchFeedData, resetFeed } from '../../../actions/feed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    paddingBottom: 5
  }
});

const mapStateToProps = ({ auth, feed }) => ({ auth, feed });

@connect(mapStateToProps)
export default class Home extends Component {
  static navigationOptions = {
    title: 'IG React'
  }

  state = {
    refreshing: false
  };

  componentWillMount() {
    fetchFeedData().then(data => {
      this.props.dispatch(resetFeed(data));
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, async () => {
      fetchFeedData().then(data => {
        this.props.dispatch(resetFeed(data));
        this.setState({ refreshing: false });
      });
    });
  };

  render() {
    const { auth, feed } = this.props;

    const refreshControl = (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    );

    return (
      <ScrollView style={styles.container} refreshControl={refreshControl}>
        {feed.map(post => (
          <Post key={post.get('id')} data={post} />
        ))}
      </ScrollView>
    );
  }
}
