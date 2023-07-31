import "./App.css";
import { ThemeProvider } from "@mui/material";
import lightTheme from "./theme/theme";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Typography variant="myCustomVariant">hello world!</Typography>
    </ThemeProvider>
  );
}

export default App;
