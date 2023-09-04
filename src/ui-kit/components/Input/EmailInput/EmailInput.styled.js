import styled from '@emotion/styled';
import { Box, InputBase, InputLabel } from '@mui/material';
import { ICONS } from '../../../icons';

export const EmailInputLabel = styled(InputLabel)`
  font-family: Inter;
  color: ${(p) => p.theme.palette.primary.dark};
  line-height: 135%;
`;

export const EmailInputStyled = styled(InputBase)`
  width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '46px')};
  opacity: ${(p) => (p.value ? '1' : '0.6')};
  bordercolor: ${(p) =>
    p.error
      ? p.theme.palette.primary.errorColor
      : p.theme.palette.primary.main};
`;

export const EditIcon = styled(ICONS.EDIT)`
  position: absolute;
  right: 12px;
`;

export const ErrorWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ErrorIconInput = styled(ICONS.ERROR)`
  stroke: ${(p) => p.theme.palette.primary.errorColor};
  width: 16px;
  height: 16px;
  strokewidth: 1.5px;
`;
