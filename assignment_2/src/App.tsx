import React from "react";
import {StarWarsImage} from "./atoms/StarWarsImage";
import {SearchForm} from "./Components/SearchForm/SearchForm";

export const App = () => {
	return <div style={{
		display: "flex",
		height: "100vh",
		width: "100vw",
		justifyContent: "center",
		backgroundColor: "lightgrey",
	}}>
		<div style={{
			display: "flex",
			width: "800px",
			alignItems: "center",
			flexDirection: "column",
		}}>
			<StarWarsImage/>
			<SearchForm/>
		</div>
	</div>;
};