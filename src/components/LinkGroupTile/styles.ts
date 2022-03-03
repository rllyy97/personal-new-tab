import styled from "styled-components"
import colors from "../../colors"

export const GroupContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;    
    border: 2px solid #cccccc4D;
    border-radius: 8px;
    padding: 32px 16px 24px;

    transition: all 0.2s;

    &.drag {
        border: 2px solid ${colors.green};
    }
`

export const GroupTitle = styled.h2`
    position: absolute;
    top: -16px;
    left: 8px;
    background: ${colors.background};
`

export const TitleBackground = styled.h2`
    position: absolute;
    top: -16px;
    left: 8px;
    background: ${colors.background};
    color: ${colors.background};
    padding: 4px 8px;
`

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
`

export const EmptyGroupWarningContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
`
