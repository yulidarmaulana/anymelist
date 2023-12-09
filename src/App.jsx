import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './pages/Layout'
import Home from './pages/Home'
import Popular from './pages/Popular'
import Manga from './pages/Manga'
import NoPage from './pages/NoPage'
import Detail from './pages/Detail'


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
