import React, {useEffect, useState} from 'react';import { Grid, Button, Container, Stack, Typography, TextField, Card, CardMedia, Box, Autocomplete } from '@mui/material';
import EditorComponent from './EditorComponent';

export default function AddSubProduct({row, setOpen, setUpdate, update, handleDeleteProduct}){
    const [name,setName] = useState('')
    const [image,setImage] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file))
      
    };
    const handleUpdateProduct = () =>{
  
    }
    
    const handleCancel = () =>{
      setName('')
      setImage('')
      setContent('')
      setContentEN('')
      setOpen(false)
    }
    return (
        <Box sx={{ margin: 3}}>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" gutterBottom>
                                Product name
                            </Typography>
                            <TextField variant="standard" value={name} sx={{ px: 2 }}  fullWidth onChange={(e)=>{setName(e.target.value)}}/>
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
                    <EditorComponent des={content_en} setDes={setContentEN}/>
                </Card>
            </Stack>
            <Stack  mb={5} >
                <Card sx={{ p: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Product Description VI
                    </Typography>
                    <EditorComponent des={content} setDes={setContent}/>
                </Card>
            </Stack>
            
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                <Stack spacing={2} direction="row">
                    <Button variant="contained">Save product</Button>
                    <Button variant="text" style={{color:"gray"}}>Cancel</Button>
                </Stack>
            </Stack>
        </Box>
    )
  }