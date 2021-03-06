import React from "react";
import {useSearchHistory} from "../hooks/useSearchHistory/useSearchHistory";

export const SearchHistory: React.FC = () => {
	const {searchHistory, deleteSearchItem} = useSearchHistory();

	if (searchHistory.length === 0) {
		return null;
	}

	return (
		<div>
			<p>These are recent inter-galactic searches from your device:</p>
			{searchHistory.map((searchHistoryItem,index) => {
				return (
					<div style={{
						paddingLeft: "1em",
						borderLeft: "0.2em solid black",
						display: "flex",
						width: "100%",
						marginBottom: "1em",
						justifyContent:"space-between"
					}}
					key={searchHistoryItem.date}>
						<div>
							{searchHistoryItem.search}<br/>
							<i>{new Date(searchHistoryItem.date).toLocaleDateString("sv-SE")}</i>
						</div>
						<button onClick={() => deleteSearchItem(index)} type="button" style={{
							backgroundColor: "unset",
							border: "unset",
							cursor:"pointer",
							padding:"0",
							fontSize: "2em",
						}}>{"\u00D7"}</button>
					</div>
				);
			})}
		</div>
	);
};