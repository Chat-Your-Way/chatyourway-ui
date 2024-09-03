import { memo } from 'react';
import { TextNavLinkButtonStyledWithoutProps } from './TextNavLinkButtonWithoutPropsStyled';

function TextNavLinkButtonWithoutProps({
  to,

  isDisabled = false,
  withoutBackground = false,
  label = 'button',
  fontSize = '',
  iconWidth = '',
  iconHeight = '',
  children,
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
      {children}
      {label}
    </TextNavLinkButtonStyledWithoutProps>
  );
}
export default memo(TextNavLinkButtonWithoutProps);
