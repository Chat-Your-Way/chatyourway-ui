import './App.css';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './ui-kit/components/SharedLayout/SharedLayout';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';
import { TopicsContextProvider } from './common/Topics/TopicsContext';

function App() {
  return (
    <CombinedThemeProvider>
      <SidebarContextProvider>
        <TopicsContextProvider>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index />
            </Route>
          </Routes>
        </TopicsContextProvider>
      </SidebarContextProvider>
    </CombinedThemeProvider>
  );
}

export default App;
