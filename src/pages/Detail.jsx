import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {

    const [detailAnime, setDetailAnime] = useState({});
    const animeId = useParams().mal_id;
  
    const getData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${animeId}`);
        const data = await res.json();
        setDetailAnime(data.data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      }
    };
  
    useEffect(() => {
      getData();
    }); 
  
    return (
      <>
        {Object.keys(detailAnime).length > 0 && (
          <div className="w-full mt-8 h-fit text-slate-950 border-black border-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
            <article className="w-full h-full">
              <figure className="w-full h-1/2 border-black border-b-2">
                <img
                  src={detailAnime.images.jpg.image_url}
                  alt={detailAnime.title}
                  className="w-full h-64 object-cover"
                />
              </figure>
              <div className="px-6 py-5 text-left h-full">
                <p className="text-base mb-4">{detailAnime.release_date}</p>
                <h1 className="text-[32px] mb-4">{detailAnime.title}</h1>
                <p className="text-xs mb-4 line-clamp-4">{detailAnime.synopsis}</p>
                <strong>Read More</strong>
              </div>
            </article>
          </div>
        )}
      </>
    );
};

export default Detail;
