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
  ...props
}) {
  return (
    <TextNavLinkButtonStyled
      to={to}
      disabled={isDisabled}
      fontSize={fontSize}
      withoutBackground={withoutBackground}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {label}
    </TextNavLinkButtonStyled>
  );
}
export default memo(TextNavLinkButton);
