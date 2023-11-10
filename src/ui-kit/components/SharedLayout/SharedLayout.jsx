import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';
// eslint-disable-next-line max-len
import VerificationEmail from '../../../components/VerificationEmailPageComponent';

const SharedLayout = () => {
  return (
    <MainBackground>
      <Header />
      <main>
        <Outlet />
        <VerificationEmail />
      </main>
      <Footer />
    </MainBackground>
  );
};

export default SharedLayout;
