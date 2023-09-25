import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';
import EmailInput from '../../ui-kit/components/Input/EmailInput';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';
import { ICONS } from '../../ui-kit/icons';

export const WhiteBox = styled(WhiteLayout)`
  position: relative;
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  position: absolute;
  right: 26px;
  top: 26px;
`;

export const ForgotPasswordWrapper = styled(Box)`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

export const ForgotPasswordTitle = styled(Typography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const ForgotPasswordText = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  opacity: 0.6;
`;

export const ForgotPasswordTextWrapper = styled(Box)`
  margin-bottom: 24px;
`;

export const EmailInputStyled = styled(EmailInput)`
  margin-bottom: 24px;
`;

export const SendPasswordButton = styled(DefaultButton)`
  height: 40px;
  width: 180px;
  padding: 8px 12px;
`;

export const ButtonWrapper = styled(Box)`
  text-align: center;
`;
