import React from "react";
import { Input } from "./organisms/Input/Input";
import {
	SearchProvider,
} from "./organisms/SearchFormProvider/SearchProvider";

export const SearchForm: React.FC = () => {
	return (
		<SearchProvider>
			<Input/>
		</SearchProvider>
	);
};