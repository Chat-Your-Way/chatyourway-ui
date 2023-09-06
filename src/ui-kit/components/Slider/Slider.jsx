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
  ariaLabel = '',
  ...props
}) {
  return (
    <StyledStack widthBlock={widthBlock} {...props}>
      <StyledStartDiv>{startLabel}</StyledStartDiv>
      <StyledSlider
        aria-label={ariaLabel}
        value={value}
        onChange={handleChange}
      />
      <StyledEndDiv>{endLabel}</StyledEndDiv>
    </StyledStack>
  );
}

export default memo(Slider);
