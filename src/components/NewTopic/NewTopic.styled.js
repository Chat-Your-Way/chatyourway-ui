import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Button from '../../ui-kit/components/Button';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';

export const StyledModalBox = styled(Box)`
  margin: auto;
  padding: 0 1.5rem;
  position: relative;
  box-sizing: border-box;
  width: min(87%, 800px);
  height: min(71%, 600px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};
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

export const ConfirmButton = styled(Button, {
  shouldForwardProp: (p) => p !== 'isError',
})`
  width: 180px;
  ${(p) => p.theme.typography.h4};
  background: ${(p) =>
    p.isError
      ? p.theme.palette.primary.disabled
      : p.theme.palette.primary.main};
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  fill: ${(p) => p.theme.palette.primary.dark};
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  width: 24px;
  height: 24px;

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
`;
