import './Home.css';
import { fetchAllFilms, fetchFilms } from '../services/apiService';
import { Component } from 'react';
import Search from '../components/Search';

interface Film {
  title: string;
  director: string;
}

interface HomeState {
  savedSearchTerm: string;
  searchResults: Film[];
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
        this.setState({ savedSearchTerm: storedTerm }, () => {
          this.performSearch();
        });
      } else {
        this.fetchAllItems();
      }
    }
  }

  shouldComponentUpdate(nextState: Record<string, never>) {
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
      if (term.trim() === '') {
        this.fetchAllItems();
      } else {
        this.performSearch();
      }
    });
  };

  fetchAllItems = async () => {
    try {
      const films = await fetchAllFilms();
      this.setState({ searchResults: films });
    } catch (error) {
      console.error('Error fetching all films:', error);
    }
  };

  performSearch = () => {
    const { savedSearchTerm } = this.state;

    fetchFilms(savedSearchTerm)
      .then((films) => {
        this.setState({ searchResults: films });
      })
      .catch((error) => {
        console.error(
          `Error fetching films with search term '${savedSearchTerm}':`,
          error
        );
      });
  };

  renderSearchResults = () => {
    const { searchResults } = this.state;
    return (
      <div>
        {searchResults.map((film) => (
          <div key={film.title}>
            <h3>{film.title}</h3>
            <p>Director: {film.director}</p>
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
