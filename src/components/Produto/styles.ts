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
export const Specification = styled.button`
  margin: 8px 0;
  width: 304px;
  height: 24px;
  font-size: 14px;
  font-weight: bold;
  color: ${cores.rosa};
  border: none;
`
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  display: none;

  &.isVisible {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

export const ContentModal = styled.div`
  position: relative;
  max-width: 1024px;
  z-index: 1;

  > div {
    display: flex;
    padding: 0 0 32px 32px;
    background-color: red;
    color: blue;

    > img {
      width: 280px;
      height: 280px;
      margin-right: 24px;
      object-fit: cover;
      margin-top: 32px;
    }

    div {
      display: block;

      div {
        display: flex;
        justify-content: space-between;

        h2 {
          font-size: 21px;
          font-weight: 900;
          margin-top: 32px;
        }

        img {
          height: 16px;
          width: 16px;
          margin: 8px;
          cursor: pointer;
        }
      }

      p {
        margin: 16px 0;
        font-size: 14px;
      }

      button {
        border: none;
        padding: 4px 7px;
        font-size: 14px;
        font-weight: 700;
        background-color: ${cores.rosa};
        color: ${cores.branca};
      }
    }
  }
`
