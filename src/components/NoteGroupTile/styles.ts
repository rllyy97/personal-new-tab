import styled from "styled-components";
import { loadAnimation, tileDetailing } from "../../styles";
import colors from "../../colors";

export const NoteGroupRoot = styled.div`
  margin-top: -16px;
`

export const NoteContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;

  &.first-load {
    opacity: 0;
    animation: ${loadAnimation} 0.2s ease-in-out;
    animation-fill-mode: forwards;
  }
`
