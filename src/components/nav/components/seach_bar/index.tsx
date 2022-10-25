import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Search } from '@components';
import { chainConfig } from '@src/configs';
import { useSearchBar } from './hooks';

const SearchBar: React.FC<{className?: string}> = ({ className }) => {
  const { t } = useTranslation();
  const {
    handleOnSubmit,
  } = useSearchBar(t);

  let placeholderText;
  if (chainConfig.extra.profile) {
    placeholderText = t('common:searchBarPlaceholderDtag');
  } else {
    placeholderText = t('common:searchBarPlaceholder');
  }

  return (
    <Search
      className={className}
      placeholder={placeholderText}
      callback={handleOnSubmit}
    />
  );
};

export default SearchBar;
