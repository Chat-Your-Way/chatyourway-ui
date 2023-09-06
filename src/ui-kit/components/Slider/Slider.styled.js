import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export const StyledStack = styled(Stack)`
  width: ${(p) => (p.widthBlock ? p.widthBlock : '184px')};
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const StyledStartDiv = styled.div`
  width: 24px;
  box-sizing: border-box;
  padding-left: ${(p) => (p.pLeftStartDiv ? p.pLeftStartDiv : '3px')};
  padding-right: ${(p) => (p.pRightStartDiv ? p.pRightStartDiv : '3.94px')};
  padding-top: ${(p) => (p.pTopStartDiv ? p.pTopStartDiv : '5px')};
  padding-bottom: ${(p) => (p.pBottomStartDiv ? p.pBottomStartDiv : '3.5px')};
`;

export const StyledEndDiv = styled.div`
  width: 24px;
  box-sizing: border-box;
  padding-left: ${(p) => (p.pLeftEndDiv ? p.pLeftEndDiv : '2px')};
  padding-right: ${(p) => (p.pRightEndDiv ? p.pRightEndDiv : '1.52px')};
  padding-top: ${(p) => (p.pTopEndDiv ? p.pTopEndDiv : '5px')};
  padding-bottom: ${(p) => (p.pBottomEndDiv ? p.pBottomEndDiv : '3.5px')};
`;

export const StyledSlider = styled(Slider)`
  color: ${(p) => (p.colorSlider ? p.colorSlider : '#afb1b6')};
  height: 4px;

  .MuiSlider-thumb {
    width: 8px;
    height: 8px;
    color: white;
    border: 2px solid
      ${(p) =>
        p.thumbBorderColor ? p.thumbBorderColor : p.theme.palette.primary.main};

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
    color: ${(p) =>
      p.trackColor ? p.trackColor : p.theme.palette.primary.main};

    &:focus,
    &:hover,
    &.Mui-active,
    &.Mui-focusVisible {
      box-shadow: 'inherit';
    }
  }
`;
