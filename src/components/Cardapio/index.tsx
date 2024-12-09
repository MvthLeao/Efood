import Produto from '../Produto'
import {
  ContainerCardapio,
  Description,
  GridCardapio,
  Modal,
  ModalContent
} from './styles'
import Close from '../../assets/images/close.png'
import { useState, useEffect } from 'react'
import { CardapioItem } from '../ListRestaurante'

type CardapioProps = {
  restauranteId: string
}

const Cardapio = ({ restauranteId }: CardapioProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CardapioItem | null>(null)
  const [cardapio, setCardapio] = useState<CardapioItem[]>([])

  useEffect(() => {
    const fetchCardapio = async () => {
      try {
        const response = await fetch(
          `/api/restaurantes/${restauranteId}/cardapio`
        )
        const data = await response.json()
        setCardapio(data)
      } catch (error) {
        console.error('Erro ao buscar o cardápio:', error)
      }
    }
    fetchCardapio()
  }, [restauranteId])

  const handleShowModal = (item: CardapioItem) => {
    setSelectedItem(item)
    setModalVisible(true)
  }

  return (
    <>
      <ContainerCardapio>
        <GridCardapio>
          {cardapio.map((item) => (
            <Produto
              key={item.id}
              cardapio={item}
              SetModalVisible={() => handleShowModal(item)}
            />
          ))}
        </GridCardapio>
      </ContainerCardapio>
      {selectedItem && (
        <Modal className={modalVisible ? 'visible' : ''}>
          <ModalContent>
            <div>
              <img src={selectedItem.foto} alt="Prato selecionado" />
            </div>
            <Description>
              <div>
                <h4>{selectedItem.nome}</h4>
                <img
                  src={Close}
                  alt="close modal"
                  onClick={() => setModalVisible(false)}
                />
              </div>
              <p>
                {selectedItem.descricao} <br /> <br /> {selectedItem.porcao}
              </p>
              <button>Adicionar ao carrinho - {selectedItem.preco}</button>
            </Description>
          </ModalContent>
          <div className="overlay" onClick={() => setModalVisible(false)}></div>
        </Modal>
      )}
    </>
  )
}

export default Cardapio
