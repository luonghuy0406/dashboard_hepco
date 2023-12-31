import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography, Pagination, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSearch } from '../sections/@dashboard/blog';
import {  getPosts, getPostsHighlight } from 'src/api';

export default function BlogPage() {
  const categories = {
    '0': {name: 'Tất cả tin', value:'0'},
    '1': {name: 'Hoạt động công ty', value:'1'},
    '2': {name: 'Đảng Đoàn thể', value:'2'},
    '3': {name: 'Pháp luật môi trường', value:'3'},
    '4': {name: 'Tin tức khác', value:'4'},
    '5': {name: 'Tin nổi bật', value:'5'},
  }

  const [valueFilter, setValueFilter] = useState({name: 'Tất cả tin', value:'0'})
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
        if(didMount.current && valueFilter?.value !=5){
          setPage(1)
          async function fetchData() {
            const postLists = await getPosts('post',itemsPerPage,valueFilter.value, keyword,page)
            if(postLists.result){
              setTotalPages(Math.ceil(postLists.result.num_post/itemsPerPage))
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
        const postLists = await getPosts('post',itemsPerPage,valueFilter.value, keyword,page)
        if(postLists.result){
          setTotalPages(Math.ceil(postLists.result.num_post/itemsPerPage))
          setPostList(postLists.result.data)
        }
    }
    async function fetchData2() {
      const dt = await getPostsHighlight()
      if(dt){
        setTotalPages(Math.ceil(dt.num_post/itemsPerPage))
        setPostList(dt.data)
        setPage(1)
      }
    }
    if(valueFilter?.value !=5){
      fetchData()
    }else{
      
      fetchData2()
    }
  },[valueFilter,page])
  return (
    <>
      <Helmet>
        <title> Dashboard: Tin tức | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tin tức
          </Typography>
          <Link to="/dashboard/tintuc/add">
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Thêm tin mới
              </Button>
          </Link>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch setPostList={setPostList} categories={categories} valueFilter={valueFilter} setValueFilter={setValueFilter} keyword={keyword} setKeyword={setKeyword}/>
        </Stack>

        <Grid container spacing={3}>
          {postList.map((post, index) => (
            <BlogPostCard key={post.id_post} type='tintuc' id={post.id_post} post={post} categories={categories} />
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
