import { PropTypes } from "prop-types";

const MovieCard = ({
	posterPath,
	name,
	handleAddtoWatchList,
	movie,
	handleRemoveFromWatchList,
	watchlist,
}) => {
	const doesContain = (movie) => {
		for (let i = 0; i < watchlist.length; i++) {
			if (watchlist[i].id == movie.id) return true;
		}
		return false;
	};

	return (
		<>
			<div
				className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:cursor-pointer hover:scale-110 duration-300 relative"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${posterPath})`,
				}}>
				{doesContain(movie) ? (
					<div
						className="bg-gray-900/60 h-[2rem] w-[2rem] flex justify-center items-center rounded-xl top-1 right-1 absolute"
						onClick={() => handleRemoveFromWatchList(movie)}>
						&#10060;
					</div>
				) : (
					<div
						className="bg-gray-900/60 h-[2rem] w-[2rem] flex justify-center items-center rounded-xl top-1 right-1 absolute"
						onClick={() => handleAddtoWatchList(movie)}>
						&#128525;
					</div>
				)}
				<div className="text-white bg-gray-900/60 rounded-xl text-xl w-full p-2 text-center absolute bottom-0">
					{name}
				</div>
			</div>
		</>
	);
};

MovieCard.propTypes = {
	posterPath: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	handleAddtoWatchList: PropTypes.func.isRequired,
	movie: PropTypes.object.isRequired,
	handleRemoveFromWatchList: PropTypes.func.isRequired,
	watchlist: PropTypes.array.isRequired,
};

export default MovieCard;
