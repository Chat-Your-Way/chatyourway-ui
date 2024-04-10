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

  @media screen and (min-width: calc(834px - 0.02px)) {
    margin-bottom: 16px;
  }
`;

export const StyledSearchInput = styled(SearchInput, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: 330px;

  @media screen and (min-width: calc(834px - 0.02px)) {
    width: 400px;
  }

  @media screen and (min-width: calc(1200px - 0.02px)) {
    width: ${(p) =>
      p.isOpenChat ? '360px' : p.isOpenContacts ? '300px' : '400px'};
  }
`;
