import { memo } from 'react';
import {
  StyledInputLabel,
  StyledTextField,
  StyledInputBox,
  StyledErrorText,
} from './NewTopicInput.styled';
import { ICONS } from '../../../ui-kit/icons';

const NewTopicInput = ({
  label,
  placeholder,
  error = false,
  errorMessage,
  value = '',
  onChangeHandler = () => {},
  ...props
}) => {
  return (
    <StyledInputBox>
      <StyledInputLabel>
        {label}
        <StyledTextField
          type="text"
          placeholder={placeholder}
          InputProps={{
            endAdornment: <ICONS.EDIT />,
          }}
          onChange={onChangeHandler}
          value={value}
          {...props}
        />
      </StyledInputLabel>

      {error && <StyledErrorText>{errorMessage}</StyledErrorText>}
    </StyledInputBox>
  );
};

export default memo(NewTopicInput);
