import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

export const StyledPopUpNotification = styled(Box, {
  shouldForwardProp: (p) => p !== 'isVisible',
})`
  display: ${(p) => (p.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  width: 350px;
  padding: 12px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 16px;
  background-image: ${({ theme }) =>
    theme.palette.mode === 'light'
      ? /* eslint-disable */
        'linear-gradient(180deg, rgba(255,255,255,1) 1.3%, rgba(255,255,255,0.94) 46.28%, rgba(206,206,237,1) 98.27%);'
      : 'linear-gradient(180deg, #434285 1.35%, #525192 45.62%, rgba(91, 91, 149, 0.95) 100%)'};
  position: fixed;
  top: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  margin-top: 20px;
  margin-right: 20px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 454px;
    margin-top: 40px;
    margin-right: 40px;
  }
  @media screen and (min-width: calc(1200px - 0.02px)) {
    min-width: 528px;
    margin-top: 32px;
    margin-right: 80px;
  }
`;

export const CloseButton = styled(ICONS.CLOSE_SQUARE)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  & > path,
  & > circle {
    transition: all 0.2s ease;
  }

  path {
    fill: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }

  circle {
    stroke: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.main};
  }

  &:hover {
    path {
      fill: ${(p) => p.theme.palette.primary.light};
    }

    circle {
      stroke: ${(p) => p.theme.palette.primary.light};
    }
  }
`;

export const NotificationWrapper = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  margin-bottom: 7px;
  width: 278px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 372px;
  }
  @media screen and (min-width: calc(1200px - 0.02px)) {
    min-width: 528px;
  }
`;

export const NotificationIcon = styled(ICONS.NOTIFICATION)`
  display: flex;
  min-width: 20px;
  min-height: 20px;
  width: 20px;
  height: 20px;
  fill: ${(p) => p.theme.palette.primary.contrastText};
`;

export const NotificationText = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  ${(p) => p.theme.typography.h5}
`;
