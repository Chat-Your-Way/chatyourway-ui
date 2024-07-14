import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';
import { Box, Typography, InputBase } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';

export const RegistrationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-bottom: 50px;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    padding: 30px;
  }
  @media screen and (min-width: 1200px) {
    padding: 5px 80px 164px 80px;
    /* position: absolute; */
    /* transform: translateY(-50%);
    top: 58%; */
  }
`;

export const LogoIcon = styled(ICONS.LOGO)`
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};
  height: 50px;

  @media screen and (min-width: 560px) {
    height: 87px;
  }

  @media screen and (min-width: 768px) {
    display: none;
    margin: 0 0 122px 0;
    height: 87px;
  }
  @media screen and (min-width: 1200px) {
    margin: 0 0 45px 0;
    height: 87px;
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
  margin: 3px 0 20px 0;
`;

export const RegistrationLabel = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(p) => p.theme.typography.h6};
  margin-top: -10px;

  @media screen and (min-width: 560px) {
    ${(p) => p.theme.typography.h5};
    margin-top: 0;
  }
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const RegistrationInput = styled(InputBase, {
  shouldForwardProp: (p) =>
    p !== 'inputWidth' && p !== 'inputHeight' && p !== 'errors',
})`
  padding: 12px;
  width: ${(p) => (p.inputWidth ? p.inputWidth : '300px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '40px')};
  border: 1px solid ${(p) => (p.errors === 'true' ? '#DA4444' : '#6261AF')};
  background-color: ${(p) => p.theme.palette.primary.white};

  @media screen and (min-width: 560px) {
    height: 46px;
  }

  @media screen and (min-width: 768px) {
    width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  }
`;

export const RegistrationInputError = styled.span`
  position: absolute;
  left: 0;
  font-size: 13px;
  color: ${(p) => p.theme.palette.primary.errorColor};

  @media screen and (min-width: 560px) {
    bottom: -20px;
    font-size: 16px;
  }
`;

export const RegistrationButton = styled(DefaultButton)`
  display: flex;
  width: 180px;
  height: 40px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  ${(p) => p.theme.typography.h5}

  &:hover {
    box-shadow: 0 1px 8px 4px rgba(134, 134, 220, 0.2);
  }
`;
