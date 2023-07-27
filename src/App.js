import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h1" sx={{ color: theme.palette.primary.main }}>
        hello world
      </Typography>
    </ThemeProvider>
  );
}

export default App;
