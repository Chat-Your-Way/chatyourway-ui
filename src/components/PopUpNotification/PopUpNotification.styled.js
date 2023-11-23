import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

export const StyledPopUpNotification = styled(Box)`
  display: ${(p) => (p.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  width: 350px;
  padding: 12px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 16px;
  background: linear-gradient(
    178deg,
    #fff 1.3%,
    rgba(255, 255, 255, 0.94) 46.28%,
    #ceceed 98.27%
  );
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  @media screen and (min-width: calc(845px - 0.02px)) {
    min-width: 454px;
    top: 0;
    right: 0;
    margin-top: 40px;
    margin-right: 40px;
  }
  @media screen and (min-width: calc(1200px - 0.02px)) {
    min-width: 528px;
    top: 0;
    right: 0;
    margin-top: 32px;
    margin-right: 80px;
  }
`;

export const CloseButton = styled(ICONS.CLOSE_SQUARE)`
  fill: transparent;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;

  &:hover {
    path {
      fill: ${(p) => p.theme.palette.primary.light};
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
  fill: ${(p) => p.theme.palette.primary.light};
`;

export const NotificationText = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  ${(p) => p.theme.typography.p}
`;
