import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const WhiteLayoutStyled = styled(Box)`
  border-radius: 16px;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  padding: ${(p) => p.padding};
  background-color: ${(p) => p.theme.palette.primary.white};
`;
