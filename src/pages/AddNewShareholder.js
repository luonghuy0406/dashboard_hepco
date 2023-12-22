import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Card, CardMedia, Box, FormHelperText, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditorComponent from 'src/sections/@dashboard/blog/EditorComponent';
import { addNewPost } from 'src/api';
import Swal from 'sweetalert2';

export default function AddNewShareholder() {
    const navigate = useNavigate();
    const categories = {
        '5': {name: 'Thông báo', value:'5'},
        '6': {name: 'Báo cáo', value:'6'}
    }
    const [category, setCategory] = useState({name: 'Thông báo', value:'5'}) 
    const [title,setTitle] = useState('')
    const [title_en,setTitleEN] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const [image, setImage] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };
    const handleAddNewPost = async (title, title_en,content,content_en, image)=>{
        if(title && title_en && image){
            const imageFile = document.getElementById('file-upload-new-post').files[0]
            const response = await addNewPost(title, title_en, content, content_en, imageFile)
            Swal.fire(
                response.results.status,
                response.results.msg,
                response.results.status
            )
            if(response.results.status == 'success'){
                navigate('/dashboard/codong', { replace: true });
            }
        }
    }
    const handleCancel = () => {
        setTitle('')
        setTitleEN('')
        setContent('')
        setContentEN('')
        setImage('')
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
                    <Button variant="contained" onClick={()=>{handleAddNewPost(title, title_en,content,content_en, image)}}>Lưu bài viết</Button>
                    <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Huỷ</Button>
                </Stack>
            </Stack>
    </Container>
    </>
  );
}
