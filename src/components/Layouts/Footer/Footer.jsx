import Wrapper from '../Wrapper';
import { FooterWrap, LogOutButton, LogOutIcon } from './Footer.styled';

const Footer = () => {
  return (
    <footer>
      <Wrapper>
        <FooterWrap>
          <LogOutButton label="Вийти" startIcon={<LogOutIcon />} />
        </FooterWrap>
      </Wrapper>
    </footer>
  );
};

export default Footer;
