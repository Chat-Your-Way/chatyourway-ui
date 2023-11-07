import { memo } from 'react';
import { Typography } from '@mui/material';
import {
  EditIcon,
  EmailInputLabel,
  EmailInputStyled,
  ErrorIconInput,
  ErrorWrapper,
} from './EmailInput.styled';

const EmailInput = ({
  placeholderText = 'example@gmail.com',
  error = false,
  errorText = 'Дані не вірні',
  inputValue = '',
  inputHandler = () => {},
  inputWidth = '',
  inputHeight = '',
  labelText = 'Email',
  ...props
}) => {
  return (
    <>
      <EmailInputLabel>{labelText}</EmailInputLabel>
      <EmailInputStyled
        type="email"
        placeholder={placeholderText}
        value={inputValue}
        onChange={inputHandler}
        endAdornment={inputValue ? null : <EditIcon />}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        {...props}
      />
      {error && (
        <ErrorWrapper>
          <ErrorIconInput />
          <Typography variant="errorText">{errorText}</Typography>
        </ErrorWrapper>
      )}
    </>
  );
};

export default memo(EmailInput);
