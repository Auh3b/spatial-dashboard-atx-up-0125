import { createTheme } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: deepOrange,
      },
    },
    light: {
      palette: {
        primary: deepOrange,
      },
    },
  },
});

export default theme;
