import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const CheckboxWrapper = styled(Box)`
  margin: 0;

  @media screen and (min-width: 380px) {
    margin: 10px 0 16px 12px;
  }

  @media screen and (min-width: 769px) {
    margin: 0 0 20px -68px;
  }
`;

export const CheckboxTitle = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
`;

export const CheckboxLink = styled(Link)`
  text-decoration: underline;
  color: ${(p) => p.theme.palette.primary.dark};
`;
