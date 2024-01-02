import React from 'react'
import {  Container, Divider, Card, Typography, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button, Stack, Paper, styled, Modal, IconButton, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { addNewCustomer, deleteCustomer, getCustomer, updateCustomer } from 'src/api';
import Iconify from 'src/components/iconify/Iconify';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from 'react-helmet-async';
import { dataURLtoFile, toDataURL } from 'src/functions';



// ----------------------------------------------------------------------

export default function Customer() {
    const [customers,setCustomers] = useState([])
    const [update,setUpdate] = useState(false)
    const [openModal,setOpenModal] = useState(false)
    const [add, setAdd] = useState(true)
    const [id, setId] = useState('')
    useEffect(()=>{
        async function fetchData() {
            const customer = await getCustomer()
            if(customer.data){
                const cus = customer.data
                setCustomers(cus.reverse())
            }
        }
        fetchData();
        
    },[update])
    function handleDelete(row, update, setUpdate){
        Swal.fire({
            text: `Are you sure you want to delete customer ${row.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
            const response = await deleteCustomer(row.id_customer)
            if(response.result.status == 'success'){
                setOpenModal(false)
                setUpdate(!update)
            }
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            }
        })
          
    }
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Đối tác - Khách hàng
        </Typography>
        <Divider />
        <br/>
        <Box sx={{ minWidth: 800 }}>
        <Box sx={{ width: '100%' }}>
                <Button 
                    variant="contained" 
                    sx={{float:'right', m:2}} 
                    onClick={()=>{
                        setOpenModal(true)
                        setAdd(true)
                    }} 
                    startIcon={<Iconify icon="eva:plus-fill" />}
                >
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
                                        image={`${process.env.REACT_APP_HOST}/read_image/${row.logo}`}
                                        alt={row.name}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="text" color="error" onClick={()=>{handleDelete(row, update, setUpdate)}}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Modal
                    open={openModal}
                    onClose={()=>{setOpenModal(false)}}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                        <ModalAdd setOpenModal={setOpenModal} update={update} setUpdate={setUpdate}/>
                </Modal>
            </Box>
        </Box>
      </Container>
    </>
  );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 2,
    pt:0,
    borderRadius: '4px',
    width: '90%'
  }
const ModalAdd = ({setOpenModal,update, setUpdate}) =>{
    const [name,setName] = useState('')
    
    const [image, setImage] = useState('')
    const [imageFile, setImageFile] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        setImageFile(file)
    };
    const handleAddNew = async (name, update, imageFile)=>{
        if(name && image){
            const response = await addNewCustomer(name, imageFile)
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            setOpenModal(false)
            setUpdate(!update)
            handleCancel()
        }
    }
    const handleCancel = () => {
        setName('')
        setImage('')
        document.getElementById("file-upload-new-customer").value = ''
        setOpenModal(false)
    }
    return(
        <Box sx={{ ...style}}>
            <Box>
                <Typography variant="h4" p={2} sx={{display:'inline-block'}}>Thêm khách hàng</Typography>
                <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{  maxHeight: 700, minHeight: 500, overflowY: "auto" }}>
            
                <Stack  mb={5}>
                    <Card sx={{ p: 2}}>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={12}>
                                <Typography variant="h6" gutterBottom>
                                    Tên khách hàng
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                <TextField
                                    required
                                    variant='standard'
                                    onChange={(e)=>{setName(e.target.value)}}
                                    error={name?.length == 0} 
                                    value={name}
                                    helperText = {name?.length == 0 ? "Tên không được để trống" : ""}
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
                            <h3>Ảnh logo</h3>
                            <Typography textAlign={"center"} p={2} pt={4} sx={{width:"100%"}} color="error">Hãy tải lên ảnh có kích cỡ tương đồng nhau và size tối đa 500KB để có thể hiển thị tốt nhất</Typography>
                            <div>
                                <input
                                    accept="image/*"
                                    id={"file-upload-new-customer"}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />

                                <label htmlFor={"file-upload-new-customer"}>
                                    <Button variant="text" color="primary" component="span">
                                    {image ?  "Thay ảnh khác" : "Tải ảnh mới"}
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
                                    sx={{ width: 600, height: 200, textAlign: "center" }}
                                    image={`${image}`}
                                    alt={name}
                                />
                            </Box>
                        </Stack>

                        <Stack sx={{alignItems:"center"}}>
                            {
                                !image &&
                                <FormHelperText error>
                                    Ảnh không được để trống
                                </FormHelperText>
                            }
                        </Stack>

                        </Stack>
                    </Card>
                </Stack>
            
                <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={()=>{handleAddNew(name, update, imageFile)}}>Lưu</Button>
                        <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Huỷ</Button>
                    </Stack>
                </Stack>    
            </Box>
        </Box>
    )
}
