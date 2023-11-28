import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import bgiUrl from '../../ui-kit/images/404/404-error.png';
import TextNavLinkButton from '../../ui-kit/components/TextNavLinkButton';

export const NotFoundWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NotFoundTitle = styled(Typography)`
  margin: 0 0 24px 0;
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const NotFoundImg = styled.image`
  width: 200px;
  height: 200px;
  margin: 0 0 24px 0;
  background: no-repeat center url(${bgiUrl});
  background-size: cover;
  @media screen and (min-width: calc(845px - 0.02px)) {
    width: 290px;
    height: 290px;
  }
`;

export const NotFoundLinkWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 180px;
`;

export const NotFoundLink = styled(TextNavLinkButton)`
  text-align: center;
`;
