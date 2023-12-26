import { Helmet } from 'react-helmet-async';
import React from 'react'
import {  Container,Divider, Typography, Box, Button, Grid, FormControl, TextField, FormGroup, FormControlLabel, Checkbox, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {addQuestion, deleteQuestion, getQuestion, updateQuestion} from 'src/api';
import Swal from 'sweetalert2';
import EditorComponent from 'src/sections/@dashboard/EditorComponent';



// ----------------------------------------------------------------------

export default function FAQ() {
    const [openModal,setOpenModal] = useState(false)
    const [qna, setQna] = useState([])
    const itemsPerPage = 1000
    const [update,setUpdate] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            const qnas = await getQuestion(itemsPerPage,1)
            if(qnas.result){
              setQna(qnas.result.data)
            }
        }
        fetchData()
      },[update])
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
            <Typography variant="h4" sx={{ mb: 5 }}>
            Câu hỏi thường gặp
            </Typography>
            <Button 
                variant="contained" 
                sx={{float:'right', m:2}} 
                onClick={()=>{
                    setOpenModal(true)
                }} 
                startIcon={<Iconify icon="eva:plus-fill" />}
            >
                Thêm câu hỏi
            </Button>
        <Divider />
        <Box sx={{ minWidth: 800 }}>
            <Questions qna={qna} update={update} setUpdate={setUpdate}/>
        </Box>
      </Container>
      <Modal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
                <ModalAdd qna={qna} update={update} setUpdate={setUpdate} setOpenModal={setOpenModal}/>
        </Modal>
    </>
  );
}

const Questions = ({qna, update, setUpdate}) =>{
    return (
        <Grid container spacing={2}>
            {
                qna.map((q,id)=>{
                    return(
                        <QuestionItem q={q} id={id} update={update} setUpdate={setUpdate}/>
                    )
                })
            }
            
        </Grid>
    )
}
const QuestionItem = ({q,id,  update, setUpdate}) =>{
    const [ques, setQues] = useState(q.question)
    const [ques_en, setQues_en] = useState(q.question_en)
    const [answer,setAnswer] = useState(q.answer)
    const [answer_en,setAnswer_en] = useState(q.answer_en)
    const handleDeletePost = async (id)=>{
        Swal.fire({
            text: `Are you sure you want to delete post?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteQuestion(q.id_qna)
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
    const handleEditQuestion = async(id_qna,question,question_en,answer,answer_en,key_qna) =>{
        const response = await updateQuestion(id_qna,question,question_en,answer,answer_en, key_qna)
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
        <>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{marginTop: "16px"}}>
                    Câu hỏi số {id+1}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth={true}>
                    <Typography gutterBottom>
                        Câu hỏi
                    </Typography>
                    <TextField
                        value={ques}
                        onChange={(e)=>{setQues(e.target.value)}}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth={true}>
                    <Typography gutterBottom>
                        Câu hỏi (EN)
                    </Typography>
                    <TextField
                        value={ques_en}
                        onChange={(e)=>{setQues_en(e.target.value)}}
                    />
                </FormControl>
            </Grid>
            
            <Grid item xs={6}>
                    <Typography gutterBottom>
                        Câu trả lời
                    </Typography>
                    <EditorComponent val={answer} setVal={setAnswer}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>
                        Câu trả lời (EN)
                    </Typography>
                    <EditorComponent val={answer_en} setVal={setAnswer_en}/>
                </Grid>
            <Grid item xs={12}>
                <Box
                    sx={{display: 'flex', justifyContent:'flex-end', marginBottom: '16px'}}
                >
                    {
                        id > 4 &&
                        <Button variant="contained" color="error" onClick={()=>{handleDeletePost(q.id_qna)}} sx={{marginRight: '10px'}}>Xoá</Button>
                    }
                    <Button variant="contained" onClick={()=>{handleEditQuestion(q.id_qna,ques,ques_en,answer,answer_en,q.key_qna)}}>Sửa</Button>
                </Box>
                <Divider/>
            </Grid>
        </>
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
const ModalAdd = ({qna, update, setUpdate, setOpenModal}) =>{
    const [ques, setQues] = useState('')
    const [ques_en, setQues_en] = useState('')
    const [answer,setAnswer] = useState('')
    const [answer_en,setAnswer_en] = useState('')
    const handleAddQuestion = async(question,question_en,answer,answer_en) =>{
        const response = await addQuestion(question,question_en,answer,answer_en)
        Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
        if(response.result.status == 'success'){
            setUpdate(!update)
            handleCancel()
            setOpenModal(false)
        }
    }
    const handleCancel = () =>{
        setQues('')
        setQues_en('')
        setAnswer('')
        setAnswer_en('')
    }

    return (
        <Box sx={{ ...style}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{marginTop: "16px"}}>
                        Thêm câu hỏi mới
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth={true}>
                        <Typography gutterBottom>
                            Câu hỏi
                        </Typography>
                        <TextField
                            value={ques}
                            onChange={(e)=>{setQues(e.target.value)}}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth={true}>
                        <Typography gutterBottom>
                            Câu hỏi (EN)
                        </Typography>
                        <TextField
                            value={ques_en}
                            onChange={(e)=>{setQues_en(e.target.value)}}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>
                        Câu trả lời
                    </Typography>
                    <EditorComponent val={answer} setVal={setAnswer}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>
                        Câu trả lời (EN)
                    </Typography>
                    <EditorComponent val={answer_en} setVal={setAnswer_en}/>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{display: 'flex', justifyContent:'flex-end', marginBottom: '16px'}}
                    >
                        <Button variant="contained" color="error" onClick={()=>{handleCancel()}} sx={{marginRight: '10px'}}>Huỷ</Button>
                        <Button variant="contained" onClick={()=>{handleAddQuestion(ques,ques_en,answer,answer_en)}}>Lưu</Button>
                    </Box>
                    <Divider/>
                </Grid>
            </Grid>
        </Box>
    )
}

