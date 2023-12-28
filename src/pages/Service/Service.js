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
    CardMedia
 } from '@mui/material';
import { useState } from 'react';
import EditorComponent from 'src/sections/@dashboard/EditorComponent';
import CloseIcon from '@mui/icons-material/Close';
import { getDetailService, getListSharedtable, updateService, updateSharedtable } from 'src/api';
import { dataURLtoFile, toDataURL } from 'src/functions';
import Swal from 'sweetalert2';



// ----------------------------------------------------------------------

export default function Service({id}) {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <ServiceItem id={id}/>
        </Box>
      </Container>
    </>
  );
}

const ServiceItem = ({id}) =>{
    const [content,setContent] = useState('')
    const [contentEN,setContentEN] = useState('')
    const [data,setData] = useState([])
    const [image,setImage] = useState()
    const [imageFile,setImageFile] = useState()
    const [update, setUpdate] = useState(false)
    const [dataItem,setDataItem] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const service = await getDetailService(id)
            if(service.result){
                const data = service.result
                setData(data)
                setContent(data.content)
                setContentEN(data.content_en)
                setImage(`http://localhost:3001/read_image/${data.image}`)
                toDataURL(`http://localhost:3001/read_image/${data.image}`)
                .then(dataUrl => {
                    var fileData = dataURLtoFile(dataUrl, `${Date.now()}.jpg`);
                    setImageFile(fileData)
                })
            }
        }
        fetchData()
    },[id])
    useEffect(()=>{
        
        const idList = {
            "ser_01" : "16",
            "ser_02" : "17",
            "ser_03" : "18",
            "ser_04" : "19",
            "ser_05" : "20",
            "ser_06" : "21",
        }
        async function fetchData2() {
            const response = await getListSharedtable(idList[id])
            let data = response.result
            setDataItem(data)
        }
        if(id != "ser_05"){
            fetchData2();
        }else{
            setDataItem(null)
        }
    },[id,update])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file))
        
    };

    const handleEdit = async (id,content,contentEN,image) =>{
        const response = await updateService(id,data.name,data.name_en,content,contentEN,image)
        document.getElementById("file-upload-service-"+id).value = ''
        Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {data?.name}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative', flexDirection:'column'}}>
                <Typography>Ảnh chính</Typography>
                <Typography textAlign={"center"} p={2} pt={4} sx={{width:"100%"}} color="error">Hãy tải lên ảnh có tỉ lệ 1:1 hoặc 1:2 và size tối đa 1MB để có thể hiển thị tốt nhất</Typography>
                <Box
                    sx={{ width: "300px", height:"300px", backgroundImage: `url(${image})`, backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-service-"+data.id_service}
                        type="file"
                        style={{ display: 'none' }}

                        onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-service-"+data.id_service}>
                        <Button variant="contained" color="primary" component="span">
                        {"Replace image"}
                        </Button>
                    </label>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={700}>Nội dung</Typography>
                <EditorComponent val={content} setVal={setContent}/>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={700}>Nội dung(EN)</Typography>
                <EditorComponent val={contentEN} setVal={setContentEN}/>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', mb: 5, mt: 5}}
                >
                    <Button variant="contained" onClick={()=>{handleEdit(data.id_service,content,contentEN,imageFile)}}>Lưu</Button>
                </Box>
            </Grid>
            {
                dataItem?.map((item)=>{
                    return <ItemDetail item={item} update={update} setUpdate={setUpdate} id={id}/>
                })
            }
        </Grid>
    )
}

const ItemDetail = ({item,update, setUpdate, id})=>{
    
    const [content,setContent] =useState(item.content)
    const [content_en,setContent_en] =useState(item.content_en)
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const data = {...item}
        data.image = file
        const response = await updateSharedtable(data)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            setUpdate(!update)
        }
    }
    const handleChangeContent = async (key,value) => {
        const data = {...item}
        data[key] = value
        const response = await updateSharedtable(data)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            setUpdate(!update)
        }
    }
    if(!item) return <></>
    return(
        <>
            <Typography variant="h6">{item?.name}</Typography>
                
            <Grid item xs={12} sx={{marginBottom:"20px",display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative', flexDirection:"column"}}>
                <CardMedia
                    component="img"
                    sx={{ width: '300px', height:'300px', border:"1px solid #eee",margin:"30px"}}
                    image={`http://localhost:3001/read_image/${item?.image}`}
                    alt={item?.name}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-image-service-"+item?.id_sharedtable}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-image-service-"+item?.id_sharedtable}>
                        <Button variant="contained" color="primary" component="span">
                            Thay ảnh
                        </Button>
                    </label>
                </Box>
                {
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label={'Nội dung'}
                                    value={content}
                                    onChange={(e)=>{setContent(e.target.value)}}
                                    multiline
                                    row={4}
                                    onBlur={()=>{handleChangeContent("content",content)}}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={'Nội dung(EN)'}
                                value={content_en}
                                onChange={(e)=>{setContent_en(e.target.value)}}
                                multiline
                                row={4}
                                onBlur={()=>{handleChangeContent("content_en",content_en)}}
                            />
                        </Grid>
                    </Grid>
                }
            </Grid>
        </>
    )
}