import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const WhiteLayoutStyled = styled(Box, {
  shouldForwardProp: (p) => p !== 'width' && p !== 'height' && p !== 'padding',
})`
  display: flex;
  justify-content: center;

  box-sizing: border-box;
  border-radius: 16px;
  margin: 0 auto;
  width: ${(p) => (p.width ? p.width : '342px')};
  height: ${(p) => (p.height ? p.height : '600px')};
  padding: ${(p) => (p.padding ? p.padding : '40px 28px 40px 27px')};
  background-color: ${(p) => p.theme.palette.primary.white};

  @media screen and (min-width: calc(845px - 0.02px)) {
    align-items: center;
    width: ${(p) => (p.width ? p.width : '624px')};
    height: ${(p) => (p.height ? p.height : '800px')};
    padding: ${(p) => (p.padding ? p.padding : '0 133px')};
  }

  @media screen and (min-width: calc(1195px - 0.02px)) {
    width: ${(p) => (p.width ? p.width : '800px')};
    height: ${(p) => (p.height ? p.height : '600px')};
    padding: ${(p) => (p.padding ? p.padding : '205px 221px')};
  }
`;
