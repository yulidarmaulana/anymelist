import {useState, useEffect} from 'react';
import { useParams , Link} from "react-router-dom";
// import Iframe from 'react-iframe'

const DetailAnime = () => {
    const [detailAnime, setDetailAnime] = useState();
    const [recommendations, setRecommendations] = useState([]);
    const [character, setCharacters] = useState([]);
    const animeId = useParams().mal_id;

    const getData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        const data = await res.json();
        setDetailAnime(data.data);

        const recommendationsRes = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
        const recommendationsData = await recommendationsRes.json();
        setRecommendations(recommendationsData.data);

        const charactersRes = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
        const charactersData = await charactersRes.json();
        setCharacters(charactersData.data);


  }catch (error) {
    console.error("Error fetching anime details:", error);
  }
};

useEffect(() => {    
  getData();
})

  if (!detailAnime) {
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
        <Link to="/">back</Link>
      </button>

      {Object.keys(detailAnime).length > 0 && (
        <div className="w-full mt-8 text-slate-950 border-black border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
          <article className="w-full h-full flex flex-col md:flex-row lg:flex-row xl:flex-row">
            <img
              src={detailAnime.images.jpg.image_url}
              alt={detailAnime.title}
              className="h-72 object-contain border-black border-2"
            />
            <div className="px-6 py-5 text-left h-full">
              <div className="flex gap-4">
                <h1 className="text-[32px] mb-2 font-public-sans font-semibold text-slate-950">{detailAnime.title}</h1>
                <strong className="flex items-center mb-2 gap-2">
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
                  {detailAnime.score}
                </strong>
              </div>

              <p className="text-xs p-2 border-black border-2 bg-[#FFA6F6] hover:bg-[#fa8cef] active:bg-[#f774ea] w-fit">
                <strong>{detailAnime.genres[0].name}</strong>
              </p>
              <p className="text-xs mb-6">
                {/* Date : <strong>{detailAnime.published.string}</strong> */}
              </p>
              <p className="text-xs mb-4 line-clamp-4">
                {detailAnime.synopsis}
              </p>
              <div className="flex gap-4">
                <p>
                  Status : <strong>{detailAnime.status}</strong>
                </p>
                <p>
                  Rank : <strong>{detailAnime.rank}</strong>
                </p>
                <p>
                  Score : <strong>{detailAnime.score}</strong>
                </p>
                <p>
                  Rating : <strong>{detailAnime.rating}</strong>
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <p>
                  <strong>{detailAnime.type}</strong>
                </p>
                <span>|</span>
                <p>
                  <strong>{detailAnime.season}</strong>
                </p>
                <span>|</span>
                <p>
                  <strong>{detailAnime.year}</strong>
                </p>
                <span>|</span>
                <p>
                  <strong>{detailAnime.duration}</strong>
                </p>
                <span>|</span>
                <p>
                  <strong>{detailAnime.episodes} Ep</strong>
                </p>
              </div>
              
            </div>

            
          </article>

          <div className="m-6 mt-8 text-slate-950 border-black border-2 shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
            {detailAnime.trailer.embed_url && (
              <p className="text-2xl font-public-sans font-semibold text-slate-950 p-3">Trailer</p>
            )}
             <div className="flex justify-center">
               <iframe
                 src={detailAnime.trailer.embed_url}
                 title="YouTube video player"
                 height="520"
                 width={"100%"}
                //  className="w-full"
                 allow="clipboard-write autoplay=1 ; encrypted-media; gyroscope; picture-in-picture allowfullscreen;"
                 frameBorder="0"
                 allowFullScreen
               ></iframe>
             </div>  
          </div>          

          <p className="text-2xl mt-6 font-public-sans font-semibold text-slate-950">
           Character
          </p>

          <div className="flex justify-center">
            {character.filter((character) => character.role == "Main").slice(0, 5).map((character) => (
              <div className="m-4 mt-6 h-fit" key={character.mal_id}>
                <div className="bg-[#F2F7F5] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
                  <div>
                    <h1 className="text-xl mb-4">
                      {character.character.name}
                    </h1>
                    <div className="flex mx-auto justify-center">
                      <img
                        className="object-contain"
                        src={character.character.images.jpg.image_url}
                        alt={character.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
        {recommendations.slice(0, 10).map((recommendation) => (
          <div
            key={recommendation.entry.mal_id}
            className="mt-8 text-slate-950 border-black border-4 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]"
          >
            <Link
              key={recommendation.entry.mal_id}
              to={`/DetailAnime/${recommendation.entry.mal_id}`}              
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
                  <h1 className="text-xl mb-4 truncate">
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
}

export default DetailAnime;