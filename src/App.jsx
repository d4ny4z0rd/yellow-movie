import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/Watchlist";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";

function App() {
	const [watchlist, setWatchList] = useState([]);

	const handleAddtoWatchList = (movieObj) => {
		let newWatchList = [...watchlist, movieObj];
		setWatchList(newWatchList);
		localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
		console.log(newWatchList);
	};

	const handleRemoveFromWatchList = (movieObj) => {
		let filteredWatchList = watchlist.filter((movie) => {
			return movie.id != movieObj.id;
		});
		localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
		setWatchList(filteredWatchList);
		console.log(filteredWatchList);
	};

	useEffect(() => {
		let moviesFromLocalStorage = localStorage.getItem("moviesApp");
		if (!moviesFromLocalStorage) return;
		setWatchList(JSON.parse(moviesFromLocalStorage));
	}, []);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Banner />
								<Movies
									watchlist={watchlist}
									handleAddtoWatchList={handleAddtoWatchList}
									handleRemoveFromWatchList={handleRemoveFromWatchList}
								/>
							</>
						}
					/>
					<Route
						path="/watchlist"
						element={
							<WatchList
								watchlist={watchlist}
								setWatchList={setWatchList}
								handleRemoveFromWatchList={handleRemoveFromWatchList}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
