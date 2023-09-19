import styled from '@emotion/styled';
import { InputBase } from '@mui/material';

export const SearchInputStyled = styled(InputBase, {
  shouldForwardProp: (p) => p !== 'inputWidth' && p !== 'inputHeight',
})`
  width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '42px')};
  padding: 8px 0px 8px 12px;
  opacity: 1;
`;
