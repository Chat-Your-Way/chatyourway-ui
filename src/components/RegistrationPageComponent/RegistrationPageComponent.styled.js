import styled from '@emotion/styled';
import { Box, Typography, InputBase } from '@mui/material';

export const RegistrationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ===== COMMON STYLES
export const RegistrationInputWrapper = styled(Box)`
  position: relative;
  margin: 0 0 22px 0;
`;

export const RegistrationLabel = styled(Typography)`
  @media screen and (max-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h5};
  }
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const RegistrationInput = styled(InputBase, {
  shouldForwardProp: (p) =>
    p !== 'inputWidth' && p !== 'inputHeight' && p !== 'errors',
})`
  padding: 12px;
  width: ${(p) => (p.inputWidth ? p.inputWidth : '300px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '46px')};
  border: 1px solid ${(p) => (p.errors === 'true' ? '#DA4444' : '#6261AF')};
  background-color: ${(p) => p.theme.palette.primary.white};

  @media screen and (min-width: calc(845px - 0.02px)) {
    width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  }
`;

export const RegistrationInputError = styled.span`
  position: absolute;
  left: 0;
  bottom: -20px;
  color: ${(p) => p.theme.palette.primary.errorColor};
`;
