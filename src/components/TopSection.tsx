import { Component } from 'react';
import Search from '../components/Search';

interface TopSectionProps {
  savedSearchTerm: string;
  setSavedSearchTerm: (term: string) => void;
}

class TopSection extends Component<TopSectionProps> {
  render() {
    const { savedSearchTerm, setSavedSearchTerm } = this.props;
    return (
      <div className="section top-section">
        <Search
          savedSearchTerm={savedSearchTerm}
          setSavedSearchTerm={setSavedSearchTerm}
        />
      </div>
    );
  }
}

export default TopSection;
