import styled from '@emotion/styled';
import { ICONS } from '../../ui-kit/icons';
import { Box, Typography } from '@mui/material';

export const ModalOverlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  position: relative;
  width: 400px;
  text-align: center;
`;

export const ModalTitle = styled(Typography)`
  margin-bottom: 32px;
  color: ${(p) => p.theme.palette.primary.dark};
  font-weight: 500;
  font-size: 24px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const CancelButton = styled.button`
  background: ${(p) => p.theme.palette.grey[300]};
  color: ${(p) => p.theme.palette.text.primary};
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${(p) => p.theme.palette.grey[400]};
  }
`;

export const ConfirmButton = styled.button`
  background: ${(p) => p.theme.palette.primary.main};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${(p) => p.theme.palette.primary.dark};
  }
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  & > path,
  & > circle {
    transition: all 0.2s ease;
  }
  path {
    fill: ${(p) => p.theme.palette.primary.dark};
  }
  circle {
    stroke: ${(p) => p.theme.palette.primary.dark};
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

export const ClickableOverlay = styled(ModalOverlay)`
  cursor: pointer;
`;
