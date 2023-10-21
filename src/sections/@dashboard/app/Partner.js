import React from 'react'
import {  Typography, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button, Collapse, Stack, Paper, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import UploadFile from './UploadFile';
import { getCustomer } from 'src/api';
import Iconify from 'src/components/iconify/Iconify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));
export default function Customer() {
    const [customers,setCustomers] = useState([])
    const [update,setUpdate] = useState(false)
    const [open,setOpen] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            const customer = await getCustomer()
            if(customer.results){
                setCustomers(customer.results)
            }
        }
        fetchData();
        
    },[update])
  return (
    <>
        <Stack direction="row" spacing={2} mb={3}>
            
            <Typography variant="h4">Customer</Typography>
            <Button variant="text" onClick={()=>{setOpen(!open)}}>{open ? 'Hide':'Show'}</Button>
        </Stack>
        <Box sx={{ minWidth: 800 }}>
            
            <Collapse in={open}>
            
            <Box sx={{ width: '100%' }}>
                <Button variant="contained" sx={{float:'right', m:2}} startIcon={<Iconify icon="eva:plus-fill" />}>
                    Add new
                </Button>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {customers.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 350,textAlign: "center" }}
                                        image={`${process.env.REACT_APP_API_HOST}/read_image/${row.image}`}
                                        alt={row.name}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" onClick={()=>{}}>Update</Button>
                                <Button variant="text" color="error" onClick={()=>{}}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Box>
            </Collapse>
        </Box>
    </>
    
  )
}
