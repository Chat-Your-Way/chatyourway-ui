import styled from '@emotion/styled';
import { Box } from '@mui/material';
import SearchInput from '../../../ui-kit/components/Input/SearchInput';

export const StyledBox = styled(Box)`
  margin-bottom: 8px;
  path {
    stroke: ${(p) =>
      p.theme.palette.mode === 'light'
        ? p.theme.palette.primary.dark
        : p.theme.palette.primary.contrastText};
  }

  @media screen and (min-width: 769px) {
    margin-bottom: 16px;
  }
`;

export const StyledSearchInput = styled(SearchInput, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  //width: 330px;

  @media screen and (min-width: 769px) {
    width: 400px;
  }

  @media screen and (min-width: 1200px) {
    width: ${(p) =>
      p.chatOpened ? '360px' : p.contactsOpened ? '300px' : '400px'};
    max-width: 100%;
  }
`;
