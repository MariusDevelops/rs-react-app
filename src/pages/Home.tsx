import './Home.css';
import { Component } from 'react';
import Search from '../components/Search';
import { v4 as uuidv4 } from 'uuid';

interface SearchResult {
  description: string;
  name: string;
}

interface HomeState {
  savedSearchTerm: string;
  searchResults: SearchResult[];
}

class Home extends Component<Record<string, never>, HomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      savedSearchTerm: '',
      searchResults: [],
    };
  }

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      const storedTerm = localStorage.getItem('savedSearchTerm');
      if (storedTerm) {
        this.setState({ savedSearchTerm: storedTerm });
      }
    }
  }

  shouldComponentUpdate(_: Record<string, never>, nextState: HomeState) {
    const { savedSearchTerm, searchResults } = this.state;
    return (
      savedSearchTerm !== nextState.savedSearchTerm ||
      searchResults !== nextState.searchResults
    );
  }

  setSavedSearchTerm = (term: string) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('savedSearchTerm', term);
    }
    this.setState({ savedSearchTerm: term }, () => {
      this.performSearch();
    });
  };

  performSearch = () => {
    const { savedSearchTerm } = this.state,
      results: SearchResult[] = [
        {
          description: `Description for ${savedSearchTerm} Result 1`,
          name: `${savedSearchTerm} Result 1`,
        },
        {
          description: `Description for ${savedSearchTerm} Result 2`,
          name: `${savedSearchTerm} Result 2`,
        },
      ];
    this.setState({ searchResults: results });
  };

  renderSearchResults = () => {
    const { searchResults } = this.state;
    return (
      <div>
        {searchResults.map((result) => (
          <div key={uuidv4()}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { savedSearchTerm } = this.state;

    return (
      <div>
        <div className="section top-section">
          <Search
            savedSearchTerm={savedSearchTerm}
            setSavedSearchTerm={this.setSavedSearchTerm}
          />
        </div>
        <div className="section bottom-section">
          <h2>Search Results</h2>
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

export default Home;
