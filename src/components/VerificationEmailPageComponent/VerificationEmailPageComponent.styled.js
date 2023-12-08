import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import TextNavLinkButton from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';

const VerificationEmailWrapper = styled(Box)`
  gap: 4px;
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
  ${(p) => p.theme.typography.h3}
  min-width: 300px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 457px;
  }
`;

const VerificationEmailSubTitle = styled(Typography)`
  ${(p) => p.theme.typography.h4}
  color: ${(p) => p.theme.palette.primary.dark};
`;

const VerificationEmailParagraph = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  display: flex;
  ${(p) => p.theme.typography.h5}
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 389px;
  }
`;

const VerificationEmailSubParagraph = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  display: flex;
  ${(p) => p.theme.typography.h5}
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 389px;
  }
`;

const LoginAccountButton = styled(TextNavLinkButton)`
  ${(p) => p.theme.typography.h5}
  padding: 8px 12px;
  margin-top: 24px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    display: flex;
    ${(p) => p.theme.typography.h5}
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
