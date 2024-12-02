import { Link } from 'react-router-dom'
import { Opçao } from '../ListRestaurante'
import Star from '../../assets/images/star.png'

import {
  BtnMore,
  Description,
  ImgContainer,
  Item,
  TagDestaque,
  TagNacionalidade,
  Title
} from './styles'

export type RestauranteProps = {
  restaurante: Opçao
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  return (
    <Item>
      <ImgContainer>
        <img src={restaurante.capa} alt={restaurante.titulo} />
        <TagDestaque>Destaque da semana</TagDestaque>
        <TagNacionalidade>{restaurante.tipo}</TagNacionalidade>
      </ImgContainer>
      <Title>
        <h3>{restaurante.titulo}</h3>
        <div>
          <strong>{restaurante.avaliacao}</strong>
          <img src={Star} alt="star" />
        </div>
      </Title>
      <div>
        <Description>{restaurante.descricao}</Description>
        <BtnMore>
          <Link to="/categories">Saiba mais</Link>
        </BtnMore>
      </div>
    </Item>
  )
}

export default Restaurante
