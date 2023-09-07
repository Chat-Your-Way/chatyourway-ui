import { memo, useState } from 'react';
import { Typography } from '@mui/material';
import {
  ErrorIconInput,
  ErrorWrapper,
  ForgotPswLink,
  IconHide,
  IconVisible,
  LabelLinkWrapper,
  PasswordInputStyled,
  PasswordLabel,
} from './PasswordInput.styled';

const PasswordInput = ({
  placeholderText = 'Minimum of 8 characters',
  error = false,
  errorText = 'Some data is incorrect',
  linkTo = '#',
  inputHandler = () => {},
  inputValue = '',
  inputWidth = '',
  inputHeight = '',
  ...props
}) => {
  const [inputType, setInputType] = useState('password');

  const handleToggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <>
      <LabelLinkWrapper inputWidth={inputWidth}>
        <PasswordLabel>Password</PasswordLabel>
        <ForgotPswLink href={linkTo}>Forgot your password?</ForgotPswLink>
      </LabelLinkWrapper>
      <PasswordInputStyled
        type={inputType}
        placeholder={placeholderText}
        value={inputValue}
        onChange={inputHandler}
        error={error}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        {...props}
        endAdornment={
          inputType === 'text' ? (
            <IconVisible error={error} onClick={handleToggleVisibility} />
          ) : (
            <IconHide onClick={handleToggleVisibility} />
          )
        }
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

export default memo(PasswordInput);
