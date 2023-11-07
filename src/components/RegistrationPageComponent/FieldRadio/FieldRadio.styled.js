import styled from '@emotion/styled';

export const RadioGroup = styled.div`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  justify-content: center;
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
