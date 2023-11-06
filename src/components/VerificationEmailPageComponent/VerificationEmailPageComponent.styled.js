import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';

const VerificationEmailWrapper = styled(Box)`
  text-align: center;
  margin: auto;

  @media screen and (max-width: 844px) {
    padding: 16px;
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
  text-transform: capitalize;

  @media screen and (max-width: 844px) {
    font-size: 24px;
    margin-bottom: 20px;
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
    font-size: 18px;
  }
`;

const VerificationEmailParagraph = styled(Typography)`
  text-align: justify;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 21.6px */
  color: ${(p) => p.theme.palette.primary.dark};
  margin: auto 32px;
  display: block; /* Додай цей рядок */

  @media screen and (max-width: 844px) {
    font-size: 16px;
    text-align: left; /* Зберігай цей рядок для мобільних екранів */
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
  width: 389px;
  display: block; /* Додай цей рядок */
  margin: auto 32px;

  @media screen and (max-width: 844px) {
    font-size: 16px;
    text-align: left; /* Зберігай цей рядок для мобільних екранів */
  }
`;

const LoginAccountButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
  margin-top: 24px;

  @media screen and (max-width: 844px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export {
  VerificationEmailWrapper,
  VerificationEmailTitle,
  VerificationEmailSubTitle,
  VerificationEmailParagraph,
  VerificationEmailSubParagraph,
  LoginAccountButton,
};
