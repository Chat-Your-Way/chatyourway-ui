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
  placeholderText = 'Мінімум 8 символів',
  error = false,
  errorText = 'Дані не вірні',
  linkTo = '#',
  inputHandler = () => {},
  inputValue = '',
  inputWidth = '',
  inputHeight = '',
  inputText = 'Пароль',
  linkText = 'Забули пароль?',
  ...props
}) => {
  const [inputType, setInputType] = useState('password');

  const handleToggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <>
      <LabelLinkWrapper inputWidth={inputWidth}>
        <PasswordLabel>{inputText}</PasswordLabel>
        <ForgotPswLink href={linkTo}>{linkText}</ForgotPswLink>
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
