import styled from "styled-components"

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

    &:hover {
        background: #80808016;
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