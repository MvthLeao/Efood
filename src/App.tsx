import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom'
import Footer from './components/Footer'
import { GlobalCss } from './styled'
import Inicial from './components/pages/Inicial/index'
import Categories from './components/pages/Categories'
import Produto from './components/Produto'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Inicial />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/listitaly" element={<Produto />} />
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
