import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './pages/Layout'
import Anime from './pages/Anime'
import Popular from './pages/Popular'
import Manga from './pages/Manga'
import NoPage from './pages/NoPage'
import Detail from './pages/Detail'


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Anime />} />
          <Route path="Popular" element={<Popular />} />
          <Route path="Manga" element={<Manga />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/Detail/:mal_id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
