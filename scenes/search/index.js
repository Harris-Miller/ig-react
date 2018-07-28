import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { debounce } from 'lodash-es';
import { InputCommon } from '../../components/text-inputs';
import { clearSearch, fetchSearch, setSearch } from '../../actions/search';
import commonStyles from '../../common-styles';
import Result from './result';

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
    if (this.state.searchText) {
      fetchSearch(this.state.searchText).then(data => this.props.dispatch(setSearch(data)));
    } else {
      this.props.dispatch(clearSearch());
    }
  };

  searchDebounced = debounce(this.search, 400);

  render() {
    const { search } = this.props;
    const { searchText } = this.state;
    const test = ['foo', 'bar', 'biz', 'baz'];

    return (
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View>
          <InputCommon
            iconName="search"
            placeholder="Search..."
            value={searchText}
            onChangeText={this.onSearchTextChange}
            returnKeyType="done"
          />
        </View>
        {search.map(user => (
          <Result key={user.get('id')} user={user} searchedValue={searchText} />
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
