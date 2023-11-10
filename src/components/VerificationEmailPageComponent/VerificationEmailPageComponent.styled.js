import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';

const VerificationEmailWrapper = styled(Box)`
  gap: 4px;
  margin: auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 844px) {
    width: 457px;
  }
`;

const TextBox = styled(Box)`
  display: block;
  min-width: 300px;

  @media screen and (min-width: 844px) {
    width: 85%;
  }
`;

export const Logo = styled(ICONS.LOGO)`
  display: block;
  justify-content: center;
  margin: auto;
  fill: ${(p) =>
    p.theme.palette.mode === 'light'
      ? p.theme.palette.primary.contrastText
      : p.theme.palette.primary.dark};

  @media screen and (min-width: calc(845px - 0.02px)) {
    display: none;
  }
`;

const BaseTypography = styled(Typography)`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;
`;

const VerificationEmailTitle = styled(BaseTypography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  font-size: 32px;
  margin: auto;

  @media screen and (min-width: 844px) {
    min-width: 457px;
  }
`;

const VerificationEmailSubTitle = styled(BaseTypography)`
  text-align: center;
  margin-bottom: 4px;
  font-size: 24px;
  text-transform: capitalize;
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (max-width: 844px) {
    margin: auto;
  }
`;

const VerificationEmailParagraph = styled(BaseTypography)`
  font-size: 16px;
  color: ${(p) => p.theme.palette.primary.dark};
  display: flex;
  margin-bottom: 4px;

  @media screen and (min-width: 844px) {
    min-width: 389px;
  }
`;

const VerificationEmailSubParagraph = styled(BaseTypography)`
  text-align: justify;
  font-size: 16px;
  color: ${(p) => p.theme.palette.primary.dark};
  display: flex;

  @media screen and (min-width: 844px) {
    min-width: 389px;
  }
`;

const LoginAccountButton = styled(DefaultButton)`
  height: 40px;
  width: 180px;
  padding: 8px 12px;
  margin-top: 24px;
  margin-bottom: 124px;

  @media screen and (min-width: 844px) {
    display: flex;
    width: 180px;
    height: 40px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
`;

export {
  VerificationEmailWrapper,
  VerificationEmailTitle,
  VerificationEmailSubTitle,
  VerificationEmailParagraph,
  VerificationEmailSubParagraph,
  LoginAccountButton,
  TextBox,
};
