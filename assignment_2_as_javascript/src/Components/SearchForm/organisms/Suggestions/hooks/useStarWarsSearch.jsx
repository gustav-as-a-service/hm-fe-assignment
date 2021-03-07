import { useEffect, useState } from 'react';
import { useSearch as useSearchImport } from '../../../../../providers/SearchFormProvider/SearchFormProvider';
import { api as apiImport } from '../../../../../api/api';

export const useStarWarsSearch = ({
  useSearch = useSearchImport,
  api = apiImport,
} = {}) => {
  const { search } = useSearch();
  const [searchResults, setSearchResults] = useState(undefined);
  const [responseStatus, setResponseStatus] = useState(undefined);

  const naiveRateLimit = (searchStringLength) => {
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
  }, [search, api]);

  return { searchResults, responseStatus };
};
