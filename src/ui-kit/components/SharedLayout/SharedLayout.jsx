import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';
import Topics from '../../../common/Topics/Topics';

const SharedLayout = () => {
  return (
    <MainBackground>
      <Header />
      <main>
        <Outlet />
        <Topics />
      </main>
      <Footer />
    </MainBackground>
  );
};

export default SharedLayout;
