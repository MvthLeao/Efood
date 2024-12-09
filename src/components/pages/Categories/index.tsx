import { useParams } from 'react-router-dom'
import Banner from '../../BannerCategoria'
import Cardapio from '../../Cardapio'

const Categories = () => {
  const { restauranteId } = useParams<{ restauranteId: string }>()

  return (
    <>
      <Banner />
      {restauranteId && <Cardapio restauranteId={restauranteId} />}{' '}
    </>
  )
}

export default Categories
