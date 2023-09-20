import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const sizePicker = {
  sm: { width: '55px', height: '55px' },
  md: { width: '60px', height: '60px' },
  lg: { width: '80px', height: '80px' },
};

export const AvatarStyled = styled(Avatar)`
  ${(p) => sizePicker[p.size]};
  padding: 0;
  border: ${(p) => (p.current === 'true' ? '1px solid #353535' : 'none')};
  background-color: ${(p) =>
    p.backgroundcolor ? p.backgroundcolor : '#ACADFF'};
  color: #000;
  font-size: ${(p) => (p.size === 'lg' ? '32px' : '24px')};
`;
