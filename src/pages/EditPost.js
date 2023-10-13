import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Box, Card, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from 'src/api';
import { useEffect, useState } from 'react';
import { EditorComponent } from 'src/sections/@dashboard/products';

export default function EditPost() {
    const { id } = useParams();

    const [title,setTitle] = useState('')
    const [title_en,setTitleEN] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const [image, setImage] = useState('')
    useEffect(()=>{
        async function fetchData() {
            const postLists = await getPostById(id)
            if(postLists.results){
                const post = postLists.results 
                setTitle(post.name)
                setTitleEN(post.name_en)
                setContent(post.content)
                setContentEN(post.content_en)
                setImage(`${process.env.REACT_APP_API_HOST}/read_image/${post.image}`)
            }
        }
        fetchData();
        
    },[id])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };

    const handleEditPost = async (id,name,name_en,content,content_en) =>{
        const image = document.getElementById("file-upload-edit-post-"+id).files[0] || []
        const response = await updatePost(id,name,name_en,content,content_en, image)
        console.log(">>>",response)
    }
    
    const handleDeletePost = async (id)=>{
        const response = await deletePost(id)
    }
    return (
        <>
        <Helmet>
            <title> Dashboard: Edit post | MEKONG MARINE SUPPLY CO., LTD </title>
        </Helmet>

        <Container maxWidth={'xl'}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Edit post {id}
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
                                id={"file-upload-edit-post-"+id}
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
            
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="space-between">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{handleEditPost(id,title,title_en,content,content_en)}}>Save post</Button>
                    <Button variant="text" style={{color:"gray"}}>Cancel</Button>
                </Stack>
                <Button variant="text" color="error" onClick={()=>{handleDeletePost(id)}}>Delete product</Button>
            </Stack>
        </Container>
        </>
    );
}
