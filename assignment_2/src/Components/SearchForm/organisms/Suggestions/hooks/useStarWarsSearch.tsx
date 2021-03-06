import {useEffect, useState} from "react";
import {useSearch as useSearchImport} from "../../../../../providers/SearchFormProvider/SearchFormProvider";
import {api as apiImport} from "../../../../../api/api";

export type StarWarsCharacter = {
  "name": string;
  "height": string;
  "mass": string;
  "hair_color": string;
  "skin_color": string;
  "eye_color": string;
  "birth_year": string;
  "gender": string;
  "homeworld": string;
}

type UseStarWarsSearchProps = {
  useSearch?: typeof useSearchImport;
  api?: typeof apiImport
}

export const useStarWarsSearch = ({useSearch = useSearchImport, api = apiImport}: UseStarWarsSearchProps = {}) => {
	const {search} = useSearch();
	const [searchResults, setSearchResults] = useState<StarWarsCharacter[] | undefined>(
		undefined);
	const [responseStatus, setResponseStatus] = useState<number | undefined>(
		undefined);

	useEffect(() => {
		if (search.length > 0) {
			api.getPeople(search).then(response => {
				if (response.status !== 200) {
					throw response.status;
				}

				return response.json();
			}).then(({results}) => {
				setSearchResults(results);
			}).catch((error) => {
				setResponseStatus(error);
			});
		}

		if (search.length === 0) {
			setSearchResults(undefined);
		}
	}, [search]);

	return {searchResults, responseStatus};
};