import React from 'react';
import {Searchbar} from 'react-native-paper';
import gql from 'graphql-tag';

class SearchbarComponent extends React.Component {
  state = {
    firstQuery: '',
  };

  render() {
    const {firstQuery} = this.state;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => {
          this.setState({firstQuery: query});
          this.props.onSearch(query);
        }}
        value={firstQuery}
      />
    );
  }
}

export default SearchbarComponent;
