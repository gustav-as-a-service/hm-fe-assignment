import { useEffect, useState } from 'react';
import { useSearch as useSearchImport } from '../../../../../providers/SearchFormProvider/SearchFormProvider';
import { api as apiImport } from '../../../../../api/api';

export type StarWarsCharacter = {
  'name': string;
  'height': string;
  'mass': string;
  'hair_color': string;
  'skin_color': string;
  'eye_color': string;
  'birth_year': string;
  'gender': string;
  'homeworld': string;
};

type UseStarWarsSearchProps = {
  useSearch?: typeof useSearchImport;
  api?: typeof apiImport
};

export const useStarWarsSearch = ({
  useSearch = useSearchImport,
  api = apiImport,
}: UseStarWarsSearchProps = {}) => {
  const { search } = useSearch();
  const [searchResults, setSearchResults] = useState<StarWarsCharacter[] | undefined>(
    undefined,
  );
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined,
  );

  const naiveRateLimit = (searchStringLength: number): boolean => {
    // return true if we should poll the api

    // We want suggestions on first char
    if (searchStringLength === 1) {
      return true;
    }

    // We want suggestions on every third char
    if (searchStringLength % 3 === 0) {
      return true;
    }

    // We don't bother to look for suggestions if there are more than 6 characters
    if (searchStringLength > 6) {
      return false;
    }

    // Default don't call the api
    return false;
  };

  useEffect(() => {
    const { length: searchStringLength } = search;
    if (searchStringLength > 0) {
      if (naiveRateLimit(searchStringLength)) {
        api.getPeople(search).then((response) => {
          if (response.status !== 200) {
            throw new Error('response.status');
          }

          return response.json();
        }).then(({ results }) => {
          setSearchResults(results);
        }).catch((error) => {
          setResponseStatus(error);
        });
      }
    }

    if (searchStringLength === 0) {
      setSearchResults(undefined);
    }
  }, [search,api]);

  return { searchResults, responseStatus };
};
