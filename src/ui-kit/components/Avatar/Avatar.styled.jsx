import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const sizes = {
  sm: '55px',
  md: '60px',
  lg: '80px',
};

export const AvatarStyled = styled(Avatar)`
  width: ${(p) => sizes[p.size]};
  height: ${(p) => sizes[p.size]};
  padding: 0;
  border-radius: ${(p) => sizes[p.size]};
  border: ${(p) => (p.current === 'true' ? '1px solid #353535' : 'none')};
  background-color: ${(p) =>
    p.backgroundcolor ? p.backgroundcolor : '#ACADFF'};
  color: #000;
  font-size: ${(p) => (p.size === 'lg' ? '32px' : '24px')};
`;
