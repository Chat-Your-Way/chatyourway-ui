import { useUser } from '../../../hooks/useUser';
import Wrapper from '../Wrapper';
import { FooterWrap, LogOutButton, LogOutIcon } from './Footer.styled';

const Footer = () => {
  const { isAuthenticated } = useUser();

  return (
    <footer>
      <Wrapper>
        <FooterWrap>
          {isAuthenticated && (
            <LogOutButton label="Вийти" startIcon={<LogOutIcon />} />
          )}
        </FooterWrap>
      </Wrapper>
    </footer>
  );
};

export default Footer;
