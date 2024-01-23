import { Helmet } from 'react-helmet-async';
// @mui
import {  Button, Container, Stack, Typography, TextField, Box, Card, CardMedia, FormHelperText, Checkbox, Grid, Autocomplete } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from 'src/api';
import { useEffect, useState } from 'react';
import EditorComponent from 'src/sections/@dashboard/blog/EditorComponent';
import Swal from 'sweetalert2';
import { dataURLtoFile, toDataURL } from 'src/functions';

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categories = {
        // '0': {name: 'Tất cả tin', value:'0'},
        '1': {name: 'Hoạt động công ty', value:'1'},
        '2': {name: 'Đảng Đoàn thể', value:'2'},
        '3': {name: 'Pháp luật môi trường', value:'3'},
        '4': {name: 'Tin tức khác', value:'4'},
    }
    const [category, setCategory] = useState({name: 'Hoạt động công ty', value:'1'}) 
    // const [category, setCategory] = useState()     
    const [title,setTitle] = useState('')
    const [title_en,setTitleEN] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const [image, setImage] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [key_post,setKeyPost] = useState(0)
    useEffect(()=>{
        async function fetchData() {
            const postLists = await getPostById('post',id)
            if(postLists.result){
                try {
                    const post = postLists.result 
                    setTitle(post.name || '')
                    setTitleEN(post.name_en || '')
                    setContent(post.content || '')
                    setContentEN(post.content_en || '')
                    setCategory(categories[String(post.type_id)] || '')
                    setKeyPost(post.key_post || 0)
                    setImage(`${process.env.REACT_APP_HOST}/read_image/${post.image}`)
                    toDataURL(`${process.env.REACT_APP_HOST}/read_image/${post.image}`)
                    .then(dataUrl => {
                        var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                        setImageFile(fileData)
                    })
                } catch (error) {
                    
                }
            }
        }
        fetchData()
    },[id])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file))
    }

    const handleEditPost = async (id,type_id,name,name_en,content,content_en,key_post,imageFile) =>{
        if(name && name_en){
            const response = await updatePost('post',id,type_id,name,name_en,content,content_en, imageFile,key_post)
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            if(response.result.status == 'success'){
                navigate('/dashboard/tintuc', { replace: true });
            }
        }
    }
    const handleCancel = () => {
        navigate('/dashboard/tintuc', { replace: true })
    }
    const handleDeletePost = async (id)=>{
        Swal.fire({
            text: `Are you sure you want to delete post?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deletePost('post',id)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                if(response.result.status == 'success'){
                    navigate('/dashboard/tintuc', { replace: true });
                }
            }
          })
        
    }
    return (
        <>
        <Helmet>
            <title> Dashboard: Edit post | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
        </Helmet>

        <Container maxWidth={'xl'}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Edit post {id}
                </Typography>
            </Stack>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                                <Typography variant="h6" gutterBottom>
                                    Loại tin
                                </Typography>
                                <Autocomplete
                                    id="tags-standard"
                                    options={Object.values(categories)}
                                    getOptionLabel={(option) => option.name}
                                    value={category}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder={"Chọn loại tin tức"}
                                        />
                                    )}

                                    onChange={(e,value)=>{
                                        setCategory(value)
                                    }}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom>
                                Tin nổi bật
                            </Typography>
                            <Checkbox  
                                checked={key_post == 1}
                                onChange={(e)=>{
                                    if(e.target.checked){
                                        setKeyPost(1)
                                    }else{
                                        setKeyPost(0)
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Stack>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Tiêu đề
                    </Typography>
                    <TextField 
                        variant="standard"  
                        fullWidth 
                        value={title} 
                        onChange={(e)=>{setTitle(e.target.value)}}
                        error={title?.length == 0} 
                        helperText = {title?.length == 0 ? "Title cannot be empty" : ""}
                    />
                </Card>
            </Stack>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Tiêu đề (EN)
                    </Typography>
                    <TextField 
                        variant="standard" 
                        fullWidth 
                        value={title_en} 
                        onChange={(e)=>{setTitleEN(e.target.value)}}
                        error={title_en?.length == 0} 
                        helperText = {title_en?.length == 0 ? "Title cannot be empty" : ""}
                    />
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Stack  mb={5} sx={{alignItems:"center"}}>
                        <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        spacing={2}
                        sx={{width:'100%'}}
                    >
                        <h3>Ảnh nền</h3>
                        <div>
                            <input
                                accept="image/*"
                                id={"file-upload-edit-post-"+id}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e)=>{handleImageUpload(e)}}
                            />

                            <label htmlFor={"file-upload-edit-post-"+id}>
                                <Button variant="text" color="primary" component="span">
                                   {image ?  "Replace image" : "Upload image"}
                                </Button>
                            </label>
                        </div>
                        
                    </Stack>
                    <Stack  mb={5} sx={{alignItems:"center"}}>
                        <Box
                            sx={{display: 'flex', alignItems:'center', flexDirection:'column'}}
                        >
                            <CardMedia
                                component="img"
                                sx={{ width: 600, height: 300, textAlign: "center" }}
                                image={`${image}`}
                                // alt="about 1"
                            />
                        </Box>
                    </Stack>
                    <Stack sx={{alignItems:"center"}}>
                        {
                            !image &&
                            <FormHelperText error>
                                Please upload image.
                            </FormHelperText>
                        }
                    </Stack>
                    </Stack>
                </Card>
            </Stack>

            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Nội dung
                    </Typography>
                    <EditorComponent des={content} setDes={setContent}/>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Nội dung (EN)
                    </Typography>
                    <EditorComponent des={content_en} setDes={setContentEN}/>
                </Card>
            </Stack>
            
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="space-between">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{handleEditPost(id,category.value,title,title_en,content,content_en,key_post,imageFile)}}>Lưu bài đăng</Button>
                    <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Huỷ</Button>
                </Stack>
                <Button variant="text" color="error" onClick={()=>{handleDeletePost(id)}}>Xoá bài đăng</Button>
            </Stack>
        </Container>
        </>
    );
}
