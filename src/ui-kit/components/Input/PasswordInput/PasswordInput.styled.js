import styled from '@emotion/styled';
import { Box, InputBase, InputLabel, Link } from '@mui/material';
import { ICONS } from '../../../icons/index';

export const LabelLinkWrapper = styled(Box, {
  shouldForwardProp: (p) => p !== 'inputWidth',
})`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
`;

export const PasswordLabel = styled(InputLabel)`
  font-family: Inter;
  color: ${(p) => p.theme.palette.primary.dark};
  line-height: 135%;
`;

export const ForgotPswLink = styled(Link)`
  text-decoration: none;
`;

export const PasswordInputStyled = styled(InputBase, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '46px')};
  opacity: ${(p) => (p.value ? '1' : '0.6')};
  bordercolor: ${(p) =>
    p.error
      ? p.theme.palette.primary.errorColor
      : p.theme.palette.primary.main};
`;

export const IconVisible = styled(ICONS.SHOW)`
  position: absolute;
  right: 12px;
  opacity: ${(p) => (p.error ? '1' : '0.6')};
  cursor: pointer;
`;

export const IconHide = styled(ICONS.HIDE)`
  position: absolute;
  right: 12px;
  opacity: 0.6;
  cursor: pointer;
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
