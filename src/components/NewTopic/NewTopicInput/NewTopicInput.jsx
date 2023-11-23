import { memo } from 'react';
import {
  StyledInputLabel,
  StyledTextField,
  StyledInputBox,
  StyledErrorBlock,
  StyledErrorText,
  EDITIcon,
  CROSSIcon,
} from './NewTopicInput.styled';

const NewTopicInput = ({
  label,
  placeholder,
  error = false,
  errorMessage,
  value = '',
  onChangeHandler = () => {},
  ...props
}) => {
  const endIcon = value != '' ? null : <EDITIcon />;

  return (
    <StyledInputBox>
      <StyledInputLabel>
        {label}
        <StyledTextField
          isError={error}
          type="text"
          placeholder={placeholder}
          InputProps={{
            endAdornment: endIcon,
          }}
          onChange={onChangeHandler}
          value={value}
          {...props}
        />
      </StyledInputLabel>

      {error && (
        <StyledErrorBlock>
          <CROSSIcon />
          <StyledErrorText>{errorMessage}</StyledErrorText>
        </StyledErrorBlock>
      )}
    </StyledInputBox>
  );
};

export default memo(NewTopicInput);
