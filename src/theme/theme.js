import { createTheme } from "@mui/material/styles";

const createCommonTheme = (theme) =>
  createTheme({
    palette: {
      primary: {
        white: "#FFFFFF",
        light: "#ACADFF",
        main: "#8686DC",
        dark: "#353535",
        contrastText: "#6261AF",
      },
    },
    typography: {
      h1: {
        fontFamily: "Inter",
        fontSize: "48px",
        fontWeight: "regular",
      },
      h2: {
        fontFamily: "Inter",
        fontSize: "40px",
        fontWeight: "regular",
      },
      h3: {
        fontFamily: "Inter",
        fontSize: "32px",
        fontWeight: "regular",
      },
      h4: {
        fontFamily: "Inter",
        fontSize: "24px",
        fontWeight: "regular",
      },
      h5: {
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: "regular",
      },
      h6: {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "regular",
      },
      myCustomVariant: {
        fontSize: "100px",
        fontWeight: "bold",
        color: "#FF0000",
      },
    },
  });

export default createCommonTheme;
