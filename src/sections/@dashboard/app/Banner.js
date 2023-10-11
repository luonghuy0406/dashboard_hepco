import React from 'react'

import { Grid, Container, Typography, Card, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button, Collapse, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFile from './UploadFile';
import axios from 'axios';
import { getBanner } from 'src/api';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function Banner() {
    const [banners,setBanners] = useState([])
    const [update,setUpdate] = useState(false)
    const [open,setOpen] = useState(false)
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
        <Stack direction="row" spacing={2} mb={3}>
            
            <Typography variant="h4">Banner</Typography>
            <Button variant="text" onClick={()=>{setOpen(!open)}}>{open ? 'Show':'Hide'}</Button>
        </Stack>
        <Box sx={{ minWidth: 800 }}>
            
            <Collapse in={open}>
            
                <Table>
                    <TableHead>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell align="center">Id</TableCell>
                        <TableCell  align="center">Banner</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {banners.map((banner) => (
                        <TableRow key={banner.id_bn} sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell align="center">
                            {banner.id_bn}
                        </TableCell>
                        <TableCell align="center">
                            <CardMedia
                                component="img"
                                sx={{ width: 300,textAlign: "center" }}
                                image={`${process.env.REACT_APP_API_HOST}/read_image/${banner.link}`}
                                alt={banner.id_bn}
                            />
                        </TableCell>
                        <TableCell align="center">
                        <Button id={banner.id_bn} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            <UploadFile id={banner.id_bn} update={update} setUpdate={setUpdate}/>
                        </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Collapse>
        </Box>
    </>
    
  )
}
