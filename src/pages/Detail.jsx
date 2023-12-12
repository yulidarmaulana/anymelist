import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = () => {

    const [detailManga, setdetailManga] = useState({});
    const animeId = useParams().mal_id;
  
    const getData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${animeId}`);
        const data = await res.json();
        setdetailManga(data.data);
      } catch (error) {
        console.error("Error fetching manga details:", error);
      }
    };
  
    useEffect(() => {
      getData();
    }); 
  
    return (
      <>
       <button className="h-12 border-black border-2 p-2 mt-4 flex justify-start bg-[#A6FAFF] text-slate-950 hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,2)] active:bg-[#00E1EF]">
            <Link to="/Manga">back</Link>
        </button>

        {Object.keys(detailManga).length > 0 && (
          <div className="w-full mt-8 h-fit text-slate-950 border-black border-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-[#F2F7F5]">
            <article className="w-full h-full">
              <figure className="w-full h-1/2 border-black border-b-2">
                <img
                  src={detailManga.images.jpg.image_url}
                  alt={detailManga.title}
                  className="w-full h-64 object-contain"
                />
              </figure>
              <div className="px-6 py-5 text-left h-full">
                <p className="text-base mb-4">{detailManga.release_date}</p>
                <h1 className="text-[32px] mb-4">{detailManga.title}</h1>
                <p className="text-xs mb-4 line-clamp-4">{detailManga.synopsis}</p>
                <p>Status : <strong>{detailManga.genres[1].name}</strong></p> 
              </div>
            </article>
          </div>
        )}
      </>
    );
};

export default Detail;
