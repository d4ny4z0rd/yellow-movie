const Banner = () => {
	return (
		<div
			style={{
				backgroundImage: `url(https://149367133.v2.pressablecdn.com/wp-content/uploads/2024/02/Kung-Fu-Panda-4_character-posters-20240212.jpg)`,
			}}
			className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end">
			<div className="text-white text-2xl bg-blue-900/60 p-4 text-center w-full">
				Kung Fu Panda 4
			</div>
		</div>
	);
};

export default Banner;
