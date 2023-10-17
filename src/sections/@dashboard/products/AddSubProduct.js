import React, {useEffect, useState} from 'react';import { Grid, Button, Container, Stack, Typography, TextField, Card, CardMedia, Box, Autocomplete, FormControl, FormHelperText } from '@mui/material';
import EditorComponent from './EditorComponent';
import Swal from 'sweetalert2';
import { addSubProduct } from 'src/api';

export default function AddSubProduct({row, setOpen, setUpdate, update, handleDeleteProduct}){
    const [name,setName] = useState('')
    const [image,setImage] = useState('')
    const [content,setContent] = useState('')
    const [content_en,setContentEN] = useState('')
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file))
      
    };
    const handleAddProduct = (name, des, des_en, image, id_product) =>{
        if(name && image){
            let imageUpload = document.getElementById("file-upload-new-sub-product").files[0]
            addSubProduct(name, des, des_en, imageUpload, id_product)
            setTimeout(()=>{
                //upload success
                Swal.fire(
                    'Success!',
                    `Add product ${name} success!`,
                    'success'
                  )
                  handleCancel()
            },2000)
        }
      }
    
    const handleCancel = () =>{
      setName('')
      setImage('')
      setContent('')
      setContentEN('')
      setOpen(false)
      document.getElementById("file-upload-new-sub-product").value = null
    }
    return (
        <Box sx={{ margin: 3}}>
            <Stack  mb={5}>
                <Card sx={{ p: 2}}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h6" gutterBottom>
                                Sub product name
                            </Typography>
                            <FormControl required={true} fullWidth={true}>
                            <TextField
                                required
                                variant='standard'
                                name={"product_name"}
                                onChange={(e)=>{setName(e.target.value)}}
                                error={name?.length == 0} 
                                value={name}
                                helperText = {name?.length == 0 ? "Name cannot be empty" : ""}
                            />
                        </FormControl>
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
                                id={"file-upload-new-sub-product"}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e)=>{handleImageUpload(e)}}
                            />

                            <label htmlFor={"file-upload-new-sub-product"}>
                                <Button variant="text" color="primary" component="span">
                                   {image ?  "Replace image" : "Upload image"}
                                </Button>
                            </label>
                        </div>
                    </Stack>
                    <Stack  mb={2} sx={{alignItems:"center"}}>
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
                    <Button variant="contained" onClick={()=>{handleAddProduct(name, content, content_en, image, row.id_product)}}>Save product</Button>
                    <Button variant="text" style={{color:"gray"}} onClick={handleCancel}>Cancel</Button>
                </Stack>
            </Stack>
        </Box>
    )
  }