import './App.css';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './ui-kit/components/SharedLayout/SharedLayout';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';

function App() {
  return (
    <CombinedThemeProvider>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index />
        </Route>
      </Routes>
    </CombinedThemeProvider>
  );
}

export default App;
