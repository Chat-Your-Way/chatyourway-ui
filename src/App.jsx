import './App.css';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './ui-kit/components/SharedLayout/SharedLayout';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <CombinedThemeProvider>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index />
          <Route path="/faq" element={<FaqPage />} />
        </Route>
      </Routes>
    </CombinedThemeProvider>
  );
}

export default App;
