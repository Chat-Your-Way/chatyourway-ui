// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../../hooks/useUser';
import { useLogoutMutation } from '../../../redux/auth-operations';
import Wrapper from '../Wrapper';
import { FooterWrap, LogOutButton, LogOutIcon } from './Footer.styled';
// import { PATH } from '../../../constans/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAccessToken,
  selectIsLoggedIn,
} from '../../../redux/authOperatonsToolkit/authOperationsThunkSelectors';
// import {
//   setAccessToken,
//   setIsLoggedIn,
//   setRefreshToken,
// } from '../../../redux/authOperatonsToolkit/authOperationsThunkSlice';
// import { setConnected } from '../../../redux/chatSlice';
// import { client } from '../../../redux/chat-operations';
import localLogOutUtil from '../../../utils/localLogOutUtil';

const Footer = () => {
  // const { isAuthenticated, localLogOut } = useUser();
  const [logout] = useLogoutMutation();
  // const navigate = useNavigate();

  const accessTokenInStore = useSelector(selectAccessToken);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const LogOut = async () => {
    try {
      const { error } = await logout({ accessTokenInStore });

      if (error) {
        alert(error.data.message);
        // console.log('error', error);
        // dispatch(setIsLoggedIn(false));
        // dispatch(setConnected(false));
        // dispatch(setAccessToken(null));
        // dispatch(setRefreshToken(null));
        // client.deactivate();
        localLogOutUtil(dispatch);

        return;
      }
      localLogOutUtil(dispatch);
      // dispatch(setIsLoggedIn(false));
      // dispatch(setAccessToken(null));
      // dispatch(setConnected(false));
      // dispatch(setAccessToken(null));
      // dispatch(setRefreshToken(null));
      // client.deactivate();
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
