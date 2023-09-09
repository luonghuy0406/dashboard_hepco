import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Card } from '@mui/material';
import { useParams } from 'react-router-dom';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function AddNewPost() {
    const { id } = useParams();
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
                        Post title
                    </Typography>
                    <TextField variant="standard"  fullWidth/>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Post cover
                    </Typography>
                    <Stack  mb={5} sx={{alignItems:"center"}}>
                        <Button>Add cover photo</Button>
                        {/* <Box
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
                        /> */}
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
                        data={''}
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
            
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Save post</Button>
                    <Button variant="text" style={{color:"gray"}}>Cancel</Button>
                </Stack>
            </Stack>
        </Container>
    </>
  );
}
