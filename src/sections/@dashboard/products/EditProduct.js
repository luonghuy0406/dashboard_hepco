import React, { useState} from 'react';
import {
  Box,
  Stack,
  Typography,
  CardMedia,
  TextField,
  Button,
  Divider,
  Grid
} from '@mui/material';
import EditorComponent from './EditorComponent';

export default function EditProduct ({row, setOpen, setUpdate, update, handleDeleteProduct}){
    const [name,setName] = useState(row.name)
    const [image,setImage] = useState(`${process.env.REACT_APP_API_HOST}/read_image/${row.image}`)
    const [des,setDes] = useState(row.des)
    const [des_en,setDesEN] = useState(row.des_en)
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file))
      
    };
    const handleUpdateProduct = () =>{
  
    }
    
    const handleCancel = () =>{
      setName(row.name)
      setImage(`${process.env.REACT_APP_API_HOST}/read_image/${row.image}`)
      setDes(row.des)
      setDesEN(row.des_en)
      setOpen(false)
    }
    return (
            <Box sx={{ margin: 3}}>
              <Grid container>
                <Grid item xs={2}>
                  <Typography variant="h6" gutterBottom component="div">
                    Edit product
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 2},
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <h3 style={{textAlign:"left"}}>Product name</h3>
                    <TextField defaultValue={name} variant="standard"  fullWidth/>
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
                                id={"file-upload-product"+row.id}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e)=>{handleImageUpload(e)}}
                            />
  
                            <label htmlFor={"file-upload-product"+row.id}>
                                <Button variant="text" color="primary" component="span">
                                    Replace image
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
                                alt="about 1"
                            />
                        </Box>
                    </Stack>
                    <h3 style={{textAlign:"left"}}>Product description VI</h3>
  
                    <EditorComponent des={des} setDes={setDes}/>
                    <h3 style={{textAlign:"left"}}>Product description EN</h3>
  
                    <EditorComponent des={des_en} setDes={setDesEN}/>
  
                  </Box>
                </Grid>
              </Grid>
              <Divider/>
              <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="space-between">
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={handleUpdateProduct}>Update</Button>
                  <Button variant="text" style={{color:"gray"}} onClick={handleCancel}>Cancel</Button>
                </Stack>
                <Button variant="text" color="error" onClick={()=>{handleDeleteProduct(row, setUpdate, update)}}>Delete product</Button>
              </Stack>
            </Box>
    )
  }