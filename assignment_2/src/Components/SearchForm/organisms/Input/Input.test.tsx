import React from "react";
import {Input as InputImport} from "./Input";
import {fireEvent, render} from "@testing-library/react";
import {SearchFormProvider} from "../../../../providers/SearchFormProvider/SearchFormProvider";

export function withSearchProvider<P>(
	ComponentToWrap: React.ComponentType<P>) {
	return (props: P) => (
		<SearchFormProvider>
			<ComponentToWrap {...props} />
		</SearchFormProvider>
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
