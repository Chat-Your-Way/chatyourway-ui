import './App.css';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';
import { TopicsContextProvider } from './common/Topics/TopicsContext';
import { TopicsPageContextProvider } from './pages/TopicsPage/TopicsPageContext';
import Router from './components/Routes/Route';
import { SharedLayoutContextProvider } from './hooks/useSharedLayoutContext';

function App() {
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
