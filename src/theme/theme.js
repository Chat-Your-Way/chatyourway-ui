import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ACADFF", // Колір для основного елемента, наприклад, кнопок або акцентів
    },
    secondary: {
      main: "#8686DC", // Другорядний колір для інших елементів
    },
    text: {
      primary: "#353535", // Колір для тексту
      secondary: "#6261AF", // Другорядний колір для деяких текстових елементів
    },
    background: {
      default: "#FFFFFF", // Колір фону за замовчуванням
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
    },
  },
});

export default theme;
