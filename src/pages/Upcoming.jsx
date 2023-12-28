import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";

const Upcoming = () => {
  const [animeData, setAnimeData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [open, setOpen] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?sfw&status=upcoming&page=${currentPage}&q=${searchTerm}`);
      
      const data = await res.json();
      setAnimeData(data.data);
      setTotalPages(data.pagination.last_visible_page);
   
    } catch (error) {
      console.error("Error fetching manga data:", error);
    }
     
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout); // Clear previous timeout
    }

    // Create a new timeout
    const timeoutId = setTimeout(() => {
      getData();
    }, 1000); // Delay in milliseconds

    setSearchTimeout(timeoutId);

    // Cleanup function
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };

  }, [currentPage, searchTerm]);

  const handleFirstClick = () => {
    setAnimeData(null);
    setCurrentPage(1);
  }

  const handleLastClick = () => {
    setAnimeData(null);
    setCurrentPage(totalPages);
  }

  const handlePrevClick = () => {
    setAnimeData(null);

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setAnimeData(null);

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when performing a new search
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset current page when performing a new search
  };


  if (!animeData) {
    return (
      <>
        <div className="px-8 py-4 mt-4 bg-white border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
          <div>
            <h1 className="text-2xl my-4 text-slate-950 animate-bounce">Loading</h1>
          </div>
        </div>
      </>
    ); 
  } 

  if (animeData.length === 0) {
    return (
      <>
      <div className="flex justify-end gap-2 sticky top-24">
        <input
          className="w-28 xs:w-72 md:w-72 lg:w-72 xl:w-72 mt-4 items-baseline flex absolute bottom-4 mx-4 border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onSubmit={handleSearchSubmit}
          placeholder="Search Anime Ongoing"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
        <div className="px-8 py-4 mt-4 bg-white border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
          <div>
            <h1 className="text-2xl my-4 text-slate-950 animate-bounce">No Found</h1>
          </div>
        </div>
      </>
    ); 
  }

  return (
    <>
      <div className="flex justify-end gap-2 sticky top-24">
        <input
          className="w-28 xs:w-72 md:w-72 lg:w-72 xl:w-72 mt-4 items-baseline flex absolute bottom-4 mx-4 border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onSubmit={handleSearchSubmit}
          placeholder="Search Anime Upcoming"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filter */}
      <div className="flex justify-end sticky top-24 mt-2">
        <div className="inline-block text-left mx-4 relative ">
          <div>
            <button
              type="button"
              className="inline-flex mt-2 w-72 justify-center gap-x-1.5 text-slate-950 bg-[#B8FF9F] hover:bg-[#99fc77] px-3 py-2 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setOpen(!open)}
            >
              Upcoming
              <svg
                className="mt-1 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
          </div>

          <div
            className={classNames(
              "w-72 absolute z-10 mt-2 origin-top-right bg-[#99fc77] text-slate-950 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black",
              { hidden: !open }
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div role="none">
              {/* <a
                href=""
                className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
                role="menuitem"
                id="menu-item-2"
              >
                Ongoing
              </a> */}
              <form method="POST" action="#" role="none">
              <Link to="/">
                <button
                  // type="submit"
                  className="block w-full border-black border-b-2 px-4 py-2 text-left text-sm hover:bg-[#B8FF9F] hover:font-medium"
                  // role="menuitem"
                  // tabindex="-1"
                  // id="menu-item-3"
                >
                  All
                </button>
              </Link>

              <Link to="/Complete">
                <button
                  // type="submit"
                  className="block w-full border-black border-b-2 px-4 py-2 text-left text-sm hover:bg-[#B8FF9F] hover:font-medium"
                  // role="menuitem"
                  // tabindex="-1"
                  // id="menu-item-3"
                >
                  Complete
                </button>
              </Link>


              <Link to="/Ongoing">
                <button
                  // type="submit"
                  className="block w-full border-black border-b-2 px-4 py-2 text-left text-sm hover:bg-[#B8FF9F] hover:font-medium"
                  // role="menuitem"
                  // tabindex="-1"
                  // id="menu-item-3"
                >
                  Ongoing
                </button>
              </Link>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-1 gap-4 mb-4">
        {animeData.map((anime) => (
          <Link key={anime.mal_id} to={`/DetailAnime/${anime.mal_id}`}>
            <div
              key={anime.mal_id}
              className="mt-8 text-slate-950 border-black border-4 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]"
            >
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
                    <div className="flex justify-between">
                      <strong className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#EAB308"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {anime.score}
                      </strong>
                      <p className="text-xs p-2 border-black border-2 bg-[#FFA6F6] hover:bg-[#fa8cef] active:bg-[#f774ea] w-fit">
                      <strong>{anime.genres[0] && anime.genres[0].name}</strong>
                    </p>
                    </div>
                  </div>
                </article>
              </a>
            </div>
          </Link>
        ))}
        <Outlet />
      </div>

      <div className="flex justify-center items-baseline space-x-4 p-4 border-black border-2 bg-[#FFBDC4] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <button
          className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF] ${
            currentPage === 1 ? "hidden" : ""
          }`}
          onClick={handleFirstClick}
          disabled={currentPage === 1}
        >
          First
        </button>

        <button
          className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF] ${
            currentPage === 1 ? "hidden" : ""
          }`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <p className="text-slate-950">
          Page {currentPage} | {totalPages}
        </p>

        <button
          className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF] ${
            currentPage === totalPages ? "hidden" : ""
          } `}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <button
          className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF] ${
            currentPage === totalPages ? "hidden" : ""
          }`}
          onClick={handleLastClick}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>

      <p className="text-slate-950 mt-4 ">
        Designed and developed by{" "}
        <a
          href="https://github.com/yulidarmaulana"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-950 bg-yellow-300 hover:bg-yellow-500 p-2"
        >
          Yulidar
        </a>{" "}
        | powered by{" "}
        <a
          href="http://jikan.moe/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-950 bg-sky-300 hover:bg-sky-500 p-2"
        >
          Jikan
        </a>
      </p>
    </>
  );
};

export default Upcoming;
