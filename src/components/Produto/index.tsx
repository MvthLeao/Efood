import { Dispatch, SetStateAction } from 'react'
import { Specification, Description, Item, Title } from './styles'
import { Link } from 'react-router-dom'
import { CardapioItem } from '../ListRestaurante'

export type ProdutoProps = {
  SetModalVisible: Dispatch<SetStateAction<boolean>>
  cardapio: CardapioItem
}

const Produto = ({ SetModalVisible, cardapio }: ProdutoProps) => {
  return (
    <Item>
      {cardapio && (
        <>
          <img src={cardapio.foto} alt="Imagem Prato" />
          <div>
            <Title>{cardapio.nome}</Title>
            <Description>{cardapio.descricao}</Description>
            <Specification>
              <Link
                to={''}
                onClick={(e) => {
                  e.preventDefault()
                  SetModalVisible(true)
                }}
              >
                Especificação do produto
              </Link>
            </Specification>
          </div>
        </>
      )}
    </Item>
  )
}

export default Produto
