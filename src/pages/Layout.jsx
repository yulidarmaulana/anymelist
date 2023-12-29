import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {

  const {pathname} = useLocation();
  
  const id = pathname.split("/")[2];

  return (
    <>
      {/* <h1 className="text-6xl mb-4 font-public-sans font-semibold text-slate-950"><Link to="/">- Anymelist -</Link>  </h1> */}

      <div className="flex justify-between sticky top-2 items-baseline space-x-4 p-4 border-black border-2 bg-[#FFBDC4] shadow-[4px_4px_0px_rgba(0,0,0,1)]">

      <div className="space-x-4">
      
        <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] hover:font-semibold ${pathname === "/" || pathname === "/Complete" || pathname === "/Ongoing" || pathname === "/Upcoming" || pathname === "/DetailAnime" || pathname === "/DetailAnime/" + id ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)] font-semibold" : ""} `}>
            <Link to="/">Anime</Link>
        </button>

        {/* <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 ${pathname === "/Popular" ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)]" : ""} `}>
            <Link to="/Popular">Popular</Link>
        </button> */}

        {/* <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 ${pathname === "/Recommendations" ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)]" : ""} `}>
            <Link to="/Recommendations">Recommendations</Link>
        </button> */}

        <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] hover:font-semibold ${pathname === "/Manga" || pathname === "/Manga/Complete" || pathname === "/Manga/Publishing" || pathname === "/Manga/Hiatus"  || pathname === "/Manga/Discontinued" || pathname === "/Detail/" + id ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)] font-semibold" : ""} `}>
            <Link to="/Manga">Manga</Link>
        </button>
      
      </div>        

        {/* <input className="w-72 items-baseline border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]" placeholder="Search" /> */}

      </div>


      <Outlet />
    </>
  );
};

export default Layout;
