import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const AvatarWrapper = styled(Box)`
  position: relative;
  width: ${(p) => (p.width ? p.width : '80px')};
  height: ${(p) => (p.height ? p.height : '80px')};
  padding: 0;
  border: ${(p) => (p.border ? p.border : 'none')};
  backgroud-color: ${(p) =>
    p.backgroudColor ? p.backgroundColor : 'transparent'};
  border-radius: ${(p) => (p.borderRadius ? p.borderRadius : '80px')};
`;

export const AvatarText = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;
  text-transform: capitalize;
`;
