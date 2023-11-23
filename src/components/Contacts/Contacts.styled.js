import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)`
  padding: 16px;
  width: 227px;
  min-height: 72%;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: ${(p) => p.theme.palette.primary.white};
`;

export const StyledChildrenBox = styled(Box)`
  width: 195px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 8px;
`;
