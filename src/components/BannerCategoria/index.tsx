import React, { useState, useEffect } from 'react'
import Logo from '../../assets/images/logo.png'
import Fundo from '../../assets/images/fundo.png'
import {
  ContentContainer,
  Description,
  Head,
  ImgCategoria,
  Text,
  Title
} from './styles'
import { Container } from '../ListRestaurante/styles'
import { Opçao } from '../../types'
import { useParams } from 'react-router-dom'

type ContentBanner = {
  content?: Opçao
}

const Banner = ({ content: initialContent }: ContentBanner) => {
  const [content, setContent] = useState<Opçao | undefined>(initialContent)
  const { id } = useParams()

  useEffect(() => {
    if (!initialContent) {
      fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
        .then((res) => res.json())
        .then((data: Opçao) => setContent(data))
        .catch((err) => console.error('Erro ao carregar dados:', err))
    }
  }, [initialContent, id])

  return (
    <>
      <div>
        <Head style={{ backgroundImage: `url(${Fundo})` }}>
          <Container>
            <Text>Restaurante</Text>
            <img src={Logo} alt="Logotipo" />
            <Text>0 produto(s) no carrinho</Text>
          </Container>
        </Head>
      </div>
      <div>
        {content ? (
          <ImgCategoria style={{ backgroundImage: `url(${content.capa})` }}>
            <ContentContainer>
              <Description>{content.tipo}</Description>
              <Title>{content.titulo}</Title>
            </ContentContainer>
          </ImgCategoria>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  )
}

export default Banner
