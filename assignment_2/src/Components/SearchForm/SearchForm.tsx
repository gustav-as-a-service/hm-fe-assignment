import React, { useCallback, useEffect, useState } from 'react';
import { Input } from './organisms/Input/Input';
import {
  StarWarsCharacter,
  useStarWarsSearch,
} from './organisms/Suggestions/hooks/useStarWarsSearch';
import { useSearch } from '../../providers/SearchFormProvider/SearchFormProvider';
import { CharacterPresentation } from './atoms/CharacterPresentation';
import { Suggestions } from './organisms/Suggestions/Suggestions';
import { useSearchHistory } from './hooks/useSearchHistory/useSearchHistory';
import { SearchHistory } from './atoms/SearchHistory';

export const SearchForm: React.FC = () => {
  const { search } = useSearch();
  const { searchResults, responseStatus } = useStarWarsSearch();
  const { appendSearchItem } = useSearchHistory();
  const [characterMatch, setCharacterMatch] = useState<StarWarsCharacter | undefined>(
    undefined,
  );

  const submitCharacter = useCallback(
    (starWarsCharacter: StarWarsCharacter) => {
      setCharacterMatch(starWarsCharacter);
    }, [setCharacterMatch],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appendSearchItem(search);
    if (searchResults) {
      submitCharacter(searchResults[0]);
    }
  };

  useEffect(() => {
    // When we are in no doubt what they are looking for then we show it
    // This will pick up suggestion option presses
    const characterMatchedBySearch = searchResults?.find(
      (searchResult) => searchResult.name === search,
    );
    if (characterMatchedBySearch) {
      submitCharacter(characterMatchedBySearch);
    } else {
      setCharacterMatch(undefined);
    }
  }, [search, characterMatch,searchResults,submitCharacter]);

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', width: '80%' }}
      onSubmit={onSubmit}
    >
      <Input />
      <div style={{ height: '180px', overflow: 'auto' }}>
        {!characterMatch && (
          <Suggestions
            searchResults={searchResults}
            errorStatusCode={responseStatus}
          />
        )}
        {characterMatch
        && (
          <CharacterPresentation
            starWarsCharacter={characterMatch}
            search={search}
          />
        )}
      </div>
      <SearchHistory />
    </form>
  );
};
