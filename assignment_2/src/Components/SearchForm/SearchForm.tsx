import React, {useState} from "react";
import {Input} from "./organisms/Input/Input";
import {
	StarWarsCharacter,
	useStarWarsSearch,
} from "./organisms/Suggestions/hooks/useStarWarsSearch";
import {useSearch} from "../../providers/SearchFormProvider/SearchFormProvider";
import {CharacterPresentation} from "./atoms/CharacterPresentation";

export const SearchForm: React.FC = () => {
	const {search} = useSearch();
	const {searchResults, responseStatus} = useStarWarsSearch();
	const [characterMatch, setCharacterMatch] = useState<StarWarsCharacter | undefined>(
		undefined);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchResults) {
			setCharacterMatch(searchResults[0]);
		}
	};

	return (
		<form style={{display: "flex", flexDirection: "column", width: "80%"}}
			onSubmit={onSubmit}>
			<Input/>
			{characterMatch && <CharacterPresentation starWarsCharacter={characterMatch} search={search}/>}
		</form>
	);
};