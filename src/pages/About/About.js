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
import { addHistory, deleteHistory, getListHistory, getSharedtable, updateHistory, updateSharedtable } from 'src/api';
import Swal from 'sweetalert2';
import Iconify from 'src/components/iconify/Iconify';



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
    const [data,setData] = useState([])
    const [update,setUpdate] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            const historyData = await getListHistory('1')
            let data = historyData.result.data
            setData(data.reverse())
        }
        fetchData();
        
    },[update])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
                    Lịch sử phát triển
                </Typography>
            </Grid>
            <Grid item xs={12}>
                
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', mb: 5, mt: 5}}
                >
                    <Button 
                        variant="contained" 
                        sx={{float:'right', m:2}} 
                        onClick={()=>{
                            setOpenModal(true)
                        }} 
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Thêm mới
                    </Button>
                </Box>
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
                        <RowTable index={index} key={"table-row"+index} row={row} update={update} setUpdate={setUpdate}/>
                        )}
                    )}
                    </TableBody>
                </Table>
            </Grid>
            <AddInfo openModal={openModal} setOpenModal={setOpenModal} update={update} setUpdate={setUpdate}/>
        </Grid>
    )
}

function RowTable({row,index,update,setUpdate}) {
    const [openModal, setOpenModal] = useState(false)
    const handleDelete = async (id)=>{
        Swal.fire({
            text: `Bạn có chắc chắn muốn xoá không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteHistory(id)
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
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          
          <TableCell align="center" >
            {index+1}
          </TableCell>
          <TableCell align="center">
            {row.time}
          </TableCell>
          <TableCell align="center">
            {row.content}
          </TableCell>
          <TableCell align="center">
            {row.content_en}
          </TableCell>
          <TableCell align="center">
            <Button variant="text" onClick={()=>{setOpenModal(true)}}>Chỉnh sửa</Button>
            <Button variant="text" color="error" onClick={()=>{handleDelete(row.id)}}>Xoá</Button>
            
          </TableCell>
        </TableRow>
        <EditInfo openModal={openModal} setOpenModal={setOpenModal} row={row} update={update} setUpdate={setUpdate}/>
      </>
    );
}

const EditInfo = ({openModal, setOpenModal, row,update,setUpdate}) =>{
    const [date,setDate] = useState(row.time)
    const [content,setContent] = useState(row.content)
    const [contentEN,setContentEN] = useState(row.content_en)

    const handleEditHistory = async (time,content,content_en) =>{
        const data ={...row}
        data['time'] = time
        data['time_en'] = time
        data['content'] = content
        data['content_en'] = content_en
        
        const response = await updateHistory(data)
        Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            setUpdate(!update)
            setOpenModal(false)
        }
    }
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 1,
        borderRadius: '4px',
        width: '60%'
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
                    <Typography variant="h4" p={2} sx={{display:'inline-block'}}>Chỉnh sửa mốc thời gian</Typography>
                    <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{p:4}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Mốc thời gian"}
                                    onChange={(e)=>{setDate(e.target.value)}}
                                    value={date}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Nội dung"}
                                    multiline
                                    maxRows={4}
                                    onChange={(e)=>{setContent(e.target.value)}}
                                    value={content}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Nội dung(EN)"}
                                    multiline
                                    maxRows={4}
                                    onChange={(e)=>{setContentEN(e.target.value)}}
                                    value={contentEN}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{float:"right"}}>
                            <Stack spacing={2} direction="row" justifyContent={"end"}>
                                <Button variant="contained" onClick={()=>{handleEditHistory(date, content,contentEN)}}>Lưu</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    )
}

const AddInfo = ({openModal, setOpenModal, update, setUpdate}) =>{
    const [date,setDate] = useState('')
    const [content,setContent] = useState('')
    const [contentEN,setContentEN] = useState('')
    const handleAdd = async (time,content,content_en) =>{
        const data ={}
        data['time'] = time
        data['time_en'] = time
        data['content'] = content
        data['content_en'] = content_en
        
        const response = await addHistory(data)
        Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            setUpdate(!update)
            setOpenModal(false)
        }
    }
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 1,
        borderRadius: '4px',
        width: '60%'
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
                    <Typography variant="h4" p={2} sx={{display:'inline-block'}}>Thêm mốc thời gian</Typography>
                    <IconButton aria-label="close" color="error" sx={{margin:'10px', float:'right'}} onClick={()=>{setOpenModal(false)}}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{p:4}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Mốc thời gian"}
                                    onChange={(e)=>{setDate(e.target.value)}}
                                    value={date}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Nội dung"}
                                    multiline
                                    maxRows={4}
                                    onChange={(e)=>{setContent(e.target.value)}}
                                    value={content}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    label={"Nội dung(EN)"}
                                    multiline
                                    maxRows={4}
                                    onChange={(e)=>{setContentEN(e.target.value)}}
                                    value={contentEN}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{float:"right"}}>
                            <Stack spacing={2} direction="row" justifyContent={"end"}>
                                <Button variant="contained" onClick={()=>{handleAdd(date, content,contentEN)}}>Lưu</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    )
}