import styled from '@emotion/styled';
import { Box, InputBase, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

export const ChatWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 620px;
  height: 761px;
  padding: 8px 8px 16px;
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};
`;

export const ChatHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const UserBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const ChatUserName = styled(Typography)`
  margin-bottom: 4px;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const TypingIndicator = styled(Typography)`
  color: #48a87a;
`;

export const InfoMoreBox = styled(Box)`
  display: flex;
  gap: 4px;
`;

export const IconMore = styled(ICONS.MORE_CIRCLE)`
  width: 40px;
  height: 40px;
  fill: ${(p) => p.theme.palette.primary.contrastText};
`;
export const ChatSectionWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const ChatSection = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const MessageContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  flex-direction: ${({ isMyMessage }) =>
    isMyMessage ? 'row ' : 'row-reverse'};
`;

export const IndicatorBox = styled(Box)`
  display: flex;
  flex-direction: ${({ isMyMessage }) =>
    isMyMessage ? 'row ' : 'row-reverse'};
  ${({ isMyMessage }) =>
    isMyMessage ? 'margin-left: auto;' : 'margin-right: auto;'}
  padding: 12px 12px 0;
`;

export const TimeIndicator = styled(Typography)`
  color: #999;
  font-size: 12px;
  ${({ isMyMessage }) =>
    isMyMessage ? 'margin-right: 16px;' : 'margin-left: 16px;'}
`;

export const UserName = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const IconActivity = styled(Box)`
  display: flex;
  ${({ isMyMessage }) =>
    isMyMessage ? 'margin-right: 4px;' : 'margin-left: 4px;'}
`;

export const UserMassageWrap = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const TextMessageBlock = styled(Box)`
  display: flex;
  padding: 12px;
  align-items: flex-start;
  gap: 8px;
`;

export const TextMessage = styled(Box)`
  padding: 12px;
  border-radius: ${({ isMyMessage }) =>
    isMyMessage ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};
  color: ${(p) => p.theme.palette.primary.dark};
  background-color: ${(p) => p.theme.palette.primary.disabled};
`;

export const IconMoreChat = styled(ICONS.MORE_CIRCLE)`
  min-width: 20px;
  min-height: 20px;
  fill: ${(p) => p.theme.palette.primary.lightDisabled};
`;

export const ChatInputStyled = styled(InputBase, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: ${(p) => (p.inputWidth ? p.inputWidth : '100%')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '42px')};
  border-radius: 100px;
  padding: 12px 20px 12px 12px;
  margin-bottom: 15px;
`;

export const ChatInputIconBox = styled(Box)`
  display: flex;
  gap: 10px;
`;

export const IconSmile = styled(ICONS.SMILE)`
  fill: ${(p) => p.theme.palette.primary.dark};
`;

export const IconSend = styled(ICONS.SEND)`
  fill: ${(p) => p.theme.palette.primary.dark};
`;
