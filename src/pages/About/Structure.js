import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react'
import {  Container,Divider, Typography, Box, Button, Grid,Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Modal,
    Backdrop,
    TextField,
    FormControl,
    Stack,
    IconButton
 } from '@mui/material';
import { useState } from 'react';
import EditorComponent from 'src/sections/@dashboard/EditorComponent';
import CloseIcon from '@mui/icons-material/Close';
import { addHistory, deleteHistory, getListHistory, getSharedtable, updateHistory, updateSharedtable } from 'src/api';
import Swal from 'sweetalert2';
import Iconify from 'src/components/iconify/Iconify';



// ----------------------------------------------------------------------

export default function Structure() {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <StructureDetail/>
        </Box>
      </Container>
    </>
  );
}

const StructureDetail = () =>{
    const [content,setContent] = useState('')
    const [contentEN,setContentEN] = useState('')
    const [data,setData] = useState(null)
    
    useEffect(()=>{
        async function fetchData() {
            const response = await getSharedtable('42')
            let dt = response.result
            setData(dt)
        }
        fetchData();
        
    },[])
    useEffect(()=>{
        if(data){
            setContent(data.content)
            setContentEN(data.content_en)
        }
        
    },[data])
    const handleUpdate = async (data) =>{
        const dt = {...data}
        dt.content = content
        dt.content_en = contentEN
       const response = await updateSharedtable(dt)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
    }
    if(!data)
    {
        return <></>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Giới thiệu bộ máy
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={700}>Tiếng Việt</Typography>
                <EditorComponent val={content} setVal={setContent}/>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={700}>Tiếng Anh</Typography>
                <EditorComponent val={contentEN} setVal={setContentEN}/>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', mb: 5, mt: 5}}
                >
                    <Button variant="contained" onClick={()=>{handleUpdate(data)}}>Lưu</Button>
                </Box>
            </Grid>
        </Grid>
    )
}