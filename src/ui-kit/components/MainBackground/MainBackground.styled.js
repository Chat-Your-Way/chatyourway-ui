import styled from '@emotion/styled';
// import { Box } from '@mui/material';
import firstLight from '../../images/mainBg/1-layer-light.png';
import firstDark from '../../images/mainBg/1-layer-dark.png';
import second from '../../images/mainBg/2-layer.png';
import third from '../../images/mainBg/3-layer.png';
import fourth from '../../images/mainBg/4-layer.png';
import fifthLight from '../../images/mainBg/5-layer-light.png';
import fifthDark from '../../images/mainBg/5-layer-dark.png';
import sixthLight from '../../images/mainBg/6-layer-light.png';
import sixthDark from '../../images/mainBg/6-layer-dark.png';
import seventh from '../../images/mainBg/7-layer.png';

const generateBackground = (mode, sizes) => `
  url(${mode === 'light' ? firstLight : firstDark}) left top / ${
  sizes.first
} no-repeat,
  url(${second}) left bottom / 50% no-repeat,
  url(${third}) right bottom / 50% no-repeat,
  url(${fourth}) right top / 50% no-repeat,
  url(${mode === 'light' ? fifthLight : fifthDark}) right bottom / ${
  sizes.fifth
} no-repeat,
  url(${mode === 'light' ? sixthLight : sixthDark}) left bottom / ${
  sizes.sixth
} no-repeat,
  url(${seventh}) right bottom / 50% no-repeat
`;

export const SharedLayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  transition: background 0.6s ease;
  display: flex;
  flex-direction: ${(props) =>
    props.$flexDirection ? `${props.$flexDirection}` : 'row'};
  justify-content: ${(props) =>
    props.$justifyContent ? `${props.$justifyContent}` : 'flex-start'};
  align-items: ${(props) =>
    props.$alignItems ? `${props.$alignItems}` : 'stretch'};
  background: ${(p) =>
    generateBackground(p.theme.palette.mode, {
      first: p.theme.palette.mode === 'light' ? '132%' : '50%',
      fifth: p.theme.palette.mode === 'light' ? '43%' : '45%',
      sixth: p.theme.palette.mode === 'light' ? '96%' : '70%',
    })};
  background-color: ${(p) => p.theme.palette.primary.disabled};

  @media screen and (min-width: 769px) {
    background: ${(p) =>
      generateBackground(p.theme.palette.mode, {
        first: p.theme.palette.mode === 'light' ? '88%' : '50%',
        fifth: p.theme.palette.mode === 'light' ? '50%' : '45%',
        sixth: p.theme.palette.mode === 'light' ? '96%' : '70%',
      })};
    background-color: ${(p) => p.theme.palette.primary.disabled};
  }

  @media screen and (min-width: 1195px) {
    background: ${(p) =>
      generateBackground(p.theme.palette.mode, {
        first: p.theme.palette.mode === 'light' ? '63%' : '50%',
        fifth: p.theme.palette.mode === 'light' ? '46%' : '45%',
        sixth: p.theme.palette.mode === 'light' ? '77%' : '70%',
      })};
    background-color: ${(p) => p.theme.palette.primary.disabled};
  }
`;
