import React from 'react'
import {  Typography, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button, Collapse, Stack, Paper, styled, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAboutUs } from 'src/api';
import EditorComponent from './EditorComponent';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));

export default function AboutUs() {
    const [aboutUs,setAboutUs] = useState([])
    const [update,setUpdate] = useState(false)
    const [open,setOpen] = useState(false)
    const [image,setImage] = useState({
        image1 : `${process.env.REACT_APP_API_HOST}/read_image/${aboutUs.image1}`,
        image2 : `${process.env.REACT_APP_API_HOST}/read_image/${aboutUs.image2}`,
        image3 : `${process.env.REACT_APP_API_HOST}/read_image/${aboutUs.image3}`
    })
    const [contentEn,setContentEn] = useState(aboutUs.content_en)
    const [content,setContent] = useState(aboutUs.content)
    useEffect(()=>{
        async function fetchData() {
            const aboutUs = await getAboutUs()
            if(aboutUs.results){
                setAboutUs(aboutUs.results[0])
            }
        }
        fetchData();
        
    },[update])
    useEffect(()=>{
        setImage({
            image1 : `${process.env.REACT_APP_API_HOST}/read_image/${aboutUs.image1}`,
            image2 : `${process.env.REACT_APP_API_HOST}/read_image/${aboutUs.image2}`,
            image3 : `${process.env.REACT_APP_API_HOST}/read_image/${aboutUs.image3}`
        })
        setContentEn(aboutUs.content_en)
        setContent(aboutUs.content)
  
    },[aboutUs])
    const handleImageUpload = (event,id) => {
        const file = event.target.files[0];
        setImage({...image,[id]:URL.createObjectURL(file)})
        
      };
    const listImage=['image1','image2','image3']
  return (
    <>
        <Stack direction="row" spacing={2} mb={3}>
            
            <Typography fontWeight={'bold'} variant="h4">About us</Typography>
            <Button variant="text" onClick={()=>{setOpen(!open)}}>{open ? 'Hide':'Show'}</Button>
        </Stack>
        <Box sx={{ minWidth: 800 }}>
            
            <Collapse in={open}>
            
            <Box sx={{ width: '100%' }}>
                <Stack 
                    direction="row" 
                    useFlexGap 
                    flexWrap="wrap" 
                >
                    {
                        listImage.map((id)=>{
                            return (
                                <Item 
                                sx={{ 
                                    width: '30%',
                                    border: '1px dashed',
                                    padding: '15px',
                                    mr:(theme)=>theme.spacing(2) 
                                }} 
                                key={id}
                                >
                                    <Box
                                        sx={{display: 'flex', alignItems:'center', flexDirection:'column'}}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="baseline"
                                            spacing={2}
                                            sx={{width:'100%'}}
                                        >
                                            <Typography fontWeight={'bold'} pb={1}>{id}</Typography>
                                            <div>
                                                <input
                                                    accept="image/*"
                                                    id={"file-upload-"+id}
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={(e)=>{handleImageUpload(e,id)}}
                                                />

                                                <label htmlFor={"file-upload-"+id}>
                                                    <Button variant="text" color="primary" component="span">
                                                        Replace image
                                                    </Button>
                                                </label>
                                            </div>
                                        </Stack>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, height: 200, textAlign: "center" }}
                                            image={`${image[id]}`}
                                            alt="about 1"
                                        />
                                    </Box>
                                </Item>
                            )
                        })
                    }
                    <Item sx={{ width: '100%', mt:(theme)=>theme.spacing(2), mr:(theme)=>theme.spacing(2)}}>
                        <Box
                            sx={{display: 'flex', alignItems:'flex-start', flexDirection:'column'}}
                        >
                            <Typography fontWeight={'bold'} pb={1}>Content EN</Typography>
                            <EditorComponent data={contentEn} setContentEn={setContentEn}/>
                        </Box>
                    </Item>
                    <Item sx={{ width: '100%', mt:(theme)=>theme.spacing(2), mr:(theme)=>theme.spacing(2)}}>
                        <Box
                            sx={{display: 'flex', alignItems:'flex-start', flexDirection:'column'}}
                        >
                            <Typography fontWeight={'bold'} pb={1}>Content VI</Typography>
                            <EditorComponent data={content} setContent={setContent}/>
                        </Box>
                    </Item>
                    <Item>
                        <Box
                            sx={{display: 'flex', justifyContent:'flex-end'}}
                        >
                            <Button variant="contained">Update</Button>
                        </Box>
                    </Item>
                </Stack>
                
            </Box>
            </Collapse>
        </Box>
    </>
    
  )
}
