import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

export const StyledStack = styled(Stack)`
  width: 184px;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StyledStartDiv = styled(Box)`
  width: 24px;
  box-sizing: border-box;
  padding-left: 3px;
  padding-right: 3.94px;
  padding-top: 5px;
  padding-bottom: 3.5px;
`;

export const StyledEndDiv = styled(Box)`
  width: 24px;
  box-sizing: border-box;
  padding-left: 2px;
  padding-right: 1.52px;
  padding-top: 5px;
  padding-bottom: 3.5px;
`;

export const StyledSlider = styled(Slider)`
  color: ${(p) => p.theme.palette.primary.lightDisabled};
  height: 4px;

  .MuiSlider-thumb {
    width: 8px;
    height: 8px;
    color: white;
    border: 2px solid ${(p) => p.theme.palette.primary.main};

    &:focus,
    &:hover,
    &.Mui-active,
    &.Mui-focusVisible {
      box-shadow: none;
    }
  }

  .MuiSlider-track {
    height: 4px;
    border: none;
    color: ${(p) => p.theme.palette.primary.main};

    &:focus,
    &:hover,
    &.Mui-active,
    &.Mui-focusVisible {
      box-shadow: 'inherit';
    }
  }
`;
