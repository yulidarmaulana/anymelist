import { useState, useEffect } from "react";
const Anime = () => {

  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?page=${currentPage}`);
    // https://api.jikan.moe/v4/anime?order_by=popularity

    const data = await res.json();
    setAnimeData(data.data);
    setTotalPages(data.pagination.last_visible_page);

  };

  useEffect(() => {
    getData();
  }, [currentPage]);


  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {/* <h1 className="text-2xl mb-4 font-public-sans font-semibold text-slate-950">
        Popular
      </h1> */}

      <div className="grid grid-cols-4 gap-4 mb-4">

      {animeData.map((anime) => (
        <div key={anime.mal_id} className="mt-8 text-slate-950 border-black border-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
          <a href="" className="block cursor-pointer">
            <article className="w-full h-full">
              <figure className="w-full border-black border-b-2">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className=" object-fill h-64 w-full"
                />
              </figure>
              <div className="px-6 py-5 text-left h-full">
                {/* <p className="text-base mb-4">May 15th, 2023</p> */}
                <h1 className="text-xl mb-4 truncate"> {anime.title} </h1>
                <p className="text-xs mb-4 line-clamp-4 truncate">
                  {anime.synopsis}
                </p>
                <strong>{anime.score}</strong>
              </div>
            </article>
          </a>
        </div>
      ))}

      </div>
      

      <div className="flex justify-center items-baseline space-x-4 p-4 border-black border-2 bg-[#FFBDC4] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <button
          className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF]"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <p className="text-slate-950">
          {currentPage} / {totalPages}
        </p>

        <button
          className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF]"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );

};

export default Anime;
