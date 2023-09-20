import { memo } from 'react';
import { WhiteLayoutStyled } from './WhiteLayout.styled';

function WhiteLayout({
  width = '800px',
  height = '600px',
  padding = '',
  children,
}) {
  return (
    <WhiteLayoutStyled width={width} height={height} padding={padding}>
      {children}
    </WhiteLayoutStyled>
  );
}

export default memo(WhiteLayout);
