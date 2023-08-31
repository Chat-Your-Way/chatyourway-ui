import React, { memo, useState } from 'react';
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import InputBase from '@mui/material/InputBase';
import { Box, Typography } from '@mui/material';

const PasswordInput = ({
  placeholderText = 'Minimum of 8 characters',
  error = false,
  errorText = 'Some data is incorrect',
  errorIcon = (
    <CloseIcon
      sx={{
        stroke: (theme) => theme.palette.primary.errorColor,
        width: '16px',
        height: '16px',
        strokeWidth: '1.5px',
      }}
    />
  ),
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('password');
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = useState(error);

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleToggleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <>
      <Typography
        variant="h5"
        component="label"
        sx={{ color: (theme) => theme.palette.primary.dark }}
      >
        Password
      </Typography>
      <InputBase
        type={inputType}
        sx={{
          opacity: inputValue ? '1' : '0.6',
          borderColor: isError
            ? (theme) => theme.palette.primary.errorColor
            : (theme) => theme.palette.primary.main,
        }}
        placeholder={placeholderText}
        onChange={handleInputChange}
        endAdornment={
          inputType === 'text' ? (
            <VisibilityIcon
              sx={{
                position: 'absolute',
                right: '12px',
                cursor: 'pointer',
                opacity: isError ? '0.6' : '1',
              }}
              onClick={handleToggleVisibility}
            />
          ) : (
            <VisibilityOffIcon
              sx={{
                position: 'absolute',
                opacity: '0.6',
                right: '12px',
                cursor: 'pointer',
              }}
              onClick={handleToggleVisibility}
            />
          )
        }
      />
      {isError && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {errorIcon}
          <Typography variant="errorText">{errorText}</Typography>
        </Box>
      )}
    </>
  );
};

export default memo(PasswordInput);
