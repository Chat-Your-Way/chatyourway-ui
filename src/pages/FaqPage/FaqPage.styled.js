import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { ICONS } from '../../ui-kit/icons';

export const FaqPageWrapper = styled(Box)`
  max-width: 730px;
  height: 760px;
  padding: 40px 55px;
  margin: 0 auto;
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.whiteRBGA};

  @media screen and (max-width: calc(1195px - 0.02px)) {
    max-width: 600px;
    height: 840px;
    padding: 40px 24px;
  }
  @media screen and (max-width: calc(845px - 0.02px)) {
    min-width: 330px;
    height: 600px;
    padding: 0 6px;
  }
`;

export const FaqPageTitle = styled(Typography)`
  ${(p) => p.theme.typography.h1};
  margin-bottom: 20px;
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (max-width: calc(845px - 0.02px)) {
    font-size: 32px;
    margin-bottom: 16px;
  }
`;

export const FaqAccordion = styled(Accordion)`
  &:before {
    content: none;
  }
  box-shadow: none;
  margin: 16px 0;
  ${(p) => p.theme.typography.h5};
  border: 1px solid ${(p) => p.theme.palette.primary.light};
  border-radius: 16px !important;
  color: ${(p) => p.theme.palette.primary.dark};
  background: ${(p) => p.theme.palette.primary.disabled};
  word-wrap: break-word;
`;

export const IconDown = styled(ICONS.ARROW_DOWN2)`
  fill: ${(p) => p.theme.palette.primary.light};
`;

export const FaqAccordionSummary = styled(AccordionSummary)`
  display: flex;
  align-items: center;
`;

export const FaqAccordionDetails = styled(AccordionDetails)``;
