import React, {useContext, useState} from "react";

type SearchState = {
  search: string;
};

type SearchAction = {
  setSearch(search: string): void;
};

const SearchContext = React.createContext<SearchState & SearchAction>(
	{
		search: "", setSearch: () => null,
	});

// Ignore this rule as we know we have children
// eslint-disable-next-line react/prop-types
export const SearchFormProvider: React.FC = ({children}) => {
	const [search, setSearch] = useState("");

	return (
		<SearchContext.Provider value={{search, setSearch}}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => useContext(SearchContext);