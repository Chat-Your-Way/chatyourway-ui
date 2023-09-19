import { Outlet } from 'react-router-dom';
import MainBackground from '../MainBackground';

const SharedLayout = () => {
  return (
    <MainBackground>
      <main>
        <Outlet />
      </main>
    </MainBackground>
  );
};

export default SharedLayout;
