import React from 'react';
import { StarWarsCharacter } from './hooks/useStarWarsSearch';
import { useSearch } from '../../../../providers/SearchFormProvider/SearchFormProvider';
import { useSearchHistory } from '../../hooks/useSearchHistory/useSearchHistory';

type SuggestionsProps = {
  searchResults?: StarWarsCharacter[]
  errorStatusCode?: number;
};

export const Suggestions: React.FC<SuggestionsProps> = ({
  searchResults,
  errorStatusCode,
}: SuggestionsProps) => {
  const { appendSearchItem } = useSearchHistory();
  const { setSearch } = useSearch();

  if (errorStatusCode) {
    return (
      <span style={{ color: 'red' }}>
        {`I am sorry, it seems we reached a dead end: ${errorStatusCode}`}
      </span>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return <span> Type to search through all galaxies out there! </span>;
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: '0.5em',
        padding: '0.5em',
      }}
      >
        <span>
          Are you looking for:
        </span>
        {searchResults.map(({ name }) => (
          <button
            aria-label="option"
            key={name}
            style={{
              marginTop: '0.2em',
              textAlign: 'left',
              backgroundColor: 'unset',
              border: 'unset',
              padding: '0',
              fontSize: '1em',
            }}
            onClick={(e) => {
              e.preventDefault();
              setSearch(name);
              appendSearchItem(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
