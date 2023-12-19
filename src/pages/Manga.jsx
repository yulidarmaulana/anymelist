import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
// import classNames from "classnames";



const Manga = () => {
  // const [open, setOpen] = useState(false);

  const [mangaData, setAnimeData] = useState();
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
    }, 1000); // Ganti angka 1000 dengan jumlah milidetik yang diinginkan

    setSearchTimeout(timeoutId);

    // Bersihkan timeout saat komponen tidak lagi ter-render
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
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset current page when performing a new search
  };

  if (!mangaData) {
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
  

  return (
    <>
      <div className="flex justify-end gap-2 sticky top-24">
        <input
          className="w-28 xs:w-72 md:w-72 lg:w-72 xl:w-72 items-baseline flex absolute bottom-4 mx-4 border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onSubmit={handleSearchSubmit}
          placeholder="Search Manga"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-1 gap-4 mb-4">
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

        <p className="text-slate-950">Page {currentPage} | {totalPages}</p>

        <button
          className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF] ${
            currentPage === totalPages ? "hidden" : ""
          }`}
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
       
      <p className="text-slate-950 mt-4 ">Designed and developed by <a href="https://github.com/yulidarmaulana" target="_blank" rel="noopener noreferrer" className="text-slate-950 bg-yellow-300 hover:bg-yellow-500 p-2">Yulidar</a> | powered by <a href="http://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-slate-950 bg-sky-300 hover:bg-sky-500 p-2">Jikan</a></p>

    </>
  );
  };
  
  export default Manga;