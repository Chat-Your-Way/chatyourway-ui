import styled from '@emotion/styled';
import DefaultButton from '../../../ui-kit/components/Button';

export const NewSettingsWrap = styled.form`
  margin: 0 auto;
`;

export const SaveChangeButton = styled(DefaultButton)`
  display: block;
  margin: 0 auto;
  width: 180px;
  height: 40px;
  color: ${(p) => p.theme.palette.primary.dark};
`;
