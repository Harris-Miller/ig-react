import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { debounce } from 'lodash-es';
import { InputCommon } from '../../components/text-inputs';
import { clearSearch, fetchSearch, setSearch } from '../../actions/search';
import commonStyles from '../../common-styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    paddingBottom: 5
  }
});

const mapStateToProps = ({ auth, search }) => ({ auth, search });

@connect(mapStateToProps)
class Search extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search'
  });

  state = {
    searchText: ''
  };

  componentDidMount() {
    this.props.dispatch(clearSearch());
  }

  onSearchTextChange = (value) => {
    this.setState({ searchText: value }, () => {
      this.searchDebounced();
    });
  };

  search = () => {
    fetchSearch(this.state.searchText).then(data => this.props.dispatch(setSearch(data)));
  };

  searchDebounced = debounce(this.search, 400);

  render() {
    const { search } = this.props;
    
    const test = ['foo', 'bar', 'biz', 'baz'];

    return (
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View>
          <InputCommon
            iconName="search"
            placeholder="Search..."
            value={this.state.searchText}
            onChangeText={this.onSearchTextChange}
            returnKeyType="done"
          />
        </View>
        {search.map(result => (
          <View key={result.get('id')}>
            <Text>{result.get('displayname')}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const SearchStack = createStackNavigator({
  Search
}, {
  initialRouteName: 'Search'
});

const TabBarIcon = ({ focused, tintColor }) => (
  <Icon name="search" size={30} color={tintColor} />
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: TabBarIcon
};

export default SearchStack;
