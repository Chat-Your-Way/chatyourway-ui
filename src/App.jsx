/* eslint-disable max-len */
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './ui-kit/components/SharedLayout/SharedLayout';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';
import { TopicsPageContextProvider } from './pages/TopicsPage/TopicsPageContext';
import TopicsPage from './pages/TopicsPage';
import Chat from './components/Chat';

function App() {
  return (
    <CombinedThemeProvider>
      <SidebarContextProvider>
        <TopicsPageContextProvider>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index />
              <Route path="/topics" element={<TopicsPage />}>
                <Route path="chat/:title" element={<Chat />} />
              </Route>
            </Route>
          </Routes>
        </TopicsPageContextProvider>
      </SidebarContextProvider>
    </CombinedThemeProvider>
  );
}

export default App;
