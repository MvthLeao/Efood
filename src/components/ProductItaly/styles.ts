import styled from 'styled-components'
import { cores } from '../../styled'

export const Item = styled.div`
  padding: 8px;
  width: 320px;
  height: 338px;
  background-color: ${cores.rosa};
  margin: 20px 0;
`
export const Title = styled.p`
  padding-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color: ${cores.branca};
`

export const Description = styled.p`
  padding: 8px 0;
  font-size: 14px;
  line-height: 19px;
  color: ${cores.branca};
`
export const ButtonAddCar = styled.button`
  margin: 8px 0;
  width: 304px;
  height: 24px;
  font-size: 14px;
  font-weight: bold;
  color: ${cores.rosa};
  border: none;
`
