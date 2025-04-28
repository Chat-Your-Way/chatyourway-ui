import styled from '@emotion/styled';
import { Box, TextareaAutosize, Typography } from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

// export const ChatWrap = styled(Box)`
export const ChatWrap = styled.div`
  position: relative;
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  /* width: 100%; */
  /* max-width: 342px; */ // Old rule
  /* width: ${(p) => (p.isChatOpened ? '85vw' : '0')}; */

  //height: calc(100vh - 145px); // Old rule
  /* height: ${(p) => (p.isChatOpened ? '85vh' : '0')}; */
  overflow-y: auto;

  /* padding: 6px 6px 21px; */ // Old rule
  /* padding: 0 6px 6px 6px; */
  /* border-radius: 16px; */
  background-color: ${(p) => p.theme.palette.primary.white};

  scroll-behavior: smooth;
  z-index: 0;
  /* @media screen and (min-width: calc(834px - 0.02px)) { */
  /* @media screen and (min-width: 768px) { */
  /* max-width: 648px; */
  /* height: 74vh; */
  /* padding: 0 8px 16px; */
  /* } */

  /* @media screen and (min-width: calc(834px - 0.02px)) and (max-width: calc(1200px - 0.03px)) { */
  /* margin-left: 31px; */
  /* } */

  /* @media screen and (min-width: calc(1200px - 0.02px)) { */
  /* @media screen and (min-width: 1200px) { */
  /* width: ${(p) => (p.isChatOpened ? '51vw' : '0')}; */
  /* max-width: 730px; */
  /* height: calc(100vh - 297px); */
  /* height: 75vh; */
  /* padding: 0 10px 16px; */
  /* } */
`;

export const ChatWrapTemporary = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* width: 100%; */
  /* max-width: 342px; */ // Old rule
  width: ${(p) => (p.isChatOpened ? '85vw' : '0')};

  //height: calc(100vh - 145px); // Old rule
  height: ${(p) => (p.isChatOpened ? '85vh' : '0')};
  overflow-y: auto;

  /* padding: 6px 6px 21px; */ // Old rule
  /* padding: 0 6px 6px 6px; */
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};

  scroll-behavior: smooth;

  /* @media screen and (min-width: calc(834px - 0.02px)) { */
  @media screen and (min-width: 768px) {
    max-width: 648px;
    height: 74vh;
    /* padding: 0 8px 16px; */
  }

  @media screen and (min-width: calc(834px - 0.02px)) and (max-width: calc(1200px - 0.03px)) {
    margin-left: 31px;
  }

  /* @media screen and (min-width: calc(1200px - 0.02px)) { */
  @media screen and (min-width: 1200px) {
    // Do I really need this isChatOpened? In future the isContactListOpened will be needed
    width: ${(p) => (p.isChatOpened ? '51vw' : '43vw')};
    max-width: 730px;
    /* height: calc(100vh - 297px); */
    height: 75vh;
    /* padding: 0 10px 16px; */
  }
`;

export const ChatHeader = styled(Box)`
  /* position: sticky; */
  /* top: 0; */
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 2fr 2fr 50px;
  /* margin-bottom: 16px; */
  padding: 6px 6px 0;
  background-color: ${(p) => p.theme.palette.primary.white};
  @media screen and (min-width: 768px) {
    padding: 8px 8px 0;
  }
  @media screen and (min-width: 1200px) {
    padding: 8px 10px 0;
  }
`;

export const UserBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const InfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 8px;
  /* @media screen and (min-width: calc(845px - 0.02px)) {
    padding: 8px 12px 4px 12px;
  } */
`;

export const ChatUserName = styled(Typography)`
  margin-bottom: 4px;
  color: ${(p) => p.theme.palette.primary.dark};
  /* font-size: ${(p) => p.fontSize}; */
`;

export const TypingIndicator = styled(Typography)`
  /* ${(p) => p.theme.typography.h6}; */
  color: #48a87a;

  /* @media screen and (min-width: calc(845px - 0.02px)) {
      ${(p) => p.theme.typography.h5};
    } */
`;

export const InfoMoreBox = styled(Box)`
  display: flex;
  gap: 4px;
  justify-self: right;
`;

export const ChatSectionWrap = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: ${({ isMyMessage }) =>
    isMyMessage ? 'row ' : 'row-reverse'};

  padding: 5px;
  background-color: ${(props) =>
    props.messageStatus || props.foundMessage
      ? `${props.theme.palette.primary.light}`
      : 'none'}; //light: '#ACADFF', light: '#6261AF',

  border: ${(props) =>
    props.messageStatus || props.foundMessage
      ? `${props.theme.palette.primary.main} 1px solid`
      : 'none'};
  border-radius: 16px;
`;

export const IndicatorBox = styled.div`
  display: flex;
  flex-direction: ${({ isMyMessage }) =>
    isMyMessage ? 'row ' : 'row-reverse'};
  ${({ isMyMessage }) =>
    isMyMessage ? 'margin-left: auto;' : 'margin-right: auto;'}
`;

export const TimeIndicator = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
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
  position: sticky;
  bottom: 0;
  display: flex;
  /* position: relative; */
  align-items: center;
  padding: 0px 6px 6px;
  background-color: ${(p) => p.theme.palette.primary.white};
  @media screen and (min-width: 768px) {
    padding: 0px 8px 10px;
  }
  @media screen and (min-width: 1200px) {
    padding: 0px 10px 16px;
  }
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
  bottom: 25px;
  right: 20px;
  gap: 10px;
`;

// export const IconSmile = styled(ICONS.SMILE)`
//   fill: ${(p) => p.theme.palette.primary.dark};
// `; //! CHAT-220--smile-disable

export const IconSend = styled(ICONS.SEND)`
  fill: ${(p) => p.theme.palette.primary.dark};
`;
