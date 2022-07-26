import styled from "styled-components"
import colors from "../../colors"

export const LinkContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    border-radius: 12px;
    padding: 8px;
    cursor: pointer;
    min-height: 48px;
    background: ${colors.background};
    box-shadow: 0px 0px 0px 0px ${colors.user};
    transition: box-shadow 0.1s ease-in-out;

    &:hover {
        box-shadow: 0px 0px 0px 2px ${colors.user};
    }

    &.mini {
        padding: 6px;
        flex-direction: row;
        gap: 16px;
        justify-content: flex-start;

        img {
            min-width: 36px;
            width: 36px;
            height: 36px;
        }
        
        & > div {
            margin-right: 8px;
        }
    }
`

export const LinkImg = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
`

export const LinkTitle = styled.h4`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 96px;
    text-transform: capitalize;
`


export const StatusDot = styled.div<{ fill: string, border: string }>`
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    margin: 8px;
    margin-right: 0px !important;
    border-radius: 50%;
    background: ${props => props?.fill ?? 'white'};
    border: ${props => props?.border ?? 'white'};
    transition: all 0.5s ease-in-out;
`