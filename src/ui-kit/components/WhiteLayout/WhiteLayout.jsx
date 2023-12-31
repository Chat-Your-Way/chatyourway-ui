import { memo } from 'react';
import { WhiteLayoutStyled } from './WhiteLayout.styled';

function WhiteLayout({ width = '', height = '', padding = '', children }) {
  return (
    <WhiteLayoutStyled width={width} height={height} padding={padding}>
      {children}
    </WhiteLayoutStyled>
  );
}

export default memo(WhiteLayout);
