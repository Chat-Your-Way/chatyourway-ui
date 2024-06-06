import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const WhiteLayoutStyled = styled(Box, {
  shouldForwardProp: (p) => p !== 'width' && p !== 'height' && p !== 'padding',
})`
  position: relative;
  display: flex;
  justify-content: center;

  box-sizing: border-box;
  border-radius: 16px;
  //margin-bottom: 30px;
  width: ${(p) => (p.width ? p.width : '100%')};
  max-width: 342px;
  height: ${(p) => (p.height ? p.height : '90vh')};
  max-height: 600px;
  padding: ${(p) => (p.padding ? p.padding : '40px 28px 40px 27px')};
  background-color: ${(p) => p.theme.palette.primary.white};

  @media screen and (max-width: 342px) {
    height: 100%;
    margin: 0 5px;
  }

  @media screen and (min-width: 769px) {
    align-items: center;
    width: ${(p) => (p.width ? p.width : '100%')};
    max-width: 624px;
    height: ${(p) => (p.height ? p.height : '90vh')};
    max-height: 800px;
    // padding: ${(p) => (p.padding ? p.padding : '0 133px')};
    margin-top: 38px;
    margin-bottom: 30px;
  }

  @media screen and (min-width: 1195px) {
    width: ${(p) => (p.width ? p.width : '100%')};
    max-width: 800px;
    height: ${(p) => (p.height ? p.height : '90vh')};
    max-height: 594px;
    // padding: ${(p) => (p.padding ? p.padding : '205px 190px')};
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
