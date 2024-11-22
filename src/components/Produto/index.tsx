import { useState } from 'react'
import Pizza from '../../assets/images/PizzaMarguerita.png'
import Close from '../../assets/images/close.png'
import imgModal from '../../assets/images/ImgModal.png'
import {
  Specification,
  Description,
  Item,
  Title,
  Modal,
  ContentModal
} from './styles'
import { Link } from 'react-router-dom'

const Produto = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Item>
      <img src={Pizza} alt="Pizza Marguerita" />
      <div>
        <Title>Pizza Marguerita</Title>
        <Description>
          A clássica Marguerita: molho de tomate suculento, mussarela derretida,
          manjericão fresco e um toque de azeite. Sabor e simplicidade!
        </Description>
        <Specification>
          <Link to="/listitaly/produto">Especificação do produto</Link>
        </Specification>
      </div>
      <Modal className={visible ? 'visible' : ''}>
        <ContentModal>
          <div>
            <img src={imgModal} alt="FOTO DO PRATO" />
          </div>
          <div>
            <h2>NOME DO PRATO</h2>
            <img
              src={Close}
              onClick={() => setVisible(false)}
              alt="CLOSE MODAL"
            />
          </div>
          <p>DESCRIÇÃO</p>
          <p>PORÇÃO</p>
          <button>ADICIONAR AO CARRINHO</button>
        </ContentModal>
        <div className="overlay" onClick={() => setVisible(false)}></div>
      </Modal>
    </Item>
  )
}

export default Produto
