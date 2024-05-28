import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const RadioGroup = styled(Box)`
  list-style: none;
  margin: 0 auto 8px auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  justify-content: center;

  @media screen and (min-width: 560px) {
    gap: 9px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media screen and (min-width: 769px) {
    padding: 24px 0 0 0;
    gap: 16px;
  }
`;

export const RadioLabel = styled.label`
  position: relative;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const RadioInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  &:checked + div {
    border-radius: 50%;
    outline: 2px solid ${(p) => p.theme.palette.primary.contrastText};
  }
`;
