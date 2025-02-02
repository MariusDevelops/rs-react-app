import './Home.css';
import { Component } from 'react';
import Search from '../components/Search';

interface HomeState {
  savedSearchTerm: string;
}

class Home extends Component<Record<string, never>, HomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      savedSearchTerm: '',
    };
  }

  componentDidMount() {
    const storedTerm = localStorage.getItem('savedSearchTerm');
    if (storedTerm) {
      this.setState({ savedSearchTerm: storedTerm });
    }
  }

  shouldComponentUpdate(_: Record<string, never>, nextState: HomeState) {
    return this.state.savedSearchTerm !== nextState.savedSearchTerm;
  }

  setSavedSearchTerm = (term: string) => {
    localStorage.setItem('savedSearchTerm', term);
    this.setState({ savedSearchTerm: term });
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
          <h2>Bottom Section</h2>
          <p>This is the bigger bottom section.</p>
        </div>
      </div>
    );
  }
}

export default Home;
