import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Card, CardMedia, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { EditorComponent } from 'src/sections/@dashboard/products';
import { addNewPost } from 'src/api';

export default function AddNewPost() {
    const [title,setTitle] = useState('')
    const [title_en,setTitleEN] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const [image, setImage] = useState('')

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };
    const handleAddNewPost = async (title, title_en,content,content_en)=>{
        const image = document.getElementById('file-upload-new-post').files[0]
       const response = await addNewPost(title, title_en, content, content_en, image)
       console.log(">>>>",response)
    }
  return (
    <>
      <Helmet>
        <title> Dashboard: Add new post | MEKONG MARINE SUPPLY CO., LTD </title>
      </Helmet>

      
      <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Add new post
            </Typography>
            </Stack>

            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post title EN
                    </Typography>
                    <TextField variant="standard"  fullWidth value={title_en} onChange={(e)=>{setTitleEN(e.target.value)}}/>
                </Card>
            </Stack>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post title VI
                    </Typography>
                    <TextField variant="standard"  fullWidth value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
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
                        <h3>Post Cover</h3>
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
                    </Stack>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post Content EN
                    </Typography>
                    <EditorComponent des={content_en} setDes={setContentEN}/>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post Content VI
                    </Typography>
                    <EditorComponent des={content} setDes={setContent}/>
                </Card>
            </Stack>
            
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{handleAddNewPost(title, title_en,content,content_en)}}>Save post</Button>
                    <Button variant="text" style={{color:"gray"}}>Cancel</Button>
                </Stack>
            </Stack>
        </Container>
    </>
  );
}
