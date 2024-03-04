import styled from '@emotion/styled';
import { Box, TextareaAutosize, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

export const ChatWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 342px;
  height: 100vh;
  padding: 6px 6px 21px;
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};
  overflow-y: auto;
  @media screen and (min-width: calc(845px - 0.02px)) {
    max-width: 648px;
    padding: 8px 8px 16px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    max-width: 730px;
  }
`;

export const ChatHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const UserBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const InfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 0px 8px;
  @media screen and (min-width: calc(845px - 0.02px)) {
    padding: 8px 12px 4px 12px;
  }
`;

export const ChatUserName = styled(Typography)`
  margin-bottom: 4px;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const TypingIndicator = styled(Typography)`
  ${(p) => p.theme.typography.h6};
  color: #48a87a;

  @media screen and (min-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h5};
  }
`;

export const InfoMoreBox = styled(Box)`
  display: flex;
  gap: 4px;
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
    isMyMessage
      ? 'margin-left: auto;'
      : 'margin-right: auto;'}/* padding: 12px 12px; */ //!
`;

export const TimeIndicator = styled(Typography)`
  color: #999;
  font-size: 12px;
  ${({ isMyMessage }) =>
    isMyMessage ? 'margin-right: 8px;' : 'margin-left: 8px;'}

  @media screen and (min-width: calc(845px - 0.02px)) {
    ${({ isMyMessage }) =>
      isMyMessage ? 'margin-right: 16px;' : 'margin-left: 16px;'}
  }
`;

export const UserName = styled(Typography)`
  ${(p) => p.theme.typography.h6};
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (min-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h5};
  }
`;

export const IconActivity = styled(Box)`
  display: flex;
  ${({ isMyMessage }) =>
    isMyMessage ? 'margin-right: 4px;' : 'margin-left: 4px;'}
`;

export const UserMassageWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 12px; //?!
  gap: 12px; //?!
`;

export const TextMessageBlock = styled(Box)`
  display: flex;
  /* padding: 12px; */ //!
  align-items: flex-start;
  gap: 8px;
`;

export const TextMessage = styled(Box)`
  ${(p) => p.theme.typography.h5}
  padding: 12px;
  border-radius: ${({ isMyMessage }) =>
    isMyMessage ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};
  color: ${(p) => p.theme.palette.primary.dark};
  background-color: ${(p) => p.theme.palette.primary.disabled};
`;

export const InputBox = styled(Box)`
  display: flex;
  position: relative;
  align-items: center;
`;

export const ChatInputStyled = styled(TextareaAutosize)`
  ${(p) => p.theme.typography.h5};
  width: 100%;
  color: ${(p) => p.theme.palette.primary.dark};
  border-color: ${(p) => p.theme.palette.primary.contrastText};
  border-radius: 100px;
  padding: 12px 98px 12px 22px;
  resize: none;
  background-color: ${(p) => p.theme.palette.primary.white};
  outline: 0;
  box-sizing: border-box;
`;

export const ChatInputIconBox = styled(Box)`
  display: flex;
  position: absolute;
  bottom: 8px;
  right: 20px;
  gap: 10px;
`;

// export const IconSmile = styled(ICONS.SMILE)`
//   fill: ${(p) => p.theme.palette.primary.dark};
// `; //! CHAT-220--smile-disable

export const IconSend = styled(ICONS.SEND)`
  fill: ${(p) => p.theme.palette.primary.dark};
`;
