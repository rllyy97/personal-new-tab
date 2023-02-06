import { IconButton } from "@mui/material"

const CircleButton = (props: any) => (
  <IconButton onClick={props.onClick} size='small' style={props.style}>
    {props.icon}
  </IconButton>
)

export default CircleButton