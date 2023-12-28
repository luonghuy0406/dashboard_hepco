import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography, Pagination, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSearch } from '../sections/@dashboard/blog';
import {  getPosts } from 'src/api';

export default function ShareholderPage() {
  const categories = {
    '0': {name: 'Tất cả dự án', value:'0'},
    '1': {name: 'Dự án đầu tư', value:'1'},
    '2': {name: 'Hợp tác trong nước', value:'2'},
    '3': {name: 'Hợp tác nước ngoài', value:'3'}
  }

  const [valueFilter, setValueFilter] = useState({name: 'Tất cả dự án', value:'0'})
  const [keyword, setKeyword] = useState('')
  const [postList, setPostList] = useState([])
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages,setTotalPages] = useState(0);
  const handlePageChange = (event, value) => {
      setPage(value)
  }

  const didMount = useRef(false)
  useEffect(() => {
    const timeOutId = keyword && setTimeout(() => doneTyping(), 300);
    function doneTyping () {
        if(didMount.current){
          async function fetchData() {
            const postLists = await getPosts('shareholder',itemsPerPage,valueFilter.value, keyword,page)
            if(postLists.result){
              setTotalPages(Math.ceil(postLists.result.num_shareholder/itemsPerPage))
              setPostList(postLists.result.data)
              setPage(1)
            }
        }
        fetchData()
        }
    }
    didMount.current = true
    return () => clearTimeout(timeOutId);
  }, [keyword])
  useEffect(()=>{
    async function fetchData() {
        const postLists = await getPosts('shareholder',itemsPerPage,valueFilter.value, keyword,page)
        if(postLists.result){
          setTotalPages(Math.ceil(postLists.result.num_shareholder/itemsPerPage))
          setPostList(postLists.result.data)
        }
    }
    fetchData()
  },[valueFilter,page])
  return (
    <>
      <Helmet>
        <title> Dashboard: Cổ đông | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Cổ đông
          </Typography>
          <Link to="/dashboard/codong/add">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Thêm bài đăng mới
              </Button>
          </Link>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch setPostList={setPostList} categories={categories} valueFilter={valueFilter} setValueFilter={setValueFilter} keyword={keyword} setKeyword={setKeyword}/>
        </Stack>

        <Grid container spacing={3}>
          {postList.map((post, index) => (
            <BlogPostCard key={post.id_shareholder} type='codong' id={post.id_shareholder} post={post} categories={categories} />
          ))}
        </Grid>

        <Box sx={{width:'100%', marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Pagination
                variant="outlined" 
                color="primary"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                boundaryCount={1} 
                siblingCount={1}
            />
        </Box>
      </Container>
    </>
  );
}
