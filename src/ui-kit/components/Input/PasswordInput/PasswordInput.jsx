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
        sx={{
          opacity: inputValue ? '1' : '0.6',
          borderColor: error
            ? (theme) => theme.palette.primary.errorColor
            : (theme) => theme.palette.primary.main,
        }}
        placeholder={placeholderText}
        value={inputValue}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        {...props}
        endAdornment={
          inputType === 'text' ? (
            <IconVisible
              sx={{
                opacity: error ? '0.6' : '1',
              }}
              onClick={handleToggleVisibility}
            />
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
