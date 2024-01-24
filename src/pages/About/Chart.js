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
import { addNewAchieve, deleteAchieve, deleteImageSharetable, getCertificate, getListSharedtable, updateSharedtable } from 'src/api';
import Swal from 'sweetalert2';



// ----------------------------------------------------------------------

export default function Chart() {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <ChartContent/>
        </Box>
      </Container>
    </>
  );
}

const ChartContent = () =>{
    const [update, setUpdate] = useState(false)
    const [data,setData] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            const response = await getListSharedtable("23")
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
                    Sơ đồ tổ chức
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Table >
                    <TableHead>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell align="center" >Số thứ tự</TableCell>
                        <TableCell align="center" >Tiêu đề</TableCell>
                        <TableCell align="center" >Tiêu đề(EN)</TableCell>
                        <TableCell align="center" sx={{maxWidth:'100px'}}>Nội dung</TableCell>
                        <TableCell align="center" sx={{maxWidth:'100px'}}>Nội dung EN</TableCell>
                        <TableCell align="center" >Ảnh bên ngoài</TableCell>
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
          <TableCell sx={{maxWidth:'400px'}}>
            {row.content}
          </TableCell>
          <TableCell sx={{maxWidth:'400px'}}>
            {row.content_en}
          </TableCell>
          <TableCell align="center">
            <Box 
                sx={{
                    width:'100px',
                    // height:'100%',
                    borderRadius:'100px',
                    height:'100px',
                    backgroundImage: `url(${process.env.REACT_APP_HOST}/read_image/${row.image?.replace(/%2f|%2F/g,'%252F')})`,
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
    const [image, setImage] = useState(`${process.env.REACT_APP_HOST}/read_image/${row.image?.replace(/%2f|%2F/g,'%252F')}`)
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
    }
    const handleImageDelete = async (id)=>{
        Swal.fire({
            text: `Bạn có chắc chắn muốn xoá không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteImageSharetable(id)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                if(response.result.status == 'success'){
                    setUpdate(!update)
                    setImage('')
                    setImageFile('')
                }
            }
          })
        
    }

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
                                    helperText={"Không được để trống, gõ <br/> nếu muốn ngắt dòng"}
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
                                    helperText={"Không được để trống, gõ <br/> nếu muốn ngắt dòng"}
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
                                {image &&
                                
                                    <Button variant="text" color="error" component="span" onClick={(e)=>{handleImageDelete(row.id_sharedtable)}}>
                                        Xoá ảnh
                                    </Button>
                                }
                                <Typography textAlign={"center"} p={2} pt={4} sx={{width:"100%"}} color="error">Hãy tải lên ảnh có tỉ lệ 1:1 và size tối đa 200KB để có thể hiển thị tốt nhất</Typography>
                                
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

