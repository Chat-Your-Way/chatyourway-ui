import {
  HeaderWrap,
  Logo,
  CategoryIcon,
  StyledIconButton,
  AuthSection,
} from './Header.styled';
import { useSidebarContext } from '../../../common/Sidebar/SidebarContext';
import Wrapper from '../Wrapper';
import { useUser } from '../../../hooks/useUser';
import { PATH } from '../../../constans/routes';
import { NavLink } from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';

const Header = () => {
  const { showMenu, setShowMenu } = useSidebarContext();
  const { isAuthenticated } = useUser();

  const onIconMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <Wrapper>
        <HeaderWrap>
          <NavLink to={PATH.MAIN}>
            <Logo />
          </NavLink>
          {isAuthenticated && (
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
