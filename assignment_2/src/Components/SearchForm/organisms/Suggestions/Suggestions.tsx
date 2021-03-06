import React from "react";
import {StarWarsCharacter} from "./hooks/useStarWarsSearch";
import {useSearch} from "../../../../providers/SearchFormProvider/SearchFormProvider";

type SuggestionsProps = {
  searchResults?: StarWarsCharacter[]
  errorStatusCode?: number;
}

export const Suggestions: React.FC<SuggestionsProps> = ({searchResults, errorStatusCode}: SuggestionsProps) => {
	const {setSearch} = useSearch();

	if (errorStatusCode) {
		return <span style={{color: "red"}}>{`I am sorry, it seems we reached a dead end: ${errorStatusCode}`} </span>;
	}

	if (!searchResults || searchResults.length === 0) {
		return <span> Type to search through all galaxies out there! </span>;
	}

	return (
		<div style={{height:"100%"}}>
			<div style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "white",
				borderRadius: "0.5em",
				padding: "0.5em",
			}}>
				<span>
        Are you looking for:
				</span>
				{searchResults.map(starWarsCharacter => {
					return (
						<a role="option"
							key={starWarsCharacter.name}
							style={{marginTop: "0.2em"}}
							onClick={(e) => {
								e.preventDefault();
								setSearch(starWarsCharacter.name);
							}}>
							{starWarsCharacter.name}
						</a>
					);
				})}
			</div>
		</div>);

};
