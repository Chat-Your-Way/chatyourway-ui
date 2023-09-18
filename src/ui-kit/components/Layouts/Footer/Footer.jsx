import { LogOutButton, LogOutIcon, StyledFooter } from './Footer.styled';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <LogOutButton label="Вийти" startIcon={<LogOutIcon />} />
      </StyledFooter>
    </>
  );
};

export default Footer;
