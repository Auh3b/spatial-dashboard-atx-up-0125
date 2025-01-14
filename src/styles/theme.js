import { createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: deepPurple,
      },
    },
    light: {
      palette: {
        primary: deepPurple,
      },
    },
  },
});

export default theme;
