import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Hero from "./pages/Hero";
import Anime from "./pages/Anime";
import DetailAnime from "./pages/DetailAnime";
import Complete from "./pages/Complete";
import Upcoming from "./pages/Upcoming";
import Ongoing from "./pages/Ongoing";
import Manga from "./pages/Manga";
import Detail from "./pages/Detail";
import CompleteManga from "./pages/manga/CompleteManga";
import PublishingManga from "./pages/manga/PublishingManga";
import HiatusManga from "./pages/manga/HiatusManga";
import DiscontinuedManga from "./pages/manga/DiscontinuedManga";
import NoPage from "./pages/NoPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />}>
          <Route path="/" element={<Layout />}>
              
              <Route index element={<Anime />} />
              <Route path="Complete" element={<Complete />} />
              <Route path="Upcoming" element={<Upcoming />} />
              <Route path="Ongoing" element={<Ongoing />} />
              
              <Route path="*" element={<NoPage />} />

              <Route path="Manga" element={<Manga />} />
              <Route path="Manga/Complete" element={<CompleteManga />} />
              <Route path="Manga/Publishing" element={<PublishingManga />} />
              <Route path="Manga/Hiatus" element={<HiatusManga />} />
              <Route path="Manga/Discontinued" element={<DiscontinuedManga />} />
              <Route path="/Detail/:mal_id" element={<Detail />} />
              <Route path="/DetailAnime/:mal_id" element={<DetailAnime />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
