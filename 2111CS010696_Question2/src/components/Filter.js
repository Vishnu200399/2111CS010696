import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const Filter = ({ handleFilterChange, filters }) => {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="company">Company</InputLabel>
        <Select
          value={filters.company}
          onChange={handleFilterChange}
          inputProps={{
            name: 'company',
            id: 'company',
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="AMZ">AMZ</MenuItem>
          <MenuItem value="FLP">FLP</MenuItem>
          {/* Add other companies */}
        </Select>
      </FormControl>
      {/* Add similar filters for category, price, rating, availability */}
      <Button variant="contained" color="primary">
        Apply Filters
      </Button>
    </div>
  );
};

export default Filter;