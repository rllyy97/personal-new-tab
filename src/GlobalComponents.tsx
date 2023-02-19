import styled from 'styled-components'
import { tileDetailing } from './styles'

export const FlexDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const InvisibleInput = styled.input`
  width: fit-content;
  border: none;
  outline: none;
  display: inline;
  font-family: inherit;
  font-size: inherit;
  padding: none;
  width: auto;
  background-color: transparent;
  color: inherit;
  font-weight: inherit;
  text-align: inherit;
  padding-left: 8px;
  filter: drop-shadow(0px 0px 4px black);
`

export const StyledDialog = styled.div`
  min-width: 420px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const ButtonRow = styled.div`
  /* width: 100%; */
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  /* button {
    flex: 1;
  } */
`

