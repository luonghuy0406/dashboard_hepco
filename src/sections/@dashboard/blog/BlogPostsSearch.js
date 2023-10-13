import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
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

export default function BlogPostsSearch({ posts, setPostListTemp }) {
  const [postSearch, setPostsSearch] = useState(posts)
  useEffect(()=>{
    setPostsSearch(posts)
  },[posts])
  const handlleSearch = (value, postSearch) =>{
    if(value?.length > 0){
      const postFilter = postSearch.filter(post => {
				if(post.name){
					return slugify(post.name.toLowerCase()).indexOf(slugify(value.toLowerCase()))>=0
				}
			});
      setPostListTemp(postFilter)
    }else{
      setPostListTemp(postSearch)
    }
  }
  return (
    <TextField
      variant="outlined" 
      fullWidth
      placeholder="Search post by name"
      onChange={(e)=>{handlleSearch(e.target.value, posts)}}
      sx={{ width: '100%' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
