import React, { memo, useState } from 'react';
import { Create as CreateIcon, Close as CloseIcon } from '@mui/icons-material';

import InputBase from '@mui/material/InputBase';
import { Box, Typography } from '@mui/material';

const EmailInput = ({
  placeholderText = 'example@gmail.com',
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
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = useState(error);

  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };

  return (
    <>
      <Typography
        variant="h5"
        component="label"
        sx={{ color: (theme) => theme.palette.primary.dark }}
      >
        Email
      </Typography>
      <InputBase
        type="email"
        sx={{
          opacity: inputValue ? '1' : '0.6',
          borderColor: isError
            ? (theme) => theme.palette.primary.errorColor
            : (theme) => theme.palette.primary.main,
        }}
        placeholder={placeholderText}
        onChange={handleInputChange}
        endAdornment={
          inputValue ? (
            ''
          ) : (
            <CreateIcon sx={{ position: 'absolute', right: '12px' }} />
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

export default memo(EmailInput);
