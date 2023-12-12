import { Helmet } from 'react-helmet-async';
import React from 'react'
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



// ----------------------------------------------------------------------

export default function Achievements() {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <Government/>
            <Divider/>
            <Others/>
        </Box>
      </Container>
    </>
  );
}

const Others = () =>{
    const data = [
        {
            id: 1,
            title : 'KHEN THƯỞNG BỘ, BAN NGÀNH, HỘI NGHỀ NGHIỆP TRUNG ƯƠNG',
            content: 'Năm 1975, sau khi giải phóng hoàn toàn Miền nam, ngày 01/5/1975 Phòng Quản lý Đô thị và Nhà đất được thành lập, là tiền thân của đơn vị hiện nay',
            contentEN: 'Năm 1975, sau khi giải phóng hoàn toàn Miền nam, ngày 01/5/1975 Phòng Quản lý Đô thị và Nhà đất được thành lập, là tiền thân của đơn vị hiện nay'
        },
        {
            id: 2,
            title : 'KHEN THƯỞNG CỦA UBND TỈNH VÀ CÁC CƠ QUAN CẤP TỈNH',
            content: 'UBND thành phố Huế ban hành Quyết định số 59/QĐ-UB thành lập Công ty Quản lý Công trình Đô thị Huế',
            contentEN: 'UBND thành phố Huế ban hành Quyết định số 59/QĐ-UB thành lập Công ty Quản lý Công trình Đô thị Huế'
        },
        ,
        {
            id: 3,
            title : 'KHEN THƯỞNG CÔNG TÁC ĐẢNG - ĐOÀN THỂ',
            content: 'UBND thành phố Huế ban hành Quyết định số 501/QĐ-UB thành lập Trung tâm Quản lý Vệ sinh Môi trường Đô thị Huế',
            contentEN: 'UBND thành phố Huế ban hành Quyết định số 501/QĐ-UB thành lập Trung tâm Quản lý Vệ sinh Môi trường Đô thị Huế'
        }
    ]
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 2,mt: 2 }}>
                    Khen thưởng khác
                </Typography>
            </Grid>
            {
                data.map((dt, index)=>{
                    return <OthersItem key={index+'-giaithuong'} title={dt.title} content={dt.content} contentEN={dt.contentEN}/>
                })
            }

            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', mb: 5, mt: 5}}
                >
                    <Button variant="contained" onClick={()=>{}}>Lưu</Button>
                </Box>
            </Grid>
        </Grid>
    )
}
const OthersItem = ({title,content, contentEN}) =>{
    const [val, setVal] = useState(content)
    const [valEN, setValEN] = useState(contentEN)
    return (
        <>
            <Grid item xs={6}>
                <Typography sx={{paddingBottom:2}} fontWeight={700}>{title}</Typography>
                <EditorComponent val={val} setVal={setVal}/>
            </Grid>
            <Grid item xs={6}>
                <Typography sx={{paddingBottom:2}} fontWeight={700}>{title +' (EN)'}</Typography>
                <EditorComponent val={valEN} setVal={setValEN}/>
            </Grid>
        </>
    )
}


const datas = [
    {
        id: 1,
        name : 'Huân chương 1',
        image: 'https://icdn.dantri.com.vn/thumb_w/680/2022/06/16/huan-chuong-lao-dong-1655346540689.png'    
    },
    {
        id: 2,
        name : 'Huân chương 2',
        image: 'https://icdn.dantri.com.vn/thumb_w/680/2022/06/16/huan-chuong-lao-dong-1655346540689.png'    
    },
    {
        id: 3,
        name : 'Bằng khen 1',
        image: 'https://secoin.com/uploaded/gioi-thieu/Giai%20thuong%20va%20thanh%20tich/1%20BK%20Thu%20tuong%20chinh%20phu%20Cty%20CP%20Secoin%202019%20a.jpg'
    },
    {
        id: 4,
        name : 'Bằng khen 1',
        image: 'https://secoin.com/uploaded/gioi-thieu/Giai%20thuong%20va%20thanh%20tich/1%20BK%20Thu%20tuong%20chinh%20phu%20Cty%20CP%20Secoin%202019%20a.jpg'
    },
    {
        id: 5,
        name : 'Cờ thi đua',
        image: 'https://rccgroup.vn/wp-content/uploads/2021/10/CTD-CP-2006-2-768x768.png'
    }
]
const Government= () =>{
    const [data,setData] = useState(datas)
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
                            <TableCell align="center">
                              <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 350, textAlign: 'center' }}
                                  image={`${row.image}`}
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
                                  setId(row.id);
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
        data = data.filter((dt)=> dt.id == id)
    }
    const [name,setName] = useState(add ? '' : data[0].name)
    const [image, setImage] = useState(add ? '' : `${data[0].image}`)
    const [imageFile, setImageFile] = useState('')
    // useEffect(()=>{
    //     if(customers?.length > 0){
    //         toDataURL(`${process.env.REACT_APP_API_HOST}/read_image/${customers[0].image}`)
    //         .then(dataUrl => {
    //             var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
    //             setImageFile(fileData)
    //         })
    //     }
    // },[id])
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file))
        
    };
    // const handleAddNew = async (name, image, id, update, add, customers, file)=>{
    //     if(name && image){
    //         const imageFile = document.getElementById("file-upload-new-customer"+id).files[0] || file
    //         if(add){
    //             const response = await addNewCustomer(name, imageFile)
    //             Swal.fire(
    //                 response.results.status,
    //                 response.results.msg,
    //                 response.results.status
    //             )
    //             setOpenModal(false)
    //             setUpdate(!update)
    //             handleCancel(add,id, customers)
    //         }else{
    //             const response = await updateCustomer(id, name, imageFile)
    //             Swal.fire(
    //                 response.results.status,
    //                 response.results.msg,
    //                 response.results.status
    //             )
    //             setOpenModal(false)
    //             setUpdate(!update)
    //             handleCancel(add,id, customers)
    //         }
    //     }
    // }
    // const handleCancel = (add,id, customers) => {
    //     if(add){
    //         setName('')
    //         setImage('')
    //         document.getElementById("file-upload-new-customer"+id).value = ''
    //     }else{
    //         setName(add ? '' : customers[0].name)
    //         setImage(add ? '' : `${process.env.REACT_APP_API_HOST}/read_image/${customers[0].image}`)
    //         document.getElementById("file-upload-new-customer"+id).value = ''
    //     }
    //     setOpenModal(false)
    // }
    return(
        <Box sx={{ ...style}}>
            <Box>
                <Typography variant="h4" p={2} sx={{display:'inline-block'}}>{add ? 'Thêm giấy phép - chứng nhận' : 'Chỉnh sửa giấy phép - chứng nhận'}</Typography>
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
                                    Tên
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                <TextField
                                    required
                                    variant='standard'
                                    name={"customer_name"}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    error={name?.length == 0} 
                                    value={name}
                                    helperText = {name?.length == 0 ? "Name cannot be empty" : ""}
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
                                    id={"file-upload-new-customer"+id}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />

                                <label htmlFor={"file-upload-new-customer"+id}>
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
                        <Button variant="contained">Save</Button>
                        <Button variant="text" style={{color:"gray"}}>Cancel</Button>
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
