import {
  ButtonWrap,
  LogOutButton,
  LogOutIcon,
  StyledFooter,
} from './Footer.styled';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <ButtonWrap>
          <LogOutButton label="Вийти" startIcon={<LogOutIcon />} />
        </ButtonWrap>
      </StyledFooter>
    </>
  );
};

export default Footer;
