import React from "react";
import {Input as InputImport} from "./Input";
import {fireEvent, render} from "@testing-library/react";
import {SearchProvider} from "../SearchFormProvider/SearchProvider";

export function withSearchProvider<P>(
	ComponentToWrap: React.ComponentType<P>) {
	return (props: P) => (
		<SearchProvider>
			<ComponentToWrap {...props} />
		</SearchProvider>
	);
}

const Input = withSearchProvider(InputImport);

describe("Input", () => {
	it("should change provider state", () => {
		const {getByRole} = render(<Input/>);
		fireEvent.change(getByRole("search"), { target: { value: "Yoda" } });

		expect(getByRole("search")).toHaveValue("Yoda");
	});
});
