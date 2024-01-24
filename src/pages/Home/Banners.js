import { Helmet } from 'react-helmet-async';
import React from 'react'
import {  Container,Divider, Typography, Box,  CardMedia, Button, Paper, styled, Grid, FormControl, TextField, IconButton, Stack, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { addBanner, deleteBanner, getBanner, updateBanner } from 'src/api';
import Swal from 'sweetalert2';
import { dataURLtoFile, toDataURL } from 'src/functions';
import Iconify from 'src/components/iconify/Iconify';
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));


// ----------------------------------------------------------------------

export default function Banners() {
    const [banners,setBanners] = useState([])
    const [update,setUpdate] = useState(false)
    const [openModal,setOpenModal] = useState(false)

    useEffect(()=>{
        async function fetchData() {
            const banner = await getBanner()
            if(banner.result){
                setBanners(banner.result)
            }
        }
        fetchData();
        
    },[update])
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Banner
        </Typography>
        <Divider />
        <br/>
        <Box sx={{ minWidth: 800 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                {
                            banners.map((banner, index)=>{
                                return (
                                    <BannerItem key={'banner-'+banner.id_banner} banner={banner} index={index} setUpdate={setUpdate} update={update}/>
                                )
                            })
                        }
                </Grid>
            </Box>
        </Box>
        <ModalAddBanner setOpenModal={setOpenModal} update={update} openModal={openModal}  setUpdate={setUpdate}/>
      </Container>
    </>
  );
}

const BannerItem = ({banner,index, update,setUpdate}) =>{
    const [image, setImage] = useState(`${process.env.REACT_APP_HOST}/read_image/${banner.image?.replace(/%2f|%2F/g,'%252F')}`)
    const [imageFile, setImageFile] = useState()
    const [content1, setContent1] = useState(banner.content_1)
    const [content2, setContent2] = useState(banner.content_2)
    const [content1EN, setContent1EN] = useState(banner.content_1_en)
    const [content2EN, setContent2EN] = useState(banner.content_2_en)
    useEffect(()=>{
        if(banner.image){
            toDataURL(`${process.env.REACT_APP_HOST}/read_image/${banner.image?.replace(/%2f|%2F/g,'%252F')}`)
            .then(dataUrl => {
                var fileData = dataURLtoFile(dataUrl, `${Date.now()}.jpg`);
                setImageFile(fileData)
            })
        }
    },[])
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file))
        
    };
    const handleEditBanner = async (id,content1,content1EN,content2,content2EN,image) =>{
        const response = await updateBanner(id,content1,content1EN,content2,content2EN,image)
        Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            setUpdate(!update)
        }
    }
    return (
    <Grid item xs={12}>
        <Typography>Banner {index+1}</Typography>
        <Item 
            sx={{ 
                border: '1px dashed',
                padding: '15px',
                m:(theme)=>theme.spacing(1) 
            }} 
            key={banner.id_banner}
        >
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label={"Nội dung 1"}
                        onChange={(e)=>{setContent1(e.target.value)}}
                        value={content1}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label={"Nội dung 2"}
                        onChange={(e)=>{setContent2(e.target.value)}}
                        value={content2}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label={"Nội dung 1 (EN)"}
                        onChange={(e)=>{setContent1EN(e.target.value)}}
                        value={content1EN}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl required={true} fullWidth={true}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        label={"Nội dung 2 (EN)"}
                        onChange={(e)=>{setContent2EN(e.target.value)}}
                        value={content2EN}
                    />
                </FormControl>
            </Grid>

            <Typography textAlign={"center"} p={2} pt={4} sx={{width:"100%"}} color="error">Hãy tải lên ảnh banner có tỉ lệ 3:1 và size tối đa 3MB để có thể hiển thị tốt nhất</Typography>
                
            <Grid item xs={12} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative'}}>
                <CardMedia
                    component="img"
                    sx={{ width: '50%'}}
                    image={image}
                    alt={banner.id_banner}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-banner-"+banner.id_banner}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-banner-"+banner.id_banner}>
                        <Button variant="contained" color="primary" component="span">
                        Thay ảnh
                        </Button>
                    </label>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end'}}
                >
                    <Button variant="contained" onClick={()=>{handleEditBanner(banner.id_banner,content1,content1EN,content2,content2EN,imageFile)}}>Lưu</Button>
                </Box>
            </Grid>
            </Grid>
        </Item>
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
const ModalAddBanner = ({setOpenModal,openModal,update, setUpdate}) =>{
    const [imageFile, setImageFile] = useState('')
    const [image,setImage] = useState('')
    const [content1, setContent1] = useState('')
    const [content2, setContent2] = useState('')
    const [content1EN, setContent1EN] = useState('')
    const [content2EN, setContent2EN] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file))
        
    };
    const handleAddNew = async (content1,content1EN,content2,content2EN,image)=>{
        if(content1){
            const response = await addBanner(content1,content1EN,content2,content2EN,image)
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            if(response.result.status == 'success'){
                setUpdate(!update)
                handleCancel()
            }
        }
    }
    const handleCancel = () => {
        setImageFile([])
        setImage('')
        setContent1('')
        setContent2('')
        setContent1EN('')
        setContent2EN('')
        document.getElementById("file-upload-new-banner").value = ''
        setOpenModal(false)
    }
    return(
        <Modal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            aria-labelledby="modal-add-new-banner-title"
            aria-describedby="modal-add-new-banner-description"
        >
            <Box sx={{ ...style}}>
                <Box>
                    <Typography variant="h4" p={2} sx={{display:'inline-block'}}>Thêm banner mới</Typography>
                    <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{  maxHeight: 700, minHeight: 500, overflowY: "auto" }}>
                <Typography variant="h4" p={2} sx={{display:'inline-block'}}></Typography>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Nội dung 1"}
                                    error={content1.length == 0}
                                    helperText={"Nội dung 1 không được trống"}
                                    onChange={(e)=>{setContent1(e.target.value)}}
                                    value={content1}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Nội dung 2"}
                                    onChange={(e)=>{setContent2(e.target.value)}}
                                    value={content2}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Nội dung 1 (EN)"}
                                    onChange={(e)=>{setContent1EN(e.target.value)}}
                                    value={content1EN}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Nội dung 2 (EN)"}
                                    onChange={(e)=>{setContent2EN(e.target.value)}}
                                    value={content2EN}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative'}}>
                            {
                                image?.length > 0 &&
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%'}}
                                    image={image}
                                    alt={"thêm ảnh mới"}
                                />
                            }
                            <Box sx={{position:'absolute'}}>
                                <input
                                    accept="image/*"
                                    id={"file-upload-new-banner"}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />
                                
                                <label htmlFor={"file-upload-new-banner"}>
                                    <Button variant="contained" color="primary" component="span" sx={{marginTop:3}}>
                                        {image?.length == 0 ? "Thêm ảnh mới" : "Thay ảnh"}
                                    </Button>
                                </label>
                                
                            </Box>
                        </Grid>
                    </Grid>
                   
                </Box>
                <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="end">
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={()=>{handleAddNew(content1,content1EN,content2,content2EN,imageFile)}}>Save</Button>
                        <Button variant="text" style={{color:"gray"}} onClick={()=>{handleCancel()}}>Cancel</Button>
                    </Stack>
                </Stack> 
            </Box>
        </Modal>
    )
}