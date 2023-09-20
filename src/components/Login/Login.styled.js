import styled from '@emotion/styled';
import { Box } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';

export const LoginWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const LoginButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
  width: 180px;
`;
