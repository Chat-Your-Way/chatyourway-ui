import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';

export const AuthorizationWrapper = styled(Box)`
  width: 358px;
  margin: auto;
`;

export const AuthorizationTitle = styled(Typography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled(Box)`
  gap: 16px;
  display: flex;
  flex-direction: column;
  width: 180px;
  margin: auto;
`;

export const AuthorizationButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
`;
