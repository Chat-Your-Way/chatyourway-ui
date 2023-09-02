import { memo, useState } from 'react';
import { ICONS } from '../../../icons/index';
import { SearchInputStyled } from './SearchInput.styled';

const SearchInput = ({
  placeholderText = 'пошук',
  handleInputValue = () => {},
  inputValue = '',
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

  const handleOnKeyUp = (e) => {
    if (e.key !== 'Enter' && !e.target.value.trim()) {
      return;
    }
    handleInputValue();
  };

  return (
    <SearchInputStyled
      placeholder={
        isFocused ? '| пошук по # або ключевим словам' : placeholderText
      }
      value={inputValue}
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleOnKeyUp}
      startAdornment={<ICONS.SEARCH />}
    />
  );
};

export default memo(SearchInput);
