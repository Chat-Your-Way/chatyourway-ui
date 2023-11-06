import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';
import Header from '../../../components/Layouts/Header';
import Footer from '../../../components/Layouts/Footer';
import TextNavLinkButton from '../TextNavLinkButton/TextNavLinkButton';

const SharedLayout = () => {
  return (
    <MainBackground>
      <Header />
      <main>
        <Outlet />
        <TextNavLinkButton to={'/'} label={'to main'} />
      </main>
      <Footer />
    </MainBackground>
  );
};

export default SharedLayout;
