import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react'
import {  Container,Divider, Typography, Box, Button, Grid,Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Modal,
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
import { addNewAchieve, getAchieve, updateAchieve } from 'src/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



// ----------------------------------------------------------------------

export default function Achievements() {

    const [achieveData,setAchieveData] = useState([]) 
    const awardData = achieveData?.slice(3) || []
    const awardData2 = achieveData?.slice(0,3) || []
    useEffect(()=>{
        async function fetchData() {
            const archieveData = await getAchieve()
            if(archieveData.result){
                setAchieveData(archieveData.result)
            }
        }
        fetchData()
    },[])
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <Government awardData={awardData}/>
            <Divider/>
            <Others data={awardData2}/>
        </Box>
      </Container>
    </>
  );
}

const Others = ({data}) =>{
    return (
        <Grid container spacing={3}>
            {
                data.map((dt, index)=>{
                    return <OthersItem key={index+'-giaithuong'} id={dt.id_achieve} name={dt.name} content={dt.content} content_en={dt.content_en}/>
                })
            }            
        </Grid>
    )
}
const OthersItem = ({id,name,content, content_en}) =>{
    const [val, setVal] = useState(content)
    const [valEN, setValEN] = useState(content_en)

    const navigate = useNavigate();
    const handleUpdate = async (id,content,contentEN,name,image)=>{
        const response = await updateAchieve(id,content,contentEN,name,name,image)
        Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            navigate('/dashboard/gioithieu/thanhtuu', { replace: true });
        }
    }
    return (
        <>
            <Grid item xs={6}>
                <Typography variant="h5" sx={{paddingBottom:2}} fontWeight={700}>{name}</Typography>
                <EditorComponent val={val} setVal={setVal}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" sx={{paddingBottom:2}} fontWeight={700}>{name +' (EN)'}</Typography>
                <EditorComponent val={valEN} setVal={setValEN}/>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', mb: 5, mt: 5}}
                >
                    <Button variant="contained" onClick={()=>{handleUpdate(id,val,valEN,name,[])}}>Lưu</Button>
                </Box>
            </Grid>
        </>
    )
}


const Government= ({awardData}) =>{
    const data= awardData
    const [update,setUpdate] = useState(false)
    const [openModal,setOpenModal] = useState(false)
    const [add, setAdd] = useState(true)
    const [id, setId] = useState('')
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 1}}>
                    Khen thưởng cấp nhà nước
                </Typography>
            </Grid>
            <Grid item xs={12}>
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
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ maxHeight: 600, overflowY: 'auto' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Tên</TableCell>
                          <TableCell align="center">Tên(EN)</TableCell>
                          <TableCell align="center">Nội dung</TableCell>
                          <TableCell align="center">Ảnh</TableCell>
                          <TableCell align="center">Hành động</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" align="center">
                              {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                              {row.name_en}
                            </TableCell>
                            <TableCell component="th" scope="row" align="center">
                              {row.content}
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 350, textAlign: 'center' }}
                                  image={`${process.env.REACT_APP_HOST}/read_image/${row.image}`}
                                  alt={row.name}
                                />
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="text"
                                onClick={() => {
                                  setOpenModal(true);
                                  setAdd(false);
                                  setId(row.id_achieve);
                                }}
                              >
                                Update
                              </Button>
                              <Button variant="text" color="error">
                                Delete
                              </Button>
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
                            <ModalAdd add={add} setOpenModal={setOpenModal} data={data} id={id} update={update} setUpdate={setUpdate}/>
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
const ModalAdd = ({add, setOpenModal, data, id ='',update, setUpdate}) =>{
    if(id){
        data = data.filter((dt)=> dt.id_achieve == id)
    }
    const [name,setName] = useState(add ? '' : data[0].name)
    const [nameEN,setNameEN] = useState(add ? '' : data[0].name_en)
    const [content,setContent] = useState(add ? '' : data[0].content)
    const [contentEN,setContentEN] = useState(add ? '' : data[0].content_en)
    const [image, setImage] = useState(add ? '' : `http://localhost:3001/read_image/${data[0].image}`)
    const [imageFile, setImageFile] = useState('')
    useEffect(()=>{
        if(data?.length > 0){
            toDataURL(`http://localhost:3001/read_image/${data[0].image}`)
            .then(dataUrl => {
                var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                setImageFile(fileData)
            })
        }
    },[id])
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file))
    }
    const handleAddNew = async (achieve_id, name,name_en, content, content_en,  file)=>{
        if(name && image){
            if(add){
                const response = await addNewAchieve(name,name_en, content, content_en, file)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                setOpenModal(false)
                handleCancel(add,id, data)
            }else{
                const response = await updateAchieve(achieve_id,content, content_en,name,name_en,  file)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                setOpenModal(false)
                handleCancel(add,id, data)
            }
        }
    }
    const handleCancel = (add,id, data) => {
        if(add){
            setName('')
            setNameEN('')
            setContent('')
            setContentEN('')

            setImage('')
            setImageFile('')
            document.getElementById("file-upload-new-achieve"+id).value = ''
        }else{
            setName(data[0].name)
            setNameEN(data[0].name_en)
            setContent(data[0].content)
            setContentEN(data[0].content_en)
            setImage(`http://localhost:3001/read_image/${data[0].image}`)
            toDataURL(`http://localhost:3001/read_image/${data[0].image}`)
            .then(dataUrl => {
                var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                setImageFile(fileData)
            })
            document.getElementById("file-upload-new-achieve"+id).value = ''
        }
        setOpenModal(false)
    }
    return(
        <Box sx={{ ...style}}>
            <Box>
                <Typography variant="h4" p={2} sx={{display:'inline-block'}}>{add ? 'Thêm thành tựu' : 'Chỉnh sửa thành tựu'}</Typography>
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
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="h6" gutterBottom>
                                    Nội dung
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                    <TextField
                                        required
                                        variant='standard'
                                        onChange={(e)=>{setContent(e.target.value)}}
                                        // error={content?.length == 0} 
                                        value={content}
                                        // helperText = {content?.length == 0 ? "content cannot be empty" : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Typography variant="h6" gutterBottom>
                                    Nội dung(EN)
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                    <TextField
                                        required
                                        variant='standard'
                                        onChange={(e)=>{setContentEN(e.target.value)}}
                                        value={contentEN}
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
                            <div>
                                <input
                                    accept="image/*"
                                    id={"file-upload-new-achieve"+id}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />

                                <label htmlFor={"file-upload-new-achieve"+id}>
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
                        <Button variant="contained" onClick={()=>{handleAddNew(id,name,nameEN,content,contentEN,imageFile)}}>Save</Button>
                        <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel(add, id,data)}}>Cancel</Button>
                    </Stack>
                </Stack>    
            </Box>
        </Box>
    )
}


const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))



function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
return new File([u8arr], filename, {type:mime});
}
