import { memo, useState } from 'react';
import { ICONS } from '../../../icons/index';
import { SearchInputStyled } from './SearchInput.styled';

const SearchInput = ({
  placeholderText = 'пошук',
  inputWidth = '',
  inputHeight = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SearchInputStyled
      placeholder={
        isFocused ? '| пошук по # або ключевим словам' : placeholderText
      }
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      startAdornment={<ICONS.SEARCH />}
    />
  );
};

export default memo(SearchInput);
