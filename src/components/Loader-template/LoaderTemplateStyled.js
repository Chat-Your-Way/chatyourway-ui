import styled from '@emotion/styled';
import { Box, keyframes } from '@mui/material';
import teamChallangeLoaderCircle from '../../ui-kit/icons/logo/TeamChallengeLoaderCircle.svg';

export const LoaderTemplateContentWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: auto;
`;

const makeInvisible = keyframes`
from {opacity: 1}
to {opacity: 0}`;

export const LoaderTemplateLogoSpan = styled.span`
  align-self: end;
  font-size: 48px;
  line-height: 0.5;
  color: #6261ff;
  letter-spacing: -0.14em;
  animation: ${makeInvisible} 1s linear;
  animation-fill-mode: forwards;
`;

export const LoaderTemplateLogoSpanSecond = styled.span`
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
  align-self: start;
  font-family: 'KyivTypeTitling';
  font-size: 32px;
  color: #6261ff;
  letter-spacing: -0.14em;
  animation: ${makeInvisible} 1s linear;
  animation-fill-mode: forwards;
`;

const changeSizeAnimation = keyframes`
from {
  /* scale: 1; */
  width: 30px;
  height: 30px;
  top: 0;
  left:0;
}
to {
  /* scale: 3; */
  width: 105px;
  height: 105px;
  top: -120%;
  left: -50%;
}
  `;

export const LoaderTemplateSVGWrapper = styled.div`
  position: relative;
`;

export const LoaderTemplateSVGAnimated = styled.img`
  position: absolute;
  animation: ${changeSizeAnimation} 1s linear;
  animation-fill-mode: forwards;
`;

const changeProgressBarVisible = keyframes`
from {
  opacity: 0;

}
to {opacity: 100;}`;

export const LoaderTemplateProgressBar = styled.input`
  /* Reset styles */
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /* Styles for the thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: url('${teamChallangeLoaderCircle}');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    cursor: pointer;
    margin-top: -7px;
  }

  &::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: url('${teamChallangeLoaderCircle}');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    cursor: pointer;
  }
  &::-ms-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: url('${teamChallangeLoaderCircle}');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    cursor: pointer;
  }

  /* Styles for track */
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: #999999;
    border-radius: 4px;
    background: linear-gradient(
      to right,
      #8686dc ${(props) => `${props.$valueProgressBar}%` || '100%'},
      #999999 ${(props) => `${props.$valueProgressBar - 100}px` || '100%'}
    );

    background-color: #999999;
  }

  &:focus::-webkit-slider-runnable-track {
    background: linear-gradient(
      to right,
      #8686dc ${(props) => `${props.$valueProgressBar}%` || '100%'},
      #999999 ${(props) => `${props.$valueProgressBar - 100}px` || '100%'}
    );
  }

  &::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: #999999;
    border-radius: 4px;
  }

  &::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: #999999;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  &:focus::-ms-track {
    background: linear-gradient(
      to right,
      #8686dc ${(props) => `${props.$valueProgressBar}%` || '100%'},
      #999999 ${(props) => `${props.$valueProgressBar - 100}px` || '100%'}
    );
  }
  &::-ms-fill-lower {
    background: #999999;
    border-radius: 4px;
  }
  &:focus::-ms-fill-lower {
    background: #999999;
  }
  &::-ms-fill-upper {
    background: #999999;
    border-radius: 4px;
  }
  &:focus::-ms-fill-upper {
    background: #999999;
  }

  width: 200px;
  opacity: 0;
  margin-top: 21px;

  animation: ${changeProgressBarVisible} 0.5s 1s linear;
  animation-fill-mode: forwards;
`;
