import { memo } from 'react';
import { Typography } from '@mui/material';
import {
  EditIcon, EmailInputLabel, EmailInputStyled, ErrorIconInput, ErrorWrapper
} from './EmailInput.styled';

const EmailInput = ({
  placeholderText = 'example@gmail.com',
  error = false,
  errorText = 'Some data is incorrect',
  inputValue = '',
  inputWidth = '',
  inputHeight = '',
  ...props
}) => {
  const handleInputChange = (e) => {
    if (!e.target.value.trim()) return;
  };

  return (
    <>
      <EmailInputLabel variant="h5" component="label">
        Email
      </EmailInputLabel>
      <EmailInputStyled
        type="email"
        sx={{
          opacity: inputValue ? '1' : '0.6',
          borderColor: error
            ? (theme) => theme.palette.primary.errorColor
            : (theme) => theme.palette.primary.main,
        }}
        placeholder={placeholderText}
        onChange={handleInputChange}
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
