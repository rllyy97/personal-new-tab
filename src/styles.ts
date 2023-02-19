import { Chip } from "@mui/material"
import styled, { css } from "styled-components"
import colors from "./colors"

export const SiteWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  height: 100%;
  color: white;
  background-color: ${colors.background};
  background-size: cover;
  padding: 0 32px;
  overflow: auto;
  box-sizing: border-box;
`

export const ContentWrapper = styled.div`
  position: relative;
  max-width: 1120px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const ChipIconButton = styled(Chip)`
  .MuiChip-icon {
    margin-left: 16px !important;
  }
`

export const tileDetailing = css`
  box-shadow: 
    0px 0px 1px black,
    0px 4px 8px #00000020,
    0px 1px 1px 0px #80808030 inset,
    0px -1px 1px 0px #00000040 inset;
`