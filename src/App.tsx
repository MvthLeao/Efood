import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { GlobalCss } from './styled'
import Inicial from './components/pages/Inicial/index'
import Categories from './components/pages/Categories'
import Cardapio from './components/Cardapio'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Inicial />} />
    <Route path="/categories:restauranteId" element={<Categories />} />
    <Route path="/produto" element={<Cardapio restauranteId="1" />} />{' '}
    {/* Ajustado */}
  </Routes>
)

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />
      <Rotas />
      <Footer />
    </BrowserRouter>
  )
}

export default App
