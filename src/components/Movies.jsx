import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

const Movies = ({
	watchlist,
	handleAddtoWatchList,
	handleRemoveFromWatchList,
}) => {
	const [movies, setMovies] = useState([]);
	const [pageNo, setPageNo] = useState(1);

	const handlePrev = () => {
		if (pageNo == 1) return;
		setPageNo(pageNo - 1);
	};
	const handleNext = () => setPageNo(pageNo + 1);

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/movie/popular?api_key=b8b5c8300709d2079c37d361d2f1a383&language=en-US&page=${pageNo}`
			)
			.then(function (res) {
				setMovies(res.data.results);
			});
	}, [pageNo]);
	return (
		<div className="p-5">
			<div className="text-2xl m-5 font-bold text-center">Treding Movies</div>
			<div className="flex flex-row flex-wrap justify-around gap-5 m-10">
				{movies.map((movie, index) => (
					<MovieCard
						posterPath={movie.poster_path}
						key={index}
						name={movie.original_title}
						handleAddtoWatchList={handleAddtoWatchList}
						movie={movie}
						handleRemoveFromWatchList={handleRemoveFromWatchList}
						watchlist={watchlist}
					/>
				))}
			</div>
			<Pagination
				handleNext={handleNext}
				handlePrev={handlePrev}
				pageNo={pageNo}
			/>
		</div>
	);
};

Movies.propTypes = {
	watchlist: PropTypes.array.isRequired,
	handleAddtoWatchList: PropTypes.func.isRequired,
	handleRemoveFromWatchList: PropTypes.func.isRequired,
};

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=b8b5c8300709d2079c37d361d2f1a383&language=en-US&page=1
