import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {

  const {pathname} = useLocation();
  // console.log(pathname);

  return (
    <>
      <h1 className="text-6xl mb-4 font-public-sans font-semibold text-slate-950"> - Anymelist - </h1>

      <div className="flex justify-between items-baseline space-x-4 p-4 border-black border-2 bg-[#FFBDC4] shadow-[4px_4px_0px_rgba(0,0,0,1)]">

      <div className="space-x-4">
      
        <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 ${pathname === "/" ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)]" : ""} `}>
            <Link to="/">Home</Link>
        </button>

        <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 ${pathname === "/Popular" ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)]" : ""} `}>
            <Link to="/Popular">Popular</Link>
        </button>

        <button className={`h-12 border-black border-2 p-2.5 bg-[#A6FAFF] text-slate-950 ${pathname === "/Manga" ? "bg-[#79F7FF] shadow-[4px_4px_0px_rgba(0,0,0,2)]" : ""} `}>
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
