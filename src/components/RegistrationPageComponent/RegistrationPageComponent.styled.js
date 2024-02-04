import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';
import { Box, Typography, InputBase } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';

export const RegistrationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 47px 0 81px 0;

  @media screen and (min-width: calc(845px - 0.02px)) {
    align-items: flex-start;
    padding: 40px 40px 250px 40px;
  }
  @media screen and (min-width: calc(1200px - 0.02px)) {
    padding: 32px 80px 164px 80px;
  }
`;

export const LogoIcon = styled(ICONS.LOGO)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
    margin: 0 0 122px 0;
  }
  @media screen and (min-width: calc(1200px - 0.02px)) {
    margin: 0 0 45px 0;
  }
`;

export const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

// ===== COMMON STYLES
export const RegistrationInputWrapper = styled(Box)`
  position: relative;
  margin: 0 0 23px 0;
`;

export const RegistrationLabel = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const RegistrationButton = styled(DefaultButton)`
  display: flex;
  width: 180px;
  height: 40px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  opacity: 1;

  ${(p) => p.theme.typography.h5}

  &:hover {
    box-shadow: 0px 1px 8px 4px rgba(134, 134, 220, 0.2);
  }

  ${(p) => {
    return (
      p.isDisabled &&
      `
      opacity: 0.8;
      color: ${p.theme.palette.primary.dark};
      background-color: ${p.theme.palette.primary.disabled};
      border: 1px solid ${p.theme.palette.primary.light};
      `
    );
  }}
`;
