import {
  HeaderWrap,
  Logo,
  CategoryIcon,
  StyledIconButton,
  AuthSection,
} from './Header.styled';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';
import Wrapper from '../Wrapper';
// import { useUser } from '../../../hooks/useUser';
import { PATH } from '../../../constans/routes';
import { NavLink, useLocation } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';
import { useTopicsContext } from '../../../common/Topics/TopicsContext';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line max-len
import { selectIsLoggedIn } from '../../../redux/authOperationsToolkit/authOperationsThunkSelectors';
import { setChatOpened } from '../../../redux/chatSlice';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const { showMenu, setShowMenu } = useSidebarContext();
  const { setShowTopics } = useTopicsContext();
  const { pathname } = useLocation();
  const path = pathname.includes('chat') ? 'chat' : 'notifications';

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const onIconMenuClick = () => {
    if (!showMenu && path === 'chat') {
      dispatch(setChatOpened(false));
    } else {
      dispatch(setChatOpened(true));
    }

    if (
      !showMenu &&
      isMobile &&
      (pathname.includes('topics') || pathname.includes('notification'))
    ) {
      setShowTopics(false);
    } else {
      setShowTopics(true);
    }

    if (showMenu && isMobile && pathname.includes('chat')) {
      setShowTopics(false);
    }

    setShowMenu(!showMenu);
    // setShowTopics(false);
  };

  return (
    <header>
      <Wrapper>
        <HeaderWrap>
          <NavLink to={PATH.MAIN}>
            <Logo />
          </NavLink>
          {isLoggedIn && (
            <AuthSection>
              <HeaderUserInfo />
              <StyledIconButton
                icon={<CategoryIcon />}
                handleClick={onIconMenuClick}
              />
            </AuthSection>
          )}
        </HeaderWrap>
      </Wrapper>
    </header>
  );
};

export default Header;
