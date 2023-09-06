import { memo, useState } from 'react';
import { ICONS } from '../../../icons/index';
import { SearchInputStyled } from './SearchInput.styled';

const SearchInput = ({
  placeholderText = 'пошук',
  handleInputValue = () => {},
  inputValue = '',
  inputWidth = '',
  inputHeight = '',
  theme = 'light',
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
      value={inputValue}
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      theme={theme}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleInputValue}
      startAdornment={<ICONS.SEARCH />}
    />
  );
};

export default memo(SearchInput);
