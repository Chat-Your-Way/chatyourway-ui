/* eslint-disable no-unused-vars */
import { memo, useState } from 'react';
import { ICONS } from '../../../icons/index';
import { SearchInputStyled } from './SearchInput.styled';

const SearchInput = ({
  placeholderText = 'Пошук',
  handleInputValue = () => {},
  inputValue = '',
  inputWidth = '',
  inputHeight = '',
  inputPadding = '',
  startAdornment = <ICONS.SEARCH />,
  ...props
}) => {
  // const [isFocused, setIsFocused] = useState(false);
  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // };

  return (
    <SearchInputStyled
      // placeholder={isFocused ? '| пошук по # або ключевим словам' : placeholderText}
      placeholder={placeholderText}
      value={inputValue}
      inputWidth={inputWidth}
      inputHeight={inputHeight}
      inputPadding={inputPadding}
      {...props}
      // onFocus={handleFocus}
      // onBlur={handleBlur}
      onChange={handleInputValue}
      startAdornment={startAdornment}
    />
  );
};

export default memo(SearchInput);
