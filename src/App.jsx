import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <BrowserRouter basename='/pokedex/'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemon/:name' element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
