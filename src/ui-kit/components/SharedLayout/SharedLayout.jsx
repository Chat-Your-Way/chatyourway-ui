import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';
import Sidebar from '../../../common/Sidebar';
import { useUser } from '../../../hooks/useUser';
import { MainWrapper } from './SharedLayout.styled';

const SharedLayout = () => {
  const { isAuthenticated } = useUser();

  return (
    <MainBackground>
      <Header />
      <main>
        <MainWrapper>
          {isAuthenticated && <Sidebar />}
          <Outlet />
        </MainWrapper>
      </main>
      <Footer />
    </MainBackground>
  );
};

export default SharedLayout;
