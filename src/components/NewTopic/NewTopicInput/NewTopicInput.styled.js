import styled from '@emotion/styled';
import { Box, InputLabel, Typography, TextField } from '@mui/material';

export const StyledInputBox = styled(Box)`
  width: min(100%, 400px);
  display: flex;
  flex-direction: column;
`;

export const StyledInputLabel = styled(InputLabel)`
  width: 100%;
  ${(p) => p.theme.typography.h5}
  color: ${(p) => p.theme.palette.primary.dark};
  text-align: start;
  display: flex;
  flex-direction: column;
`;

export const StyledTextField = styled(TextField)`
  box-sizing: border-box;

  & .MuiInputBase-input {
    padding: 12px;
    box-sizing: border-box;
  }
`;

export const StyledErrorText = styled(Typography)`
  width: 100%;
  ${(p) => p.theme.typography.h5}
  color: red
`;
