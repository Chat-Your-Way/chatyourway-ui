import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';

const SharedLayout = () => {
  return (
    <MainBackground>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </MainBackground>
  );
};

export default SharedLayout;
