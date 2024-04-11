import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { useLogoutMutation } from '../../../redux/auth-operations';
import Wrapper from '../Wrapper';
import { FooterWrap, LogOutButton, LogOutIcon } from './Footer.styled';
import { PATH } from '../../../constans/routes';

const Footer = () => {
  const { isAuthenticated, localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      const { error } = await logout();

      if (error) {
        alert(error.data.message);
        return;
      }

      localLogOut();
      navigate(PATH.MAIN);
    } catch (error) {
      console.error('Виникла помилка:', error);
    }
  };

  return (
    <footer>
      <Wrapper>
        <FooterWrap>
          {isAuthenticated && (
            <LogOutButton
              label="Вийти"
              startIcon={<LogOutIcon />}
              handleClick={LogOut}
            />
          )}
        </FooterWrap>
      </Wrapper>
    </footer>
  );
};

export default Footer;
