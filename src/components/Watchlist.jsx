import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { genreIds } from "../util/genre";

const Watchlist = ({ watchlist, setWatchList, handleRemoveFromWatchList }) => {
	const [search, setSearch] = useState("");
	const [genreList, setGenreList] = useState(["All Genres"]);
	const [currGenre, setCurrGenre] = useState("All Genres");

	const handleFilter = (genre) => {
		setCurrGenre(genre);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const sortIncreasing = () => {
		let sortedIncreasing = watchlist.sort((movieA, movieB) => {
			return movieA.vote_average - movieB.vote_average;
		});

		setWatchList([...sortedIncreasing]);
	};

	const sortDecreasing = () => {
		let sortedDecreasing = watchlist.sort((movieA, movieB) => {
			return movieB.vote_average - movieA.vote_average;
		});

		setWatchList([...sortedDecreasing]);
	};

	useEffect(() => {
		let temp = watchlist.map((movie) => {
			return genreIds[movie.genre_ids[0]];
		});
		temp = new Set(temp);
		setGenreList(["All Genres", ...temp]);
		console.log(temp);
	}, [watchlist]);

	return (
		<>
			<div className="flex justify-center flex-wrap m-4 gap-4">
				{genreList.map((genre, index) => {
					return (
						<div
							onClick={() => handleFilter(genre)}
							key={index}
							className={
								currGenre == genre
									? "bg-blue-500 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center hover:cursor-pointer"
									: "bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center hover:cursor-pointer"
							}>
							{genre}
						</div>
					);
				})}
			</div>
			<div className="flex justify-center my-4">
				<input
					type="text"
					className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
					placeholder="Search for movies"
					onInput={handleSearch}
				/>
			</div>
			<div className="border border-gray-200 m-8 rounded-lg overflow-hidden">
				<table className="w-full text-gray-500 text-center">
					<thead className="border-b-2">
						<tr>
							<th>Name</th>
							<th className="flex justify-center">
								<div
									className="h-[10px] w-[10px] mt-1.5 mx-4 hover:cursor-pointer"
									onClick={sortIncreasing}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
										<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
									</svg>
								</div>
								<div>Ratings</div>
								<div
									className="h-[10px] w-[10px] mt-1.5 mx-4 hover:cursor-pointer"
									onClick={sortDecreasing}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
										<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
									</svg>
								</div>
							</th>
							<th>Popularity</th>
							<th>Genre</th>
						</tr>
					</thead>
					<tbody>
						{watchlist
							.filter((movieObj) => {
								return movieObj.title
									.toLowerCase()
									.includes(search.toLocaleLowerCase());
							})
							.filter((movieObj) => {
								if (currGenre == "All Genres") return true;
								else {
									return genreIds[movieObj.genre_ids[0]] == currGenre;
								}
							})
							.map((movieObj) => {
								return (
									<tr className="border" key={movieObj.id}>
										<td className="flex items-center px-6 py-4">
											<img
												src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
												alt="poster"
												className="h-[6rem] w-[10rem]"
											/>
											<div className="mx-10">{movieObj.title}</div>
										</td>
										<td>{movieObj.vote_average}</td>
										<td>{movieObj.popularity}</td>
										<td>{genreIds[movieObj.genre_ids[0]]}</td>
										<td
											className="text-red-800 hover:bg-gray-200 hover:cursor-pointer"
											onClick={() => handleRemoveFromWatchList(movieObj)}>
											Delete
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
};

Watchlist.propTypes = {
	watchlist: PropTypes.array.isRequired,
	setWatchList: PropTypes.func.isRequired,
	handleRemoveFromWatchList: PropTypes.func.isRequired,
};

export default Watchlist;
