import { createTheme } from "@mui/material"
import colors from "./colors"

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.green,
    },
    secondary: {
      main: colors.blue,
    },
    success: {
      main: colors.green,
    },
    info: {
      main: colors.darkBlue,
    },
    error: {
      main: colors.red
    }
  },
})