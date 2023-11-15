import './App.css';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';
import { TopicsContextProvider } from './common/Topics/TopicsContext';
import Router from './components/Routes/Route';

function App() {
  return (
    <CombinedThemeProvider>
      <SidebarContextProvider>
        <TopicsContextProvider>
          <Router />
        </TopicsContextProvider>
      </SidebarContextProvider>
    </CombinedThemeProvider>
  );
}

export default App;
