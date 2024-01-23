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
    IconButton,
    FormHelperText,
    CardMedia,
    Card
 } from '@mui/material';
import { useState } from 'react';
import EditorComponent from 'src/sections/@dashboard/EditorComponent';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from 'src/components/iconify/Iconify';
import { addNewAchieve, deleteAchieve, getCertificate, getListSharedtable, updateSharedtable } from 'src/api';
import Swal from 'sweetalert2';



// ----------------------------------------------------------------------

export default function Function() {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <Functions/>
            <Divider/>
            <LicenseCertification/>
        </Box>
      </Container>
    </>
  );
}

const Functions = () =>{
    const [update, setUpdate] = useState(false)
    const [data,setData] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            const response = await getListSharedtable("14")
            let data = response.result
            setData(data)
        }
        fetchData();
        
    },[update])
    if(!data){
        return <></>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Chức năng hoạt động
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell align="center" >Số thứ tự</TableCell>
                        <TableCell align="center" >Tiêu đề</TableCell>
                        <TableCell align="center" >Tiêu đề(EN)</TableCell>
                        <TableCell align="center" >Nội dung</TableCell>
                        <TableCell align="center" >Nội dung EN</TableCell>
                        <TableCell align="center" >Ảnh</TableCell>
                        <TableCell align="center" >Hành động</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row, index) => {
                        return (
                        <FunctionItem index={index} key={"table-row"+index} row={row} update={update} setUpdate={setUpdate}/>
                        )}
                    )}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}
const FunctionItem = ({row,index,setUpdate,update}) =>{
    const [openModal, setOpenModal] = useState(false);
    return (
    <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
          <TableCell align="center" >
            {index+1}
          </TableCell>
          <TableCell align="center">
            {row.name}
          </TableCell>
          <TableCell align="center">
            {row.name_en}
          </TableCell>
          <TableCell align="center">
            {row.content}
          </TableCell>
          <TableCell align="center">
            {row.content_en}
          </TableCell>
          <TableCell align="center">
            <Box 
                sx={{
                    width:'300px',
                    // height:'100%',
                    borderRadius:'10px',
                    height:'300px',
                    backgroundImage: `url(${process.env.REACT_APP_HOST}/read_image/${row.image})`,
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition:'center'
                }}
            />
          </TableCell>
          <TableCell align="center">
            <Button variant="text" onClick={()=>{setOpenModal(true)}}>Chỉnh sửa</Button>
            
          </TableCell>
        </TableRow>
        <EditInfo openModal={openModal} setOpenModal={setOpenModal} row={row} index={index} update={update} setUpdate={setUpdate}/>
      </>
    )
}

const EditInfo = ({openModal, setOpenModal, row, index,setUpdate,update}) =>{
    const [name,setName] = useState(row.name)
    const [nameEN,setNameEN] = useState(row.name_en)
    const [content,setContent] = useState(row.content)
    const [contentEN,setContentEN] = useState(row.content_en)
    const [image, setImage] = useState(`${process.env.REACT_APP_HOST}/read_image/${row.image}`)
    const [imageFile, setImageFile] = useState('')
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 1,
        borderRadius: '4px',
        width: '60%'
      };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        setImageFile(file)
    };

    const handleUpdate = async (data) =>{
       if(name && nameEN){
            const dt = {...data}
            dt.content = content
            dt.content_en = contentEN
            dt.name = name
            dt.name_en = nameEN
            dt.image = imageFile
            const response = await updateSharedtable(dt)
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            if(response.result.status=='success'){
                setOpenModal(false)
                setUpdate(!update)
            }
       }
    }

    const handleCancel = () => {
        setOpenModal(false)
    }
    return(
        <Modal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style}}>
                <Box>
                    <Typography variant="h4" p={2} sx={{display:'inline-block'}}>Chỉnh sửa</Typography>
                    <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{p:4, maxHeight:"700px", overflowY:'auto'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Tiêu đề"}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    value={name}
                                    error={name?.length == 0}
                                    helperText={"Không được để trống"}
                                    
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Tiêu đề (EN)"}
                                    onChange={(e)=>{setNameEN(e.target.value)}}
                                    value={nameEN}

                                    error={nameEN?.length == 0}
                                    helperText={"Không được để trống"}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Nội dung</Typography>
                            <EditorComponent val={content} setVal={setContent}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Nội dung (EN)</Typography>
                            <EditorComponent val={contentEN} setVal={setContentEN}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{padding:"20px"}}
                            >
                                <input
                                    accept="image/*"
                                    id={"file-upload-edit-function"+index}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />

                                <label htmlFor={"file-upload-edit-function"+index} style={{textAlign:"center"}}>
                                    <Button variant="text" color="primary" component="span">
                                    {image ?  "Thay ảnh khác" : "Tải ảnh mới"}
                                    </Button>
                                </label>
                                <Typography textAlign={"center"} p={2} pt={4} sx={{width:"100%"}} color="error">Hãy tải lên ảnh có tỉ lệ 1:1 và size tối đa 500KB để có thể hiển thị tốt nhất</Typography>
                                
                            </Box>
                            <Box                                
                                sx={{display: 'flex', alignItems:'center', flexDirection:'column'}}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ width: 300, height: 300, textAlign: "center" }}
                                    image={`${image}`}
                                    alt={name}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Stack spacing={2} direction="row" justifyContent={"end"}>
                    <Button variant="contained" onClick={()=>{handleUpdate(row)}}>Lưu</Button>
                    <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Huỷ</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

const LicenseCertification= () =>{
    const [data,setData] = useState(null)
    const [update,setUpdate] = useState(false)
    const [openModal,setOpenModal] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            const certificateData = await getCertificate()
            if(certificateData.result){
                setData(certificateData.result)
            }
        }
        fetchData()
    },[update])
    const handleDelete = async (id)=>{
        Swal.fire({
            text: `Bạn có chắc muốn xoá không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteAchieve(id)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                if(response.result.status == 'success'){
                    setUpdate(!update)
                }
            }
          })
        
    }
    if(!data){
        return <></>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
                    Giấy phép - Chứng nhận
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ width: '100%' }}>
                    <Button 
                        variant="contained" 
                        sx={{float:'right', m:2}} 
                        onClick={()=>{
                            setOpenModal(true)
                        }} 
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Add new
                    </Button>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Tên</TableCell>
                                <TableCell align="center">Ảnh</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data?.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <Box sx={{width:'300px',height:'400px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 350,textAlign: "center" }}
                                            image={`${process.env.REACT_APP_HOST}/read_image/${row.image}`}
                                            alt={row.name}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="text" color="error" onClick={()=>{handleDelete(row.id_achieve)}}>Delete</Button>
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
                            <ModalAdd setOpenModal={setOpenModal} data={data} update={update} setUpdate={setUpdate}/>
                    </Modal>
                </Box>
            </Grid>
        </Grid>
    )
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
const ModalAdd = ({setOpenModal, data, update, setUpdate}) =>{
    const [name,setName] = useState('')
    const [nameEN,setNameEN] = useState('')
    const [image, setImage] = useState('')
    const [imageFile, setImageFile] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file))
    }
    const handleAddNew = async (name,name_en, content, content_en,  file)=>{
        if(name && image){
            const response = await addNewAchieve(name,name_en, content, content_en, file, 'certificate')
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                setOpenModal(false)
                handleCancel()
                setUpdate(!update)
        }
    }
    const handleCancel = () => {
        setName('')
        setNameEN('')
        setImage('')
        setImageFile('')
        document.getElementById("file-upload-new-cer").value = ''
        setOpenModal(false)
    }
    return(
        <Box sx={{ ...style}}>
            <Box>
                <Typography variant="h4" p={2} sx={{display:'inline-block'}}>{"Thêm chứng nhận/ giấy phép"}</Typography>
                <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{  maxHeight: 700, minHeight: 500, overflowY: "auto" }}>
            
                <Stack  mb={5}>
                    <Card sx={{ p: 2}}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="h6" gutterBottom>
                                    Tên
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                    <TextField
                                        required
                                        variant='standard'
                                        onChange={(e)=>{setName(e.target.value)}}
                                        error={name?.length == 0} 
                                        value={name}
                                        helperText = {name?.length == 0 ? "Name cannot be empty" : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="h6" gutterBottom>
                                    Tên(EN)
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                    <TextField
                                        required
                                        variant='standard'
                                        onChange={(e)=>{setNameEN(e.target.value)}}
                                        error={nameEN?.length == 0} 
                                        value={nameEN}
                                        helperText = {nameEN?.length == 0 ? "Name cannot be empty" : ""}
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
                            <h3>Ảnh</h3>
                            <Typography textAlign={"center"} p={2} pt={4} sx={{width:"100%"}} color="error">Hãy tải lên ảnh có tỉ lệ 1:1 hoặc 1:2 và size tối đa 1MB để có thể hiển thị tốt nhất</Typography>
                            <div>
                                <input
                                    accept="image/*"
                                    id={"file-upload-new-cer"}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />

                                <label htmlFor={"file-upload-new-cer"}>
                                    <Button variant="text" color="primary" component="span">
                                    {image ?  "Replace image" : "Upload image"}
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
                                    sx={{ width: 200, height: 200, textAlign: "center" }}
                                    image={`${image}`}
                                    alt={name}
                                />
                            </Box>
                        </Stack>

                        <Stack sx={{alignItems:"center"}}>
                            {
                                !image &&
                                <FormHelperText error>
                                    Please upload image.
                                </FormHelperText>
                            }
                        </Stack>

                        </Stack>
                    </Card>
                </Stack>
            
                <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={()=>{handleAddNew(name,nameEN," "," ",imageFile)}}>Save</Button>
                        <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Cancel</Button>
                    </Stack>
                </Stack>    
            </Box>
        </Box>
    )
}

