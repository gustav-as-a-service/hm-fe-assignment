import {useCallback, useEffect, useState} from "react";

type SearchHistoryItem = {
  date: string;
  search: string;
}

export const useSearchHistory = () => {
	const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

	const appendSearchItem = useCallback((search: string) => {
		const newSearchHistory = [...searchHistory, {search, date: Date.now()}];
		localStorage.setItem("starWarsSearch", JSON.stringify(newSearchHistory));

	}, [searchHistory]);

	const deleteSearchItem = useCallback((indexToDelete: number) => {
		const newSearchHistory = searchHistory.filter(
			(value, index) => index !== indexToDelete);
		setSearchHistory(newSearchHistory);
		localStorage.setItem("starWarsSearch", JSON.stringify(newSearchHistory));

	}, [searchHistory]);

	// We only care about showing history when user re-mounts the component, i.e. refresh page, hence
	// we use this hook
	useEffect(() => {
		const searchHistoryFromLocalStorage = localStorage.getItem("starWarsSearch");

		if (searchHistoryFromLocalStorage) {
			const parsedSearchHistoryFromLocalStorage = JSON.parse(searchHistoryFromLocalStorage);
			setSearchHistory(parsedSearchHistoryFromLocalStorage as SearchHistoryItem[]);
		}
	}, []);

	return {searchHistory, appendSearchItem, deleteSearchItem};
};

