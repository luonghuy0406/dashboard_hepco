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
    IconButton
 } from '@mui/material';
import { useState } from 'react';
import EditorComponent from 'src/sections/@dashboard/EditorComponent';
import CloseIcon from '@mui/icons-material/Close';
import { getSharedtable, updateSharedtable } from 'src/api';
import Swal from 'sweetalert2';



// ----------------------------------------------------------------------

export default function About() {
    
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box sx={{ minWidth: 800 }}>
            <MailBox/>
            <Divider/>
            <DevelopmentHistory/>
        </Box>
      </Container>
    </>
  );
}

const MailBox = () =>{
    const [content,setContent] = useState('')
    const [contentEN,setContentEN] = useState('')
    const [letter,setLetter] = useState(null)
    
    useEffect(()=>{
        async function fetchData() {
            const datas = await getSharedtable('1')
            let data = datas.result
            setLetter(data)
        }
        fetchData();
        
    },[])
    useEffect(()=>{
        if(letter){
            setContent(letter.content)
            setContentEN(letter.content_en)
        }
        
    },[letter])
    const handleUpdate = async (data) =>{
        const dt = {...data}
        dt.content = content
        dt.content_en = contentEN
       const response = await updateSharedtable(dt)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
    }
    if(!letter)
    {
        return <></>
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    Thư ngỏ
                </Typography>
            </Grid>
            
            {/* <Grid item xs={6} sx={{display: 'flex', alignItems:"center", justifyContent:"center", position: 'relative', flexDirection:'column'}}>
                <Typography>Ảnh chính</Typography>
                
                <CardMedia
                    component="img"
                    sx={{ width: '100%'}}
                    image={`https://web-hepco-7ttu.vercel.app/assets/images/banner2.jpeg`}
                    // alt={banner.id_bn}
                />
                <Box sx={{position:'absolute'}}>
                    <input
                        accept="image/*"
                        id={"file-upload-vision-"+1}
                        type="file"
                        style={{ display: 'none' }}
                        // onChange={(e)=>{handleImageUpload(e)}}
                    />

                    <label htmlFor={"file-upload-vision-"+1}>
                        <Button variant="contained" color="primary" component="span">
                        {"Replace image"}
                        </Button>
                    </label>
                </Box>
            </Grid> */}
            <Grid item xs={12}>
                <Typography fontWeight={700}>Tiếng Việt</Typography>
                <EditorComponent val={content} setVal={setContent}/>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={700}>Tiếng Anh</Typography>
                <EditorComponent val={contentEN} setVal={setContentEN}/>
            </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', mb: 5, mt: 5}}
                >
                    <Button variant="contained" onClick={()=>{handleUpdate(letter)}}>Lưu</Button>
                </Box>
            </Grid>
        </Grid>
    )
}
const DevelopmentHistory = () =>{
    const data = [
        {
            date : '01/05/1975',
            content: 'Năm 1975, sau khi giải phóng hoàn toàn Miền nam, ngày 01/5/1975 Phòng Quản lý Đô thị và Nhà đất được thành lập, là tiền thân của đơn vị hiện nay',
            contentEN: 'Năm 1975, sau khi giải phóng hoàn toàn Miền nam, ngày 01/5/1975 Phòng Quản lý Đô thị và Nhà đất được thành lập, là tiền thân của đơn vị hiện nay'
        },
        {
            date : '28/12/1985',
            content: 'UBND thành phố Huế ban hành Quyết định số 59/QĐ-UB thành lập Công ty Quản lý Công trình Đô thị Huế',
            contentEN: 'UBND thành phố Huế ban hành Quyết định số 59/QĐ-UB thành lập Công ty Quản lý Công trình Đô thị Huế'
        },
        ,
        {
            date : '05/08/1991',
            content: 'UBND thành phố Huế ban hành Quyết định số 501/QĐ-UB thành lập Trung tâm Quản lý Vệ sinh Môi trường Đô thị Huế',
            contentEN: 'UBND thành phố Huế ban hành Quyết định số 501/QĐ-UB thành lập Trung tâm Quản lý Vệ sinh Môi trường Đô thị Huế'
        }
    ]
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
                    Lịch sử phát triển
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell align="center" >Số thứ tự</TableCell>
                        <TableCell align="center" >Mốc thời gian</TableCell>
                        <TableCell align="center" >Nội dung</TableCell>
                        <TableCell align="center" >Nội dung EN</TableCell>
                        <TableCell align="center" >Hành động</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row, index) => {
                        return (
                        <RowTable index={index} key={"table-row"+index} row={row}/>
                        )}
                    )}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

function RowTable({row,index}) {
    // const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [addNew, setAddNew] = useState(false)
    // const handleDeleteProduct = (row, setUpdate, update) =>{
    //   Swal.fire({
    //     text: `Are you sure you want to delete product ${row.name}?`,
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       const response = await deleteProduct(row.id_product)
    //       if(response.results.status == 'success'){
    //         setOpen(false)
    //         setUpdate(!update)
    //       }
    //       Swal.fire(
    //         response.results.status,
    //         response.results.msg,
    //         response.results.status
    //       )
    //     }
    //   })
    // }
    // const [subList,setSubList] = useState([])
    // useEffect(()=>{
    //     async function fetchData() {
    //         const productLists = await getSubProducts()
    //         if(productLists.results){
    //           const subProduct = productLists.results.filter((sub)=> sub.id_product == row.id_product)
    //           setSubList(subProduct)
    //           // setProductListTemp(productLists.results)
    //         }
    //     }
    //     fetchData();
        
    // },[update])
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
          <TableCell align="center" >
            {index+1}
          </TableCell>
          <TableCell align="center">
            {row.date}
          </TableCell>
          <TableCell align="center">
            {row.content}
          </TableCell>
          <TableCell align="center">
            {row.contentEN}
          </TableCell>
          <TableCell align="center">
            <Button variant="text" onClick={()=>{setOpenModal(true)}}>Chỉnh sửa</Button>
            <Button variant="text" color="error">Xoá</Button>
            
          </TableCell>
        </TableRow>
        <EditInfo openModal={openModal} setOpenModal={setOpenModal} row={row} index={index}/>
      </>
    );
  }

  const EditInfo = ({openModal, setOpenModal, row, index}) =>{
    const [date,setDate] = useState(row.date)
    const [content,setContent] = useState(row.content)
    const [contentEN,setContentEN] = useState(row.contentEN)
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
    return(
        <Modal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style}}>
                <Box>
                    <Typography variant="h4" p={2} sx={{display:'inline-block'}}>Chỉnh sửa mốc thời gian</Typography>
                    <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{p:4}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Mốc thời gian"}
                                    name={"head_"+index}
                                    // error={companyInfo?.[0]?.[key]?.invalid}
                                    // helperText={companyInfo?.[0]?.[key]?.msg}
                                    onChange={(e)=>{setDate(e.target.value)}}
                                    value={date}
                                    defaultValue={date}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Nội dung"}
                                    name={"head_"+index}
                                    multiline
                                    maxRows={4}
                                    onChange={(e)=>{setContent(e.target.value)}}
                                    value={content}
                                    defaultValue={content}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label={"Nội dung(EN)"}
                                    name={"head_"+index}
                                    multiline
                                    maxRows={4}
                                    // error={companyInfo?.[0]?.[key]?.invalid}
                                    // helperText={companyInfo?.[0]?.[key]?.msg}
                                    onChange={(e)=>{setContentEN(e.target.value)}}
                                    value={contentEN}
                                    defaultValue={contentEN}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{float:"right"}}>
                            <Stack spacing={2} direction="row" justifyContent={"end"}>
                                <Button variant="contained" >Lưu</Button>
                                <Button variant="text" style={{color:"gray"}} >Huỷ</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    )
  }