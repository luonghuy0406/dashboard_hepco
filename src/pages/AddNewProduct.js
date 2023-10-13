import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, Card, CardMedia, Box, Autocomplete } from '@mui/material';
import { useParams } from 'react-router-dom';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { EditorComponent } from 'src/sections/@dashboard/products';
const gr =[
    {
      value : 1,
      label: 'Chocking Compound'
    },
    {
      value : 2,
      label: 'Auxiliary Machinery'
    },
    {
      value : 3,
      label : 'Viega Pipe & Fittings'
    },
    {
      value : 4,
      label : 'Viton/FKM rubber packing sheet'
    }
  ]
export default function AddNewProduct() {
  const [name,setName] = useState('')
  const [des,setDes] = useState('')
  const [des_en,setDesEN] = useState('')
  const [image, setImage] = useState('')
  const [group, setGroup] = useState(1)

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file))
    
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Add new product | MEKONG MARINE SUPPLY CO., LTD </title>
      </Helmet>

      
      <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Add new product
            </Typography>
            </Stack>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Grid container>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="h6" gutterBottom>
                                Product name
                            </Typography>
                            <TextField variant="standard" value={name} sx={{ px: 2 }}  fullWidth onChange={(e)=>{setName(e.target.value)}}/>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6}>
                            <Typography variant="h6" gutterBottom>
                                Product group
                            </Typography>
                            <Autocomplete
                                fullWidth
                                options={gr}
                                getOptionLabel={(option) => option.label}
                                onChange={(e,value)=>{
                                    setGroup(value.value)
                                }}
                                defaultValue={{
                                    value : 1,
                                    label: 'Chocking Compound'
                                  }}
                                renderInput={(params) => (
                                <TextField
                                {...params}
                                    variant="standard" 
                                />
                                )}
                                sx={{ width: '100%', px: 2 }}
                            />
                        </Grid>
                    </Grid>
                    
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
                        <h3>Product Cover</h3>
                        <div>
                            <input
                                accept="image/*"
                                id={"file-upload-new-product"}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e)=>{handleImageUpload(e)}}
                            />

                            <label htmlFor={"file-upload-new-product"}>
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
                                sx={{ width: 200, height: 200, textAlign: "center" }}
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
                        Product Description EN
                    </Typography>
                    <EditorComponent des={des_en} setDes={setDesEN}/>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Product Description VI
                    </Typography>
                    <EditorComponent des={des} setDes={setDes}/>
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
