import styled from '@emotion/styled';
import { InputBase } from '@mui/material';

export const SearchInputStyled = styled(InputBase, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: 100%;
  height: ${(p) => (p.inputHeight ? p.inputHeight : '42px')};
  padding: ${(p) => (p.inputPadding ? p.inputPadding : '8px 0 8px 12px')};
  opacity: 1;

  @media screen and (min-width: 768px) {
    width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  }
`;
