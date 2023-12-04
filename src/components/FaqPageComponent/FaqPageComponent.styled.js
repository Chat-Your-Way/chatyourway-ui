import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

export const FaqPageWrapper = styled(Box)`
  max-width: 342px;
  height: 600px;
  padding: 0 6px;
  margin: 0 auto;
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};

  @media screen and (min-width: calc(845px - 0.02px)) {
    padding: 40px 20px;
    max-width: 648px;
    height: 840px;
  }

  @media screen and (min-width: calc(1195px - 0.02px)) {
    max-width: 840px;
    height: 760px;
    padding: 40px;
  }
`;

export const FaqPageTitle = styled(Typography)`
  ${(p) => p.theme.typography.h3};
  margin-bottom: 20px;
  color: ${(p) => p.theme.palette.primary.dark};

  @media screen and (min-width: calc(845px - 0.02px)) {
    ${(p) => p.theme.typography.h1};
  }
`;

export const AccordionList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
`;

export const FaqAccordion = styled(Accordion)`
  &:before {
    content: none;
  }
  box-shadow: none;
  ${(p) => p.theme.typography.h5};
  border: 1px solid ${(p) => p.theme.palette.primary.contrastText};
  border-radius: 16px !important;
  color: ${(p) => p.theme.palette.primary.dark};
  background: ${(p) => p.theme.palette.primary.darkPurple};
  word-wrap: break-word;
  padding: 10px 16px;

  .MuiAccordionSummary-content {
    margin: 0 !important;
    height: auto;
  }

  .MuiButtonBase-root {
    min-height: 0 !important;
    padding: 0;
  }

  .MuiPaper-root {
    margin: 0;
    padding: 10px 13px;
  }

  &.Mui-expanded {
    color: ${(p) => p.theme.palette.primary.contrastText};
    font-weight: 600;
    margin: 0 !important;
  }
`;

export const FaqAccordionSummary = styled(AccordionSummary)`
  line-height: 0;
  min-height: 0;
  margin: 0;
`;

export const FaqAccordionTitle = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
  .Mui-expanded & {
    color: ${(p) => p.theme.palette.primary.contrastText};
    font-weight: 700;
  }
`;

export const FaqAccordionDetails = styled(AccordionDetails)`
  margin: 0;
  padding: 0;
`;

export const FaqAccordionText = styled(Typography)`
  color: ${(p) => p.theme.palette.primary.dark};
`;
