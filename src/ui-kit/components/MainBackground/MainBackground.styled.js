import styled from '@emotion/styled';
import { Box } from '@mui/material';
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

export const SharedLayoutWrapper = styled(Box)`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  transition: background 0.6s ease;
  display: flex;
  flex-direction: ${(props) => `${props.$direction}` || 'row'};
  justify-content: ${(props) =>
    props.$justifyContent ? `${props.$justifyContent}` : 'none'};
  align-items: ${(props) =>
    props.$alignItems ? `${props.$alignItems}` : 'none'};

  background: ${(p) =>
      p.theme.palette.mode === 'light'
        ? `url(${firstLight}) left top / 50% no-repeat`
        : `url(${firstDark}) left top / 50% no-repeat`},
    url(${second}) left bottom / 50% no-repeat,
    url(${third}) right bottom / 50% no-repeat,
    url(${fourth}) right top / 50% no-repeat,
    ${(p) =>
      p.theme.palette.mode === 'light'
        ? `url(${fifthLight}) right bottom / 45% no-repeat`
        : `url(${fifthDark}) right bottom / 45% no-repeat`},
    ${(p) =>
      p.theme.palette.mode === 'light'
        ? `url(${sixthLight}) left bottom / 70% no-repeat`
        : `url(${sixthDark}) left bottom / 70% no-repeat`},
    url(${seventh}) right bottom / 50% no-repeat;
  background-color: ${(p) => p.theme.palette.primary.disabled};
`;
