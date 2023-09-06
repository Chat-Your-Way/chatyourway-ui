import styled from '@emotion/styled';
import { InputBase } from '@mui/material';

export const SearchInputStyled = styled(InputBase)`
  width: ${(p) => (p.inputWidth ? p.inputWidth : '400px')};
  height: ${(p) => (p.inputHeight ? p.inputHeight : '42px')};
  background-color: ${(p) => (p.theme === 'light' ? '#FFFFFF' : '#171717')}
  padding: 8px 0px 8px 12px;
  opacity: 1;
`;
