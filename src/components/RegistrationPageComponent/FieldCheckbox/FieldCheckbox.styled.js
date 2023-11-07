import styled from '@emotion/styled';
import { Typography, FormControlLabel, Checkbox } from '@mui/material';

export const CheckboxLabel = styled(FormControlLabel)`
  margin-right: 0;
  margin-bottom: 24px;
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const CheckboxTitle = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const CheckboxLink = styled.a`
  text-decoration: underline;
`;

export const CheckboxStyled = styled(Checkbox)`
  color: ${(p) => p.theme.palette.primary.contrastText};
`;
