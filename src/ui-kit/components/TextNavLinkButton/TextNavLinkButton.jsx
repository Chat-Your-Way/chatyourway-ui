import { memo } from 'react';
import { TextNavLinkButtonStyled } from './TextNavLinkButton.styled';

function TextNavLinkButton({
  to,
  label = 'Button',
  isDisabled = false,
  withoutBackground = false,
  startIcon = null,
  endIcon = null,
  fontSize = '',
  iconWidth = '',
  iconHeight = '',
  filled = true,
  ...props
}) {
  return (
    <TextNavLinkButtonStyled
      to={to}
      disabled={isDisabled}
      startIcon={startIcon}
      endIcon={endIcon}
      fontSize={fontSize}
      withoutBackground={withoutBackground}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      filled={filled}
      {...props}
    >
      {label}
    </TextNavLinkButtonStyled>
  );
}
export default memo(TextNavLinkButton);
