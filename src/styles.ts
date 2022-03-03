import styled from "styled-components"

export const SiteWrapper = styled.div<{backgroundColor: string, textColor: string}>`
  position: relative;
  min-height: 100vh;
  height: 100%;
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  background-size: cover;
  padding: 0 32px;
  overflow: auto;
  box-sizing: border-box;
`

export const ContentWrapper = styled.div`
  position: relative;
  max-width: 1080px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`
