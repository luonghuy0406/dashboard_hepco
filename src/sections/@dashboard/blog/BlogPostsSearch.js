import PropTypes from 'prop-types';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';


import Iconify from '../../../components/iconify';
export default function BlogPostsSearch({ categories, valueFilter, setValueFilter, keyword, setKeyword }) {
  return (
    <>
      <Autocomplete
          id="tags-standard"
          options={Object.values(categories)}
          getOptionLabel={(option) => option.name}
          value={valueFilter}
          renderInput={(params) => (
            <TextField
            {...params}
              variant="outlined"
              placeholder={"Chọn loại tin tức để lọc"}
            />
          )}

          onChange={(e,value)=>{
            setValueFilter(value)
        }}
          sx={{ width: '30%', px: 2 }}
      />
      <TextField
        variant="outlined" 
        fullWidth
        placeholder="Search post by name"
        onChange={(e)=>{setKeyword(e.target.value)}}
        value={keyword} 
        sx={{ width: '70%' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
