import React, { Component } from 'react';

interface SearchProps {
  readonly savedSearchTerm: string;
  readonly setSavedSearchTerm: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const { savedSearchTerm } = props;
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  shouldComponentUpdate(nextProps: SearchProps, nextState: SearchState) {
    const { savedSearchTerm } = this.props,
      { searchTerm } = this.state;
    return (
      savedSearchTerm !== nextProps.savedSearchTerm ||
      searchTerm !== nextState.searchTerm
    );
  }

  handleSearch = () => {
    const { searchTerm } = this.state,
      { setSavedSearchTerm } = this.props;
    setSavedSearchTerm(searchTerm);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <input
          onChange={this.handleChange}
          placeholder="Enter search term..."
          type="text"
          value={searchTerm}
        />
        <button onClick={this.handleSearch} type="button">
          Search
        </button>
      </div>
    );
  }
}

export default Search;
