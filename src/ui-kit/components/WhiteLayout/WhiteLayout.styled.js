import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const WhiteLayoutStyled = styled(Box, {
  shouldForwardProp: (p) => p !== 'width' && p !== 'height' && p !== 'padding',
})`
  box-sizing: border-box;
  position: relative;
  // display: flex;
  // justify-content: center;
  width: ${(p) => (p.width ? p.width : '90vw')};
  height: ${(p) => (p.height ? p.height : '600px')};
  margin: 122px 24px;
  padding: ${(p) => (p.padding ? p.padding : '40px 28px 40px 27px')};
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};

  // max-width: 342px;
  // height: 70vh;
  // max-height: 600px;
  // margin-bottom: 30px;

  // @media screen and (min-width: 320px) {
  //   height: 70vh;
  //   margin: 0 24px;
  // }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // width: ${(p) => (p.width ? p.width : '75vw')};
    // max-width: 624px;
    // height: ${(p) => (p.height ? p.height : '70vh')};
    // max-height: 800px;
    width: ${(p) => (p.width ? p.width : '624px')};
    height: ${(p) => (p.height ? p.height : '800px')};
    padding: ${(p) => (p.padding ? p.padding : '0')};
    margin: 30px 0px 190px 0px;
    // margin-top: 38px;
    // margin-bottom: 30px;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) => (p.width ? p.width : '800px')};
    max-width: 800px;
    height: ${(p) => (p.height ? p.height : '600px')};
    max-height: 600px;
    padding: ${(p) => (p.padding ? p.padding : '0')};
    margin: 182px 0 212px;
    // margin-top: 30px;
    // margin-bottom: 30px;
  }
`;
