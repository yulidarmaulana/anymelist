import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Detail = () => {
  const [detailManga, setdetailManga] = useState();
  const [recommendations, setRecommendations] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const mangaId = useParams().mal_id;

  const getData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`);
      const data = await res.json();
      setdetailManga(data.data);

      // Ambil rekomendasi manga
      const recommendationsRes = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/recommendations`);
      const recommendationsData = await recommendationsRes.json();
      setRecommendations(recommendationsData.data);

    } catch (error) {
      console.error("Error fetching manga details:", error);
      
    }

}
    
  useEffect(() => {
    getData();
  });

  if (!detailManga) {
    return (
      <>
        <div className="px-8 py-4 mt-4 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
          <div>
            <h1 className="text-2xl my-4 text-slate-950">Loading...</h1>
          </div>
        </div>
      </>
    ); 
  }

  return (
    <>
   {/* <div className="flex justify-end gap-2 sticky top-24">
        <input
          className="w-28 xs:w-72 md:w-72 lg:w-72 xl:w-72 mt-4 items-baseline flex absolute bottom-4 mx-4 border-black border-2 p-2.5 text-slate-950  bg-[#A6FAFF] focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onSubmit={handleSearchSubmit}
          placeholder="Search Anime Ongoing"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div> */}
      
      <button className="h-12 border-black border-2 p-2 flex justify-start sticky top-24 mt-4 bg-yellow-200 hover:bg-yellow-300 text-slate-950 hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-yellow-400">
        <Link to="/Manga">back</Link>
      </button>

      {Object.keys(detailManga).length > 0 && (
        <div className="w-full mt-8 text-slate-950 border-black border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
          <article className="w-full h-full flex">
            <img
              src={detailManga.images.jpg.image_url}
              alt={detailManga.title}
              className="h-72 object-contain border-black border-2"
            />
            <div className="px-6 text-left h-full">
              <p className="text-base mb-4">{detailManga.release_date}</p>
              <h1 className="text-[32px] font-public-sans font-semibold">{detailManga.title}</h1>
              <p className="text-xs">
                Author : <strong>{detailManga.authors[0].name}</strong>
              </p>
              <p className="text-xs mb-6">
                Date : <strong>{detailManga.published.string}</strong>
              </p>
              <p className="text-xs mb-4 line-clamp-4">
                {detailManga.synopsis}
              </p>
              <div className="flex gap-4">
                <p>
                  Volumes : <strong>{detailManga.volumes}</strong>
                </p>
                <p>
                  Genre : <strong>{detailManga.genres[0].name}</strong>
                </p>
                <p>
                  Status : <strong>{detailManga.status}</strong>
                </p>
                <p>
                  Score : <strong>{detailManga.score}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
      )}

      <div className="">
        {recommendations.length > 0 && (
          <p className="text-2xl mt-6 font-public-sans font-semibold text-slate-50">
            Recommendation
          </p>
        )}
      </div>

      <div className="grid xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-1 gap-4 mb-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.entry.mal_id}
            className="mt-8 text-slate-950 border-black border-4 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]"
          >
            <Link
              key={recommendation.entry.mal_id}
              to={`/Detail/${recommendation.entry.mal_id}`}
            >
              <article className="w-full h-full">
                <figure className="w-full border-black border-b-2">
                  <img
                    src={recommendation.entry.images.jpg.image_url}
                    alt={recommendation.entry.title}
                    className="object-fill h-64 w-full"
                  />
                </figure>
                <div className="px-6 py-5 text-left h-fit">
                  <h1 className="text-xl truncate">
                    {" "}
                    {recommendation.entry.title}{" "}
                  </h1>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      <p className="text-slate-50 mt-4 ">
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

export default Detail;
