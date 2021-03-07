import React, { useContext, useState } from 'react';

const SearchContext = React.createContext(
  {
    search: '', setSearch: () => null,
  },
);

// Ignore this rule as we know we have children
// eslint-disable-next-line react/prop-types
export const SearchFormProvider = ({ children }) => {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
