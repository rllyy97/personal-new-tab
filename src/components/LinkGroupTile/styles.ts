import styled from "styled-components"
import colors from "../../colors"
import { loadAnimation, tileDetailing } from "../../styles"


export const GroupContainer = styled.div<{ index?: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;    
  border-radius: 12px;
  padding: 28px 24px 24px;
  background: ${colors.backgroundLight};
  ${tileDetailing}

  &.first-load {
    opacity: 0;
    animation: ${loadAnimation} 0.2s ease-in-out;
    animation-delay: ${({ index }) => index ? index * 0.04 : 0}s;
    animation-fill-mode: forwards;
  }
`

export const GroupTitle = styled.h2`
  position: absolute;
  top: -16px;
  left: 8px;
`

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
`

export const EmptyGroupWarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
`

export const ButtonContainer = styled.div`
  position: absolute;
  top: -16px;
  right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  &.buttons {
    gap: 12px;
    button {
      border-radius: 100px;
      padding-right: 12px;
    }
  }
`