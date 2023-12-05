import { useState, useEffect } from "react";
const Home = () => {

  const [animeData, setAnimeData] = useState([]);

  const getData = async () => {
    const res = await fetch("https://api.jikan.moe/v4/top/anime");
    // https://api.jikan.moe/v4/anime?order_by=popularity
    const data = await res.json();
    setAnimeData(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
                <h1 className="text-xl mb-4"> {anime.title} </h1>
                <p className="text-xs mb-4 line-clamp-4">
                  {anime.rating}
                </p>
                <strong>Read More</strong>
              </div>
            </article>
          </a>
        </div>
      ))}

      </div>
      
    </>
  );

};

export default Home;
