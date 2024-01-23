import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Box, Card, CardMedia, FormHelperText, Autocomplete } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from 'src/api';
import { useEffect, useState } from 'react';
import EditorComponent from 'src/sections/@dashboard/blog/EditorComponent';
import Swal from 'sweetalert2';

export default function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categories = {
        '7': {name: 'Dự án đầu tư', value:'7'},
        '8': {name: 'Hợp tác trong nước', value:'8'},
        '9': {name: 'Hợp tác nước ngoài', value:'9'}
    }
    const [category, setCategory] = useState({name: 'Dự án đầu tư', value:'7'})     
    const [title,setTitle] = useState('')
    const [title_en,setTitleEN] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const [image, setImage] = useState('')
    useEffect(()=>{
        async function fetchData() {
            const postLists = await getPostById('project',id)
            if(postLists.result){
                try {
                    const post = postLists.result 
                    setTitle(post.name || '')
                    setTitleEN(post.name_en || '')
                    setContent(post.content || '')
                    setContentEN(post.content_en || '')
                    setCategory(categories[String(post.type_id)] || {name: 'Dự án đầu tư', value:'7'})
                    setImage(`${process.env.REACT_APP_HOST}/read_image/${post.image}`)
                } catch (error) {
                    
                }
            }
        }
        fetchData()
    },[id])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };

    const handleEditPost = async (id,type_id,name,name_en,content,content_en) =>{
        if(name && name_en){
            const image = document.getElementById("file-upload-edit-post-"+id).files[0] || ''
            const response = await updatePost('project',id,type_id,name,name_en,content,content_en, image)
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            if(response.result.status == 'success'){
                navigate('/dashboard/duan', { replace: true });
            }
        }
    }
    const handleCancel = () => {
        navigate('/dashboard/duan', { replace: true })
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
                const response = await deletePost('project',id)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                if(response.result.status == 'success'){
                    navigate('/dashboard/duan', { replace: true });
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
                                    id="tags-standard-pro"
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
                    <Button variant="contained" onClick={()=>{handleEditPost(id,category.value,title,title_en,content,content_en)}}>Lưu bài đăng</Button>
                    <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Huỷ</Button>
                </Stack>
                <Button variant="text" color="error" onClick={()=>{handleDeletePost(id)}}>Xoá bài đăng</Button>
            </Stack>
        </Container>
        </>
    );
}
