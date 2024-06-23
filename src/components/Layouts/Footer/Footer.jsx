// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../../hooks/useUser';
import { useLogoutMutation } from '../../../redux/auth-operations';
import Wrapper from '../Wrapper';
import { FooterWrap, LogOutButton, LogOutIcon } from './Footer.styled';
// import { PATH } from '../../../constans/routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
import { setIsLoggedIn } from '../../../redux/authOperatonsToolkit/authOperationsThunkSlice';

const Footer = () => {
  // const { isAuthenticated, localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  // const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const LogOut = async () => {
    try {
      const { error } = await logout();

      if (error) {
        alert(error.data.message);
        dispatch(setIsLoggedIn(false));
        return;
      }

      // localLogOut();
      // navigate(PATH.MAIN);
    } catch (error) {
      console.error('Виникла помилка:', error);
    }
  };

  return (
    <footer>
      <Wrapper>
        <FooterWrap>
          {/* {isAuthenticated && (
            <LogOutButton
              label="Вийти"
              startIcon={<LogOutIcon />}
              handleClick={LogOut}
            />
          )} */}
          {isLoggedIn && (
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
