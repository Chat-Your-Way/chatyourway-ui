import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const CheckboxWrapper = styled(Box)`
  margin: 0 0 24px 0;
`;

export const CheckboxTitle = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const CheckboxLink = styled(Link)`
  text-decoration: underline;
  color: ${(p) => p.theme.palette.primary.dark};
`;
