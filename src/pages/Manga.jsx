import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const Manga = () => {
  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const getData = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/manga?page=${currentPage}&q=${searchTerm}`);
    const data = await res.json();
    setAnimeData(data.data);
    setTotalPages(data.pagination.last_visible_page);
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

  return (
    <>

      <div className="flex justify-end">

      <input className="w-72 mt-4  items-baseline border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]" onSubmit={handleSearchSubmit}  placeholder="Search Manga" value={searchTerm} onChange={handleSearch} /> 
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">

      {animeData.map((anime) => (
        <Link key={anime.mal_id} to={`/Detail/${anime.mal_id}`}>
        <div key={anime.mal_id} className="mt-8 text-slate-950 border-black border-4 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
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
                <p className="text-xs mb-4 line-clamp-4">
                  {anime.rating}
                </p>
                {/* <strong>Read More</strong> */}
              </div>
            </article>
          </a>
        </div>
        </Link>
      ))}
      <Outlet />
      </div>
      
      <div className="flex justify-center items-baseline space-x-4 p-4 border-black border-2 bg-[#FFBDC4] shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      {/* <p className="text-slate-950">{currentPage - 1}</p> */}
      <button
          className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF]"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Prev 
        </button>

        <p className="text-slate-950">{currentPage} / {totalPages}</p>

        <button
          className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF]"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        {/* <p className="text-slate-950">{currentPage + 1}</p> */}

      </div>
    </>
  );
  };
  
  export default Manga;