import styled from "styled-components"
import colors from "../../colors"

export const GroupContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;    
    border-radius: 12px;
    padding: 28px 24px 24px;
    background: ${colors.backgroundLight};

    /* transition: all 0.2s; */
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