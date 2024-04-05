import { Link } from "react-router-dom";
import Logo from "../assets/reshot-icon-movie-PNZC2V5FBK.svg";

const Navbar = () => {
	return (
		<div className="flex border space-x-8 items-center pl-3 py-4">
			<img src={Logo} className="w-[50px]" alt="" />
			<Link to="/" className="text-blue-500 text-3xl font-bold">
				Movies
			</Link>
			<Link to="/watchlist" className="text-blue-500 text-3xl font-bold">
				WatchList
			</Link>
		</div>
	);
};

export default Navbar;
