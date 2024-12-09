import { useParams } from 'react-router-dom'
import Banner from '../../BannerCategoria'
import Cardapio from '../../Cardapio'

const Categories = () => {
  const { restauranteId } = useParams<{ restauranteId: string }>() // Captura o ID da URL

  return (
    <>
      <Banner />
      {restauranteId && <Cardapio restauranteId={restauranteId} />}{' '}
      {/* Passa o ID */}
    </>
  )
}

export default Categories
