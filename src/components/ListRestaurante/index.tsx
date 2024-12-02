import { useEffect, useState } from 'react'
import Restaurante from '../Restaurante'
import { Container, Grid } from './styles'

export type Opçao = {
  id: number
  titulo: string
  destacado?: boolean
  tipo: string
  avaliacao: string
  descricao: string
  capa: string
  cardapio: CardapioItem[]
}

export type CardapioItem = {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}

const ListRestaurante = () => {
  const [opçoes, setOpçoes] = useState<Opçao[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setOpçoes(res))
  }, [])

  return (
    <>
      <Container>
        <Grid>
          {opçoes.map((opcao) => (
            <Restaurante key={opcao.id} restaurante={opcao} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default ListRestaurante
