import { useCallback, useEffect, useState } from 'react';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  const appendSearchItem = useCallback((search) => {
    const newSearchHistory = [...searchHistory, { search, date: Date.now() }];
    localStorage.setItem('starWarsSearch', JSON.stringify(newSearchHistory));
  }, [searchHistory]);

  const deleteSearchItem = useCallback((indexToDelete) => {
    const newSearchHistory = searchHistory.filter(
      (value, index) => index !== indexToDelete,
    );
    setSearchHistory(newSearchHistory);
    localStorage.setItem('starWarsSearch', JSON.stringify(newSearchHistory));
  }, [searchHistory]);

  // We only care about showing history when user re-mounts the component, i.e. refresh page, hence
  // we use this hook
  useEffect(() => {
    const searchHistoryFromLocalStorage = localStorage.getItem(
      'starWarsSearch',
    );

    if (searchHistoryFromLocalStorage) {
      const parsedSearchHistoryFromLocalStorage = JSON.parse(
        searchHistoryFromLocalStorage,
      );
      setSearchHistory(
        parsedSearchHistoryFromLocalStorage,
      );
    }
  }, []);

  return { searchHistory, appendSearchItem, deleteSearchItem };
};
