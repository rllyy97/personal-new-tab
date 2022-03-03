import { IconButton } from "@mui/material"
import styled from "styled-components"
import colors from "../../colors"

const ButtonContainer = styled.div`
    background: ${colors.background};
    border-radius: 50%;
    /* padding: 2px; */

    &.tr {
        position: absolute;
        top: -16px;
        right: -16px;
    }
`

const CircleButton = (props: any) => (
    <ButtonContainer className={props.className} style={props.style}>
        <IconButton onClick={props.onClick} size='small'>
            {props.icon}
        </IconButton>
    </ButtonContainer>
)

export default CircleButton