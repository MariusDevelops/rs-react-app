import './Home.css';
import { fetchAllFilms, fetchFilms } from '../services/apiService';
import { Component } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Search from '../components/Search';

interface Film {
  title: string;
  director: string;
}

interface HomeState {
  savedSearchTerm: string;
  searchResults: Film[];
  isLoading: boolean;
  errorMessage: string;
}

class Home extends Component<Record<string, never>, HomeState> {
  static handleThrowError = () => {
    throw new Error('Test error thrown from Home component!');
  };

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      savedSearchTerm: '',
      searchResults: [],
      isLoading: false,
      errorMessage: '',
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
      this.setState({ isLoading: true, errorMessage: '' });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const films = await fetchAllFilms();
      this.setState({ searchResults: films });
    } catch (error) {
      const message = (error as Error).message || 'An unknown error occurred';
      this.setState({ errorMessage: message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  performSearch = async () => {
    const { savedSearchTerm } = this.state;
    this.setState({ isLoading: true, errorMessage: '' });

    try {
      const films = await fetchFilms(savedSearchTerm);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.setState({ searchResults: films });
    } catch (error) {
      const message = (error as Error).message || 'An unknown error occurred';
      this.setState({ errorMessage: message });
    } finally {
      this.setState({ isLoading: false });
    }
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

  handleThrowError = () => {
    this.setState({ errorMessage: 'An intentional error has occurred!' });
    throw new Error('Test error thrown from Home component!');
  };

  render() {
    const { savedSearchTerm, isLoading, errorMessage } = this.state;

    return (
      <ErrorBoundary
        fallback={<h1>{errorMessage || 'Something went wrong.'}</h1>}
      >
        <div className="home-container">
          <div className="section top-section">
            <Search
              savedSearchTerm={savedSearchTerm}
              setSavedSearchTerm={this.setSavedSearchTerm}
            />
          </div>
          <div className="section bottom-section">
            <h2>Search Results</h2>
            {isLoading ? (
              <div>Loading...</div>
            ) : errorMessage ? (
              <div>{errorMessage}</div>
            ) : (
              this.renderSearchResults()
            )}
            <button onClick={this.handleThrowError} type="button">
              Throw Error
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default Home;
