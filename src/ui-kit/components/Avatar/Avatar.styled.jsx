import styled from '@emotion/styled';
import { Avatar } from '@mui/material';

const sizeController = (size = 'xl') => {
  switch (size) {
    case 'xs':
      return '24px';
    case 'sm':
      return '40px';
    case 'md':
      return '48px';
    case 'lg':
      return '56px';
    case 'xl':
      return '80px';
    default:
      '80px';
  }
};

export const AvatarStyled = styled(Avatar)`
  width: ${(p) => sizeController(p.size)};
  height: ${(p) => sizeController(p.size)};
  padding: 0;
  border: ${(p) => (p.current === 'true' ? '1px solid #353535' : 'none')};
  background-color: ${(p) =>
    p.backgroundcolor ? p.backgroundcolor : '#ACADFF'};
  color: #000;
  font-size: 24px;
`;
