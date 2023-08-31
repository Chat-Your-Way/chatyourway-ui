import { memo, useState } from 'react';
import { InputBase } from '@mui/material';

import { ReactComponent as SearchIcon } from '../../icons/svg-icons/Search.svg';

const SearchInput = ({ placeholderText = 'пошук' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <InputBase
      placeholder={
        isFocused ? '| пошук по # або ключевим словам' : placeholderText
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      sx={{
        opacity: '1',
      }}
      startAdornment={<SearchIcon />}
    />
  );
};

export default memo(SearchInput);
