import styled from '@emotion/styled';
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

export const FaqPageWrapper = styled(Box)`
  position: relative;
  width: 87vw;
  height: 71vh;
  padding: 10px 6px;

  /* margin: 0 auto; */
  border-radius: 16px;
  background-color: ${(p) => p.theme.palette.primary.white};

  scrollbar-width: thin;
  scrollbar-color: ${(p) =>
    /* eslint-disable */
    `${p.theme.palette.primary.main} ${p.theme.palette.primary.light}`};

  @media screen and (min-width: 768px) {
    width: 75vw;
    height: 75vh;
    padding: 40px 24px;
  }

  @media screen and (min-width: 1200px) {
    width: 60vw;
    /* height: 761px; */
    padding: 40px;
  }
`;

export const FaqPageTitle = styled(Typography)`
  ${p => p.theme.typography.h3};
  margin-bottom: 20px;
  color: ${p => p.theme.palette.primary.dark};

  @media screen and (min-width: 769px) {
    ${p => p.theme.typography.h1};
    justify-content: start;
  }
`;

export const AccordionList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 80%;
  margin: auto;
  /* max-width: 85vw; */
  /* max-width: 330px; */
  /* height: 75vh; */

  /* max-height: 490px; */
  background: ${p => p.theme.palette.primary.darkPurple};
  /* overflow-y: auto; */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${p =>
    /* eslint-disable */
    `${p.theme.palette.primary.main} ${p.theme.palette.primary.light}`};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    background-color: ${p => p.theme.palette.primary.darkPurple};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.palette.primary.lightPurple};
  }
  @media screen and (min-width: 768px) {
    max-width: 600px;
    /* max-height: 700px; */
  }

  @media screen and (min-width: 1200px) {
    max-width: 730px;
    /* max-height: 861px; */
  }
`;

export const FaqAccordion = styled(Accordion)`
  &:before {
    content: none;
  }
  box-shadow: none;
  ${p => p.theme.typography.h5};
  border: 1px solid ${p => p.theme.palette.primary.contrastText};
  border-radius: 16px !important;
  color: ${p => p.theme.palette.primary.dark};
  background: ${p => p.theme.palette.primary.darkPurple};
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
    color: ${p => p.theme.palette.primary.contrastText};
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
  color: ${p => p.theme.palette.primary.dark};
  .Mui-expanded & {
    color: ${p => p.theme.palette.primary.contrastText};
    font-weight: 700;
  }
`;

export const FaqAccordionDetails = styled(AccordionDetails)`
  margin: 0;
  padding: 0;
`;

export const FaqAccordionText = styled(Typography)`
  color: ${p => p.theme.palette.primary.dark};
`;
