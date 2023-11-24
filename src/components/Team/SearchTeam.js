// SearchComponent.js
import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <TextField
      label="검색"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      onKeyDown={handleSearchKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      autoComplete="off"
    />
  );
};

export default SearchComponent;
