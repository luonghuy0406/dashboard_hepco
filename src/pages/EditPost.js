import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Box, Card } from '@mui/material';
import { useParams } from 'react-router-dom';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

import POSTS from '../_mock/blog';

export default function EditPost() {
    const { id } = useParams();
    const post = POSTS.filter((p)=> p.id === id)[0]
    console.log(POSTS,id,post)
    return (
        <>
        <Helmet>
            <title> Dashboard: Edit post | MEKONG MARINE SUPPLY CO., LTD </title>
        </Helmet>

        <Container >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Edit post {id}
            </Typography>
            </Stack>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post title
                    </Typography>
                    <TextField variant="standard" defaultValue={post.title} fullWidth/>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post cover
                    </Typography>
                    <Stack  mb={5} sx={{alignItems:"center"}}>
                        <Box
                            sx={{

                                width: '100%',
                                maxWidth:"1000px",
                                height: {
                                    xs: '200px',
                                    md: '200px',
                                    lg: '300px'
                                },
                                backgroundImage: `url(${post.cover})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                            }}
                        />
                    </Stack>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post content
                    </Typography>
                    <CKEditor
                        editor={ Editor }
                        data={post.content}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </Card>
            </Stack>
            
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="space-between">
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Update</Button>
                    <Button variant="text" style={{color:"gray"}}>Cancel</Button>
                </Stack>
                <Button variant="text" color="error">Delete post</Button>
            </Stack>
        </Container>
        </>
    );
}
