import styled from '@emotion/styled';
import { Box } from '@mui/material';

import first from '../../images/mainBg/1-layer.png';
import second from '../../images/mainBg/2-layer.png';
import third from '../../images/mainBg/3-layer.png';
import fourth from '../../images/mainBg/4-layer.png';
import fifth from '../../images/mainBg/5-layer.png';
import sixth from '../../images/mainBg/6-layer.png';
import seventh from '../../images/mainBg/7-layer.png';

export const SharedLayoutWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: url(${first}) left top / 50% no-repeat,
    url(${second}) left bottom / 50% no-repeat,
    url(${third}) right bottom / 50% no-repeat,
    url(${fourth}) right top / 50% no-repeat,
    url(${fifth}) right bottom / 45% no-repeat,
    url(${sixth}) left bottom / 70% no-repeat,
    url(${seventh}) right bottom / 50% no-repeat;
`;
