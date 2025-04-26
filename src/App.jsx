/* eslint-disable max-len */
import './App.css';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { connectWebSocket } from './redux/chat-operations';
// import { selectAccessToken } from './redux/authOperationsToolkit/authOperationsThunkSelectors';
// import { useWebSocketConnection } from './hooks/useWebSocketConnection';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';
import { TopicsContextProvider } from './common/Topics/TopicsContext';
import { TopicsPageContextProvider } from './pages/TopicsPage/TopicsPageContext';
import Router from './components/Routes/Route';
import { SharedLayoutContextProvider } from './hooks/useSharedLayoutContext';

function App() {
  // useWebSocketConnection();

  return (
    <CombinedThemeProvider>
      <SidebarContextProvider>
        <TopicsContextProvider>
          <TopicsPageContextProvider>
            <SharedLayoutContextProvider>
              <Router />
            </SharedLayoutContextProvider>
          </TopicsPageContextProvider>
        </TopicsContextProvider>
      </SidebarContextProvider>
    </CombinedThemeProvider>
  );
}

export default App;
