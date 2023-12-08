import { Helmet } from 'react-helmet-async';
import React from 'react'
import {  Container,Divider, Typography, Box,  Modal, Button, Paper, styled, Grid, FormControl, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBanner } from 'src/api';
import Iconify from 'src/components/iconify/Iconify';



// ----------------------------------------------------------------------

export default function FAQ() {
    const [openModal,setOpenModal] = useState(false)
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
            <Typography variant="h4" sx={{ mb: 5 }}>
            Câu hỏi thường gặp
            </Typography>
            <Button 
                variant="contained" 
                sx={{float:'right', m:2}} 
                onClick={()=>{
                    setOpenModal(true)
                    // setAdd(true)
                }} 
                startIcon={<Iconify icon="eva:plus-fill" />}
            >
                Thêm câu hỏi
            </Button>
        <Divider />
        <Box sx={{ minWidth: 800 }}>
            <Questions/>
        </Box>
      </Container>
      {/* <Modal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
                <ModalAdd add={add} setOpenModal={setOpenModal} customers={customers} id={id} update={update} setUpdate={setUpdate}/>
        </Modal> */}
    </>
  );
}

const Questions = () =>{
    return (
        <Grid container spacing={2}>
            {
                [1,2,3,4,5,6].map((id)=>{
                    return(
                        <QuestionItem id={id}/>
                    )
                })
            }
            
        </Grid>
    )
}
const QuestionItem = ({id}) =>{
    return (
        <>
        <Grid item xs={12}>
            <Typography variant="h5" sx={{marginTop: "16px"}}>
                Câu hỏi số {id}
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Câu hỏi nổi bật" />
            </FormGroup>
        </Grid>
        <Grid item xs={6}>
            <FormControl required={true} fullWidth={true}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    label={"Câu hỏi"}
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
                    label={"Câu hỏi (EN)"}
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
                    label={"Câu trả lời"}
                    multiline
                    rows={4}
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
                    label={"Câu trả lời (EN)"}
                    multiline
                    rows={4}
                    // name={"head_"+key}
                    // error={companyInfo?.[0]?.[key]?.invalid}
                    // helperText={companyInfo?.[0]?.[key]?.msg}
                    // onChange={(e)=>{setContent2EN(e.target.value)}}
                    // value={content2EN}
                    // defaultValue={companyInfo?.[0]?.[key]?.value}
                />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Box
                sx={{display: 'flex', justifyContent:'flex-end', marginBottom: '16px'}}
            >
                <Button variant="contained" color="error" onClick={()=>{}} sx={{marginRight: '10px'}}>Xoá</Button>
                <Button variant="contained" onClick={()=>{}}>Sửa</Button>
            </Box>
            <Divider/>
        </Grid>
    </>
    )
}