import { memo } from 'react';
import {
  StyledStack,
  StyledSlider,
  StyledStartDiv,
  StyledEndDiv,
} from './Slider.styled';

function Slider({
  value,
  handleChange,
  startLabel,
  endLabel,
  widthBlock,
  pLeftStartDiv,
  pRightStartDiv,
  pTopStartDiv,
  pBottomStartDiv,
  pLeftEndDiv,
  pRightEndDiv,
  pTopEndDiv,
  pBottomEndDiv,
  colorSlider,
  thumbBorderColor,
  trackColor,
  ariaLabel = '',
  ...props
}) {
  return (
    <StyledStack widthBlock={widthBlock} {...props}>
      <StyledStartDiv
        pLeftStartDiv={pLeftStartDiv}
        pRightStartDiv={pRightStartDiv}
        pTopStartDiv={pTopStartDiv}
        pBottomStartDiv={pBottomStartDiv}
      >
        {startLabel}
      </StyledStartDiv>
      <StyledSlider
        aria-label={ariaLabel}
        value={value}
        onChange={handleChange}
        colorSlider={colorSlider}
        thumbBorderColor={thumbBorderColor}
        trackColor={trackColor}
      />
      <StyledEndDiv
        pLeftEndDiv={pLeftEndDiv}
        pRightEndDiv={pRightEndDiv}
        pTopEndDiv={pTopEndDiv}
        pBottomEndDiv={pBottomEndDiv}
      >
        {endLabel}
      </StyledEndDiv>
    </StyledStack>
  );
}

export default memo(Slider);
