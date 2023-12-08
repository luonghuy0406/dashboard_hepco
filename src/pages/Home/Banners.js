import { Helmet } from 'react-helmet-async';
import React from 'react'
import {  Container,Divider, Typography, Box,  CardMedia, Button, Paper, styled, Grid, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBanner } from 'src/api';
import UploadFile from 'src/sections/@dashboard/app/UploadFile';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));


// ----------------------------------------------------------------------

export default function Banners() {
    const [banners,setBanners] = useState([])
    const [update,setUpdate] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            const banner = await getBanner()
            if(banner.results){
                setBanners(banner.results)
            }
        }
        fetchData();
        
    },[update])

  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Banner
        </Typography>
        <Divider />
        <br/>
        <Box sx={{ minWidth: 800 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                {
                            banners.map((banner)=>{
                                return (
                                    <BannerItem banner={banner}/>
                                )
                            })
                        }
                </Grid>
                </Box>
            </Box>
      </Container>
    </>
  );
}

const BannerItem = ({banner}) =>{

    const [image, setImage] = useState(banner.link)
    const [content1, setContent1] = useState('')
    const [content2, setContent2] = useState('')
    const [content1EN, setContent1EN] = useState('')
    const [content2EN, setContent2EN] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };
    const handleEditBanner = async (id,content1,content1EN,content2,content2EN) =>{
        if(content1 && content2){
            const image = document.getElementById("file-upload-banner-"+id).files[0] || []
            console.log(id,content1,content1EN,content2,content2EN, image)
            // const response = await updatePost(id,name,nameEN,content,contentEN, image)
            // Swal.fire(
            //     response.results.status,
            //     response.results.msg,
            //     response.results.status
            // )
            // if(response.results.status == 'success'){
            //     navigate('/dashboard/tintuc', { replace: true });
            // }
        }
    }
    return (
    <Grid item xs={12}>
        <Typography>Banner {banner.id_bn}</Typography>
        <Item 
            sx={{ 
                border: '1px dashed',
                padding: '15px',
                m:(theme)=>theme.spacing(1) 
            }} 
            key={banner.id_bn}
        >
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Nội dung 1"}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        onChange={(e)=>{setContent1(e.target.value)}}
                        value={content1}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Nội dung 2"}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        onChange={(e)=>{setContent2(e.target.value)}}
                        value={content2}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Nội dung 1 (EN)"}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        onChange={(e)=>{setContent1EN(e.target.value)}}
                        value={content1EN}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        label={"Nội dung 2 (EN)"}
                        // name={"head_"+key}
                        // error={companyInfo?.[0]?.[key]?.invalid}
                        // helperText={companyInfo?.[0]?.[key]?.msg}
                        onChange={(e)=>{setContent2EN(e.target.value)}}
                        value={content2EN}
                        // defaultValue={companyInfo?.[0]?.[key]?.value}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative'}}>
                <CardMedia
                    component="img"
                    sx={{ width: '50%'}}
                    image={`https://web-hepco-7ttu.vercel.app/assets/images/banner2.jpeg`}
                    alt={banner.id_bn}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-banner-"+banner.id_bn}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-banner-"+banner.id_bn}>
                        <Button variant="contained" color="primary" component="span">
                        {image ?  "Replace image" : "Upload image"}
                        </Button>
                    </label>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end'}}
                >
                    <Button variant="contained" onClick={()=>{handleEditBanner(banner.id_bn,content1,content2,content1EN,content2EN)}}>Lưu</Button>
                </Box>
            </Grid>
            </Grid>
        </Item>
    </Grid>
    )
}