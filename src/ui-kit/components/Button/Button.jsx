/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { buttonCss, iconButtonCss } from './Button.styled';

export function DefaultButton({
  isOnlyIcon = false,
  isStartIcon = false,
  isDisabled = false,
  isEndIcon = false,
  label = 'Button',
  handleClick,
  ariaLabel = ' ',
}) {
  if (isOnlyIcon)
    return (
      <IconButton
        onClick={handleClick}
        aria-label={ariaLabel}
        disabled={isDisabled}
        css={iconButtonCss}
      >
        {isOnlyIcon}
      </IconButton>
    );
  if (isStartIcon) {
    return (
      <Button
        css={buttonCss}
        startIcon={isStartIcon}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {label}
      </Button>
    );
  }
  if (isEndIcon)
    return (
      <Button
        css={buttonCss}
        endIcon={isEndIcon}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {label}
      </Button>
    );
  return (
    <Button css={buttonCss} onClick={handleClick} disabled={isDisabled}>
      {label}
    </Button>
  );
}

// DefaultButton.defaultProps = {
//   isOnlyIcon: false,
//   isStartIcon: false,
//   isEndIcon: false,
//   isDisabled: false,
//   label: 'Button',
// };
