import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
// import classNames from "classnames";


const Manga = () => {
  // const [open, setOpen] = useState(false);

  const [mangaData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  // const [filter, setFilter] = useState();


  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga?page=${currentPage}&q=${searchTerm}`);
      const data = await res.json();
      setAnimeData(data.data);
      setTotalPages(data.pagination.last_visible_page);

      // filter manga 
      // const filterRes = await fetch(`https://api.jikan.moe/v4/${filter}/manga?page=${currentPage}&q=${searchTerm}`);
      // const filterData = await filterRes.json();
      // setFilter(filterData.data);


    } catch (error) {
      console.error("Error fetching manga data:", error);
    }

    
  };

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout); // Hapus timeout sebelumnya jika ada
    }

     // Tetapkan timeout baru untuk memicu pencarian setelah beberapa detik
     const timeoutId = setTimeout(() => {
      getData();
    }, 500); // Ganti angka 1000 dengan jumlah milidetik yang diinginkan

    setSearchTimeout(timeoutId);

    // Bersihkan timeout saat komponen tidak lagi ter-render
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };

  }, [currentPage, searchTerm]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset current page when performing a new search
  };

  // const handleFilterChange = (newFilter) => {
  //   setFilter(newFilter);
  // };
  

  return (
    <>
      <div className="flex justify-end">

        {/* <div className="relative inline-block text-left mt-4 mx-2">
          <div>
            <button
              type="button"
              className="inline-flex w-72 text-gray-950 justify-center gap-x-1.5 bg-[#B8FF9F] hover:bg-[#99fc77] px-3 py-2 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setOpen(!open)}
            >
              Filter
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
              "w-72 absolute right-0 z-10 mt-2 origin-top-right text-gray-950 bg-[#B8FF9F] hover:bg-[#99fc77] focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black",
              { hidden: !open }
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div role="none" value={filter} onChange={handleFilterChange}>
              <form method="POST" action="#" role="none">
              <a
                href=""
                className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium"
                role="menuitem"
                onClick={() => handleFilterChange("top")} // Ubah nilai 'top' sesuai kebutuhan
                id="menu-item-0"
              >
                TOP
              </a>
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-[#B8FF9F] hover:font-medium"
                  role="menuitem"
                  id="menu-item-3"
                >
                  -
                </button>
              </form>
            </div>
          </div>
        </div> */}

        <input
          className="w-72 mt-4 items-baseline border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onSubmit={handleSearchSubmit}
          placeholder="Search Manga"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        {mangaData.map((manga) => (
          <Link key={manga.mal_id} to={`/Detail/${manga.mal_id}`}>
            <div
              key={manga.mal_id}
              className="mt-8 text-slate-950 border-black border-4 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]"
            >
              <a href="" className="block cursor-pointer">
                <article className="w-full h-full">
                  <figure className="w-full border-black border-b-2">
                    <img
                      src={manga.images.jpg.image_url}
                      alt={manga.title}
                      className=" object-fill h-64 w-full"
                    />
                  </figure>
                  <div className="px-6 py-5 text-left h-full">
                    <h1 className="text-xl mb-4 truncate"> {manga.title} </h1>
                    <p className="text-base"> {manga.authors[0].name} </p>
                    {/* <strong>{anime.author}</strong> */}
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
  
  export default Manga;