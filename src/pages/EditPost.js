import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function EditPost() {
    const { id } = useParams();
  return (
    <>
      <Helmet>
        <title> Dashboard: Edit post {id} | MEKONG MARINE SUPPLY CO., LTD </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit post {id}
          </Typography>
        </Stack>
        <Stack  mb={5}>
            <TextField label="Post title" variant="outlined" />
        </Stack>
        <Stack  mb={5}>
            <Button variant="contained">Upload Image Banner</Button>
        </Stack>
        <CKEditor
            editor={ Editor }
            data="<p>Hello from CKEditor 5!</p>"
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
