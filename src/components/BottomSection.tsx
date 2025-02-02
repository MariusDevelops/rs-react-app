import { Component } from 'react';

interface BottomSectionProps {
  isLoading: boolean;
  errorMessage: string;
  renderSearchResults: () => JSX.Element;
  handleThrowError: () => void;
}

class BottomSection extends Component<BottomSectionProps> {
  render() {
    const { isLoading, errorMessage, renderSearchResults, handleThrowError } =
      this.props;

    return (
      <div className="section bottom-section">
        <h2>Search Results</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          renderSearchResults()
        )}
        <button onClick={handleThrowError} type="button">
          Throw Error
        </button>
      </div>
    );
  }
}

export default BottomSection;
