import { memo } from 'react';
import { TextNavLinkButtonStyledWithoutProps } from './TextNavLinkButtonWithoutPropsStyled';

function TextNavLinkButton({
  to,
  label = 'Button',
  isDisabled = false,
  withoutBackground = false,

  fontSize = '',
  iconWidth = '',
  iconHeight = '',
  ...props
}) {
  return (
    <TextNavLinkButtonStyledWithoutProps
      to={to}
      disabled={isDisabled}
      fontSize={fontSize}
      withoutBackground={withoutBackground}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      {...props}
    >
      {label}
    </TextNavLinkButtonStyledWithoutProps>
  );
}
export default memo(TextNavLinkButton);
