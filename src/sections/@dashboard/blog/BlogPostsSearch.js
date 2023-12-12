import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, Card, InputAdornment, Popper, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { slugify } from '../products/ProductFilterSidebar';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

// const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
//   width: '100% !important',
// });

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogPostsSearch({ posts, categories }) {
  
  const [dataNews, setDataNews] = useState(posts)
  const [valueFilter, setValueFilter] = useState([{name: 'Tất cả tin', value:'0'}])
  const [keyword, setKeyword] = useState('')
  const handleSearch = ()=>{
    let value = valueFilter?.map((option)=> option.value)
    let data = []
    if(value?.length > 0 && value.indexOf('0')===-1){
        const newsFilter = posts.filter((news)=>{
          return value.indexOf(news.group_id) > -1
        })
        data = newsFilter
    }else{
        data = posts
    }
    if(keyword?.length > 0){
        const newsSearch= data.filter((news)=>{
          return slugify(news.title.toLowerCase()).indexOf(slugify(keyword.toLowerCase())) > -1
        })
        data = newsSearch
    }
    setDataNews(data)
  }
  
  useEffect(()=>{
    handleSearch()
  },[keyword, valueFilter])

  return (
    <>
      <Autocomplete
          multiple
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
