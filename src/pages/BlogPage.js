import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import {  getPosts } from 'src/api';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
  const categories = {
    '0': {name: 'Tất cả tin', value:'0'},
    '1': {name: 'Hoạt động công ty', value:'1'},
    '2': {name: 'Đảng Đoàn thể', value:'2'},
    '3': {name: 'Pháp luật môi trường', value:'3'},
    '4': {name: 'Tin tức khác', value:'4'},
}
  const [postList, setPostList] = useState([])
  const [postListTemp, setPostListTemp] = useState([])
  const [update,setUpdate] = useState(false)
  useEffect(()=>{
    async function fetchData() {
        const postLists = await getPosts()
        if(postLists.results){
          setPostList(postLists.results)
          setPostListTemp(postLists.results)
        }
    }
    fetchData();
    
},[update])
  return (
    <>
      <Helmet>
        <title> Dashboard: News and Events | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            News and Events
          </Typography>
          <Link to="/dashboard/tintuc/add">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Post
              </Button>
          </Link>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={postList} categories={categories}/>
        </Stack>

        <Grid container spacing={3}>
          {postListTemp.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
