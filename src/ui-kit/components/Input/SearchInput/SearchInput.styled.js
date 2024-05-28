import styled from '@emotion/styled';
import { InputBase } from '@mui/material';

export const SearchInputStyled = styled(InputBase, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: 100%;
  height: ${(p) => (p.inputHeight ? p.inputHeight : '42px')};
  padding: 8px 0 8px 12px;
  opacity: 1;

  @media screen and (min-width: 769px) {
    width: 400px;
  }
`;
