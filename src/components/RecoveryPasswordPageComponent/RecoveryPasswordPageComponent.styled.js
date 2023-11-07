import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import DefaultButton from '../../ui-kit/components/Button';
import { ICONS } from '../../ui-kit/icons';
import WhiteLayout from '../../ui-kit/components/WhiteLayout/WhiteLayout';

export const WhiteBox = styled(WhiteLayout)`
  position: relative;
`;

export const RecoveryPasswordWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const CloseIcon = styled(ICONS.CLOSE_SQUARE)`
  position: absolute;
  right: 26px;
  top: 26px;
`;

export const RecoveryPasswordTitle = styled(Typography)`
  text-align: center;
  color: ${(p) => p.theme.palette.primary.dark};
  margin-bottom: 40px;
`;

export const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const ResetButton = styled(DefaultButton)`
  height: 40px;
  padding: 8px 12px;
  width: 180px;
`;
