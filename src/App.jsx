import './App.css';
import { CombinedThemeProvider } from './ui-kit/theme/ThemeProvider';
import { SidebarContextProvider } from './common/Sidebar/SidebarContext';
import Router from './components/Routes/Route';

function App() {
  return (
    <CombinedThemeProvider>
      <SidebarContextProvider>
        <Router />
      </SidebarContextProvider>
    </CombinedThemeProvider>
  );
}

export default App;
