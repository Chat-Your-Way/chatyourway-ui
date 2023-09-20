import { FooterWrap, LogOutButton, LogOutIcon } from './Footer.styled';

const Footer = () => {
  return (
    <footer>
      <FooterWrap>
        <LogOutButton label="Вийти" startIcon={<LogOutIcon />} />
      </FooterWrap>
    </footer>
  );
};

export default Footer;
