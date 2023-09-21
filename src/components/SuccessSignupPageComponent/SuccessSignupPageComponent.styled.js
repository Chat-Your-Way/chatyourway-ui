import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';

export const SuccessSignupWrapper = styled(Box)`
  text-align: center;
  margin: auto;
`;

export const SuccessSignupTitle = styled(Typography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  margin-bottom: 40px;
`;

export const LoginAccountButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
`;
