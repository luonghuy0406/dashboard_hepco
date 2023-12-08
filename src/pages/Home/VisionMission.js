import { Helmet } from 'react-helmet-async';
import React from 'react'
import {  Container,Divider, Typography, Box,  CardMedia, Button, Paper, styled, Grid, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBanner } from 'src/api';



// ----------------------------------------------------------------------

export default function VisionMission() {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <VisMis/>
            <CoreValues/>
        </Box>
      </Container>
    </>
  );
}

const VisMis = () =>{
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Tầm nhìn - Sứ mệnh 
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Tầm nhìn"}
                        multiline
                        maxRows={4}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        // onChange={(e)=>{setContent1EN(e.target.value)}}
                        // value={content1EN}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Tầm nhìn (EN)"}
                        multiline
                        maxRows={4}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        // onChange={(e)=>{setContent2EN(e.target.value)}}
                        // value={content2EN}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Sứ mệnh"}
                        multiline
                        maxRows={4}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        // onChange={(e)=>{setContent1EN(e.target.value)}}
                        // value={content1EN}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Sứ mệnh (EN)"}
                        multiline
                        maxRows={4}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        // onChange={(e)=>{setContent2EN(e.target.value)}}
                        // value={content2EN}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative', flexDirection:'column'}}>
                <Typography>Ảnh 1</Typography>
                <CardMedia
                    component="img"
                    sx={{ width: '100%'}}
                    image={`https://web-hepco-7ttu.vercel.app/assets/images/banner2.jpeg`}
                    // alt={banner.id_bn}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-vision-"+1}
                        type="file"
                        style={{ display: 'none' }}
                        // onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-vision-"+1}>
                        <Button variant="contained" color="primary" component="span">
                        {"Replace image"}
                        </Button>
                    </label>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative', flexDirection:'column'}}>
                <Typography>Ảnh 2</Typography>
                <CardMedia
                    component="img"
                    sx={{ width: '100%'}}
                    image={`https://web-hepco-7ttu.vercel.app/assets/images/banner2.jpeg`}
                    // alt={banner.id_bn}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-vision-"+1}
                        type="file"
                        style={{ display: 'none' }}
                        // onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-vision-"+1}>
                        <Button variant="contained" color="primary" component="span">
                        {"Replace image"}
                        </Button>
                    </label>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end'}}
                >
                    <Button variant="contained" onClick={()=>{}}>Lưu</Button>
                </Box>
            </Grid>
        </Grid>
    )
}
const CoreValues = () =>{
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
                    Giá trị cốt lõi
                </Typography>
            </Grid>
            {
                [1,2,3,4,5,6].map((id)=>{
                    return(
                        <CoreValuesItem id={id}/>
                    )
                })
            }
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end'}}
                >
                    <Button variant="contained" onClick={()=>{}}>Lưu</Button>
                </Box>
            </Grid>
        </Grid>
    )
}
const CoreValuesItem = ({id}) =>{
    return (
        <>
        <Grid item xs={12}>
            <Typography variant="h5" >
                Giá trị cốt lõi số {id}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Tiêu đề"}
                    // name={"head_"+key}
                    // error={companyInfo?.[0]?.[key]?.invalid}
                    // helperText={companyInfo?.[0]?.[key]?.msg}
                    // onChange={(e)=>{setContent1EN(e.target.value)}}
                    // value={content1EN}
                    // defaultValue={companyInfo?.[0]?.[key]?.value}
                />
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Tiêu đề (EN)"}
                    // name={"head_"+key}
                    // error={companyInfo?.[0]?.[key]?.invalid}
                    // helperText={companyInfo?.[0]?.[key]?.msg}
                    // onChange={(e)=>{setContent2EN(e.target.value)}}
                    // value={content2EN}
                    // defaultValue={companyInfo?.[0]?.[key]?.value}
                />
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Nội dung"}
                    multiline
                    maxRows={4}
                    // name={"head_"+key}
                    // error={companyInfo?.[0]?.[key]?.invalid}
                    // helperText={companyInfo?.[0]?.[key]?.msg}
                    // onChange={(e)=>{setContent1EN(e.target.value)}}
                    // value={content1EN}
                    // defaultValue={companyInfo?.[0]?.[key]?.value}
                />
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Nội dung (EN)"}
                    multiline
                    maxRows={4}
                    // name={"head_"+key}
                    // error={companyInfo?.[0]?.[key]?.invalid}
                    // helperText={companyInfo?.[0]?.[key]?.msg}
                    // onChange={(e)=>{setContent2EN(e.target.value)}}
                    // value={content2EN}
                    // defaultValue={companyInfo?.[0]?.[key]?.value}
                />
            </FormControl>
        </Grid>
    </>
    )
}