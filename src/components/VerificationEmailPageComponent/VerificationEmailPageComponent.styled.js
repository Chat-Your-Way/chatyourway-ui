import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';

const VerificationEmailWrapper = styled(Box)`
  /* text-align: center; */
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
  /* text-align: center; */
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

const VerificationEmailTitle = styled(Typography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 43.2px */
  margin: auto;
  @media screen and (min-width: 844px) {
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 135%; /* 43.2px */
    text-transform: capitalize;
    margin: auto;
    min-width: 457px;
  }
`;

const VerificationEmailSubTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 4px;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 32.4px */
  text-transform: capitalize;
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (max-width: 844px) {
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 135%; /* 32.4px */
    text-transform: capitalize;
    margin: auto;
  }
`;

const VerificationEmailParagraph = styled(Typography)`
  /* text-align: justify; */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 21.6px */
  color: ${(p) => p.theme.palette.primary.dark};
  top: 0;
  display: flex;
  margin-bottom: 4px;

  @media screen and (min-width: 844px) {
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 135%; /* 21.6px */
    min-width: 389px;
  }
`;

const VerificationEmailSubParagraph = styled(Typography)`
  text-align: justify;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 21.6px */
  color: ${(p) => p.theme.palette.primary.dark};
  top: 0;
  display: flex;
  margin: 0;

  @media screen and (min-width: 844px) {
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 135%; /* 21.6px */
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
