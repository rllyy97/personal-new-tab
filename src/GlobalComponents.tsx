import { Dialog } from '@mui/material'
import styled from 'styled-components'

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
`

export const StyledDialog = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`
