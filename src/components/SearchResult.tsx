import React from 'react';
import { Film } from '../types';

interface SearchResultProps {
  film: Film;
}

const SearchResult: React.FC<SearchResultProps> = ({ film }) => (
  <div>
    <h3>{film.title}</h3>
    <p>Director: {film.director}</p>
  </div>
);

export default SearchResult;
