import styled from '@emotion/styled';
import { Box, InputLabel, Typography, TextField } from '@mui/material';
import { ICONS } from '../../../ui-kit/icons';

export const StyledInputBox = styled(Box)`
  width: min(100%, 400px);
  height: 87px;
  display: flex;
  flex-direction: column;
`;

export const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 0;
  width: 100%;
  ${(p) => p.theme.typography.h5}
  color: ${(p) => p.theme.palette.primary.dark};
  text-align: start;
  display: flex;
  flex-direction: column;
`;

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (p) => p !== 'isError',
})`
  & .MuiOutlinedInput-root {
    border-color: ${(p) =>
      p.isError
        ? p.theme.palette.primary.errorColor
        : p.theme.palette.primary.main};

    &.Mui-focused fieldset {
      border-color: ${(p) =>
        p.isError
          ? p.theme.palette.primary.errorColor
          : p.theme.palette.primary.main};
    }
  }

  & .MuiInputBase-root {
    height: 46px;
  }

  & .MuiInputBase-input {
    padding: 12px;
    box-sizing: border-box;
  }
`;

export const StyledErrorText = styled(Typography)`
  width: 100%;
  height: 19px;
  ${(p) => p.theme.typography.h5}
  color: ${(p) => p.theme.palette.primary.errorColor};
`;

export const StyledErrorBlock = styled(Box)`
  width: 100%;
  ${(p) => p.theme.typography.h5}
  color: ${(p) => p.theme.palette.primary.errorColor};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const EDITIcon = styled(ICONS.EDIT)`
  fill: ${(p) => p.theme.palette.primary.dark};
`;

export const CROSSIcon = styled(ICONS.CROSS)`
  fill: ${(p) => p.theme.palette.primary.dark};
`;
