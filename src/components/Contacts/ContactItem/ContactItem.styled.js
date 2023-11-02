import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { ICONS } from '../../../ui-kit/icons';
import IconButton from '../../../ui-kit/components/IconButton';

export const StyledBox = styled(Box)`
  width: 195px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledName = styled(Typography)`
  margin-bottom: 4px;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const Message = styled(ICONS.MESSAGE)`
  fill: ${(p) => p.theme.palette.primary.green};
`;

/* fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.green}; */

export const SendMessage = styled(IconButton)`
  width: 25px;
  background-color: transparent;
  color: ${(p) => p.theme.palette.primary.green};
  display: flex;
  justify-content: center;
  align-items: center;

  path {
    fill: ${(p) => p.theme.palette.primary.green};
  }
`;
