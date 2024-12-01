import styled from '@emotion/styled';
import DefaultButton from '../../../ui-kit/components/Button';

export const UserAvatarForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media screen and (min-width: 768px) {
    gap: 20px;
  }
`;

export const SaveChangeAvatarButton = styled(DefaultButton)`
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 40px;
  color: ${(p) => p.theme.palette.primary.dark};
`;
