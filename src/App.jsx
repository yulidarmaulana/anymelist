import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Hero from "./pages/Hero";
import Anime from "./pages/Anime";
import Upcoming from "./pages/Upcoming";
import Ongoing from "./pages/Ongoing";
import Manga from "./pages/Manga";
import NoPage from "./pages/NoPage";
import Detail from "./pages/Detail";
import DetailAnime from "./pages/DetailAnime";
import Top from "./pages/Top";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Anime />} />
            <Route path="Top" element={<Top />} />
            <Route path="Upcoming" element={<Upcoming />} />
            <Route path="Ongoing" element={<Ongoing />} />
            <Route path="Manga" element={<Manga />} />
            <Route path="*" element={<NoPage />} />
          <Route path="/Detail/:mal_id" element={<Detail />} />
          <Route path="/DetailAnime/:mal_id" element={<DetailAnime />} />
          </Route>

        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
