import React from "react";
import {Input} from "./organisms/Input/Input";
import {useStarWarsSearch} from "./organisms/Suggestions/hooks/useStarWarsSearch";

export const SearchForm: React.FC = () => {
	const {searchResults, responseStatus} = useStarWarsSearch();

	return (
		<form style={{display: "flex", flexDirection: "column", width: "80%"}}>
			<Input/>
		</form>
	);
};