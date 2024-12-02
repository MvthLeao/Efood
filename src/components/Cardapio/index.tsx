import Produto from '../Produto'
import {
  ContainerCardapio,
  Description,
  GridCardapio,
  Modal,
  ModalContent
} from './styles'
import Close from '../../assets/images/close.png'
import { useState } from 'react'
import { CardapioItem } from '../ListRestaurante'

type CardapioProps = {
  cardapio: CardapioItem[]
}

const Cardapio = ({ cardapio }: CardapioProps) => {
  const [ModalVisible, SetModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CardapioItem | null>(null)

  const handleShowModal = (item: CardapioItem) => {
    setSelectedItem(item)
    SetModalVisible(true)
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
        <Modal className={ModalVisible ? 'visible' : ''}>
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
                  onClick={() => SetModalVisible(false)}
                />
              </div>
              <p>
                {selectedItem.descricao} <br /> <br /> {selectedItem.porcao}
              </p>
              <button>Adicionar ao carrinho - {selectedItem.preco}</button>
            </Description>
          </ModalContent>
          <div className="overlay" onClick={() => SetModalVisible(false)}></div>
        </Modal>
      )}
    </>
  )
}

export default Cardapio
