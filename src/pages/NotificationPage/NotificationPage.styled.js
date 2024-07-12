import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const NotificationPageWrap = styled(Box)`
  display: flex;
  flex-grow: 2;

  @media screen and (min-width: calc(1200px - 0.02px)) {
    gap: 40px;
  }
`;
