import { Helmet } from 'react-helmet-async';
import React from 'react'
import {  Container,Divider, Typography, Box,  CardMedia, Button, Paper, styled, Grid, FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBanner, getListSharedtable, getVideoLink, updateSharedtable, updateWebinf } from 'src/api';
import Swal from 'sweetalert2';



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
    const [data,setData] = useState(null)
    const [img, setImg] = useState('')
    const [videoLink, setVideoLink] = useState('')
    useEffect(()=>{
        async function fetchData() {
            const response = await getListSharedtable("12")
            let data = response.result
            setData(data)
        }
        fetchData();
        async function fetchData2() {
            const response = await getVideoLink()
            let data = response.result
            setVideoLink(data)
        }
        fetchData2();
        
    },[])
    const handleOnChange = (key,value,index)=>{
        if(key== 'image'){
            const file = value;
            setImg(URL.createObjectURL(file))
        }
        const vis = [...data]
        vis[index][key] = value
        setData(vis)
    }
    const handleUpdate = async (vis) =>{
       const response = await updateSharedtable(vis)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
    }

    const saveVideoLink = async () =>{
        const response = await updateWebinf(videoLink)
        Swal.fire(
             response.result.status,
             response.result.msg,
             response.result.status
         )
     }
    
    if(!data){
        return <></>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Tầm nhìn - Sứ mệnh 
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{paddingBottom:"10px"}}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        required
                        multiline
                        maxRows={4}
                        label={"Video link"}
                        value={videoLink.data}
                        onChange={(e)=>{
                            const data = {...videoLink}
                            data.data = e.target.value
                            data.data_en = e.target.value
                            setVideoLink(data)
                        }}
                        onBlur={()=>{saveVideoLink()}}
                    />
                </FormControl>
            </Grid>
            {
                data.map((dt,index)=>{
                    return(
                        <Grid item xs={12} spacing={2} container key={'vision-mission'+index}>
                            <Typography variant="h6" fontWeight={700}>{dt.name}</Typography>
                            <Grid item xs={12} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative', flexDirection:'column'}}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '200px', height:'400px'}}
                                    image={typeof dt.image =='string' ? `${process.env.REACT_APP_HOST}/read_image/${dt.image?.replace(/%2f|%2F/g,'%252F')}` : img}
                                    alt={dt.name}
                                />
                                <Box sx={{position:'absolute'}}>
                                    <input
                                        accept="image/*"
                                        id={"file-upload-vision-"+index}
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e)=>{handleOnChange('image',e.target.files[0],index)}}
                                    />

                                    <label htmlFor={"file-upload-vision-"+index}>
                                        <Button variant="contained" color="primary" component="span">
                                        {"Replace image"}
                                        </Button>
                                    </label>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl required={true} fullWidth={true}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        multiline
                                        maxRows={4}
                                        label={dt.name}
                                        value={dt.content}
                                        onChange={(e)=>{handleOnChange('content',e.target.value,index)}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl required={true} fullWidth={true}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        
                                        label={dt.name_en}
                                        value={dt.content_en}
                                        multiline
                                        maxRows={4}

                                        onChange={(e)=>{handleOnChange('content_en',e.target.value,index)}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{display: 'flex', justifyContent:'flex-end'}}
                                >
                                    <Button variant="contained" onClick={()=>{handleUpdate(dt)}}>Lưu</Button>
                                </Box>
                            </Grid>
                            <hr/>
                        </Grid>    
                    )
                })
            }
        </Grid>
    )
}
const CoreValues = () =>{
    const [data,setData] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            const response = await getListSharedtable("13")
            let data = response.result
            setData(data)
        }
        fetchData();
        
    },[])
    if(!data){
        return <></>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
                    Giá trị cốt lõi
                </Typography>
            </Grid>
            {
                data.map((dt,id)=>{
                    return(
                        <CoreValuesItem index={id} dt={dt} data={data} setData={setData}/>
                    )
                })
            }
        </Grid>
    )
}
const CoreValuesItem = ({index,dt,data,setData}) =>{

    const handleOnChange = (key,value,index)=>{
        const vis = [...data]
        vis[index][key] = value
        setData(vis)
    }
    const handleUpdate = async (vis) =>{
       const response = await updateSharedtable(vis)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
    }
    return (
        <>
        <Grid item xs={12}>
            <Typography variant="h5" >
                Giá trị cốt lõi số {index+1}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Tên giá trị cốt lõi"}
                    value={dt.name}
                    onChange={(e)=>{handleOnChange('name',e.target.value,index)}}
                />
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Tên giá trị cốt lõi (EN)"}
                    value={dt.name_en}
                    onChange={(e)=>{handleOnChange('name_en',e.target.value,index)}}
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
                    value={dt.content}
                    onChange={(e)=>{handleOnChange('content',e.target.value,index)}}
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
                    value={dt.content_en}
                    onChange={(e)=>{handleOnChange('content_en',e.target.value,index)}}
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Box
                sx={{display: 'flex', justifyContent:'flex-end'}}
            >
                <Button variant="contained" onClick={()=>{handleUpdate(dt)}}>Lưu</Button>
            </Box>
        </Grid>
    </>
    )
}