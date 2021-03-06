import * as React from "react";
import {useSearch} from "../../../../providers/SearchFormProvider/SearchFormProvider";

export const Input: React.FC = () => {
	const {search, setSearch} = useSearch();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	return (
		<input role="search"
			type="search"
			placeholder="Search for your favourite Star Wars character"
			onChange={onChange}
			value={search}
			style={{
				height: "3em",
				padding: "0.5em",
				borderRadius: "0.5em",
				border: 0,
				marginBottom:"0.5em"
			}}/>
	);
};