import styled from '@emotion/styled';
import DefaultButton from '../../../ui-kit/components/Button';

export const NewSettingsWrap = styled.form`
  padding: 0 15px 0 15px;
  margin: 16px 0;
`;

export const SaveChangeButton = styled(DefaultButton)`
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 40px;
  color: ${(p) => p.theme.palette.primary.dark};
`;
