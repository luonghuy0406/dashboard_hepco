import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, TextField, Card, CardMedia, Box, FormHelperText, Autocomplete, Checkbox, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addNewPost } from 'src/api';
import Swal from 'sweetalert2';
import EditorComponent from 'src/sections/@dashboard/blog/EditorComponent';

export default function AddNewPost() {
    const navigate = useNavigate();
    const categories = {
        // '0': {name: 'Tất cả tin', value:'0'},
        '1': {name: 'Hoạt động công ty', value:'1'},
        '2': {name: 'Đảng Đoàn thể', value:'2'},
        '3': {name: 'Pháp luật môi trường', value:'3'},
        '4': {name: 'Tin tức khác', value:'4'},
    }
    const [category, setCategory] = useState({name: 'Hoạt động công ty', value:'1'}) 
    const [title,setTitle] = useState('')
    const [key_post,setKeyPost] = useState(0)
    const [title_en,setTitleEN] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const [image, setImage] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };
    const handleAddNewPost = async (type_id,title, title_en,content,content_en, image,key_post)=>{
        if(title && title_en && image){
            const imageFile = document.getElementById('file-upload-new-post').files[0]
            const response = await addNewPost('post',type_id, title, title_en, content, content_en, imageFile,key_post)
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
        setCategory({name: 'Hoạt động công ty', value:'1'})
        setTitle('')
        setTitleEN('')
        setContent('')
        setContentEN('')
        setImage('')
        setKeyPost(0)
        navigate('/dashboard/tintuc', { replace: true })
    }
  return (
    <>
      <Helmet>
        <title> Dashboard: Thêm bài đăng mới | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      
      <Container maxWidth={'xl'}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Thêm bài đăng mới
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
                        Tiêu đề bài viết
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
                        Tiêu đề bài viết (EN)
                    </Typography>
                    <TextField 
                        variant="standard"  
                        fullWidth value={title_en} 
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
                                id={"file-upload-new-post"}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e)=>{handleImageUpload(e)}}
                                multiple
                            />

                            <label htmlFor={"file-upload-new-post"}>
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
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{handleAddNewPost(category.value,title, title_en,content,content_en, image,key_post)}}>Lưu bài viết</Button>
                    <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Huỷ</Button>
                </Stack>
            </Stack>
    </Container>
    </>
  );
}
