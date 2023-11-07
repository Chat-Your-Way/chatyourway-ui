import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';

export const StyledModalBox = styled(Box)`
  position: relative;
  width: min(55%, 800px);
  height: min(71%, 600px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  background-color: ${(p) => p.theme.palette.primary.white};
  margin: auto;
  z-index: 999;
`;

export const StyledForm = styled.form`
  width: min(100%, 400px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const ConfirmButton = styled(Button)`
  width: 180px;
  ${(p) => p.theme.typography.h4};
  background-color: ${(p) => p.theme.palette.primary.main};
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
`;
