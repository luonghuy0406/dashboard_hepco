import React, { useState } from 'react';
import { Grid, Card, CardMedia,Container, useTheme, Typography, Box, Dialog, DialogContent, Pagination, Button, Stack,
    Modal,
    TextField,
    FormControl,
    IconButton,
    FormHelperText} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from 'src/components/iconify/Iconify';

const images = [
  { id: 1,description: 'ác thông tin kháccác thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 2,description: 'Bạn có thể thêm các thác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  { id: 3,description: 'Bạn có thể thêm các thôngn khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'},
  { id: 4,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 5,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 6,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png'},
  { id: 7,description: 'Bạn có thể thêmđây',url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  { id: 8,description: 'Bạn có thể thêm c tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'},
  { id: 9,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 10,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 11,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png'},
  { id: 12,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 13,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  { id: 14,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'},
  { id: 15,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 16,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 17,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png'},
  { id: 18,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  { id: 19,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'},
  { id: 20,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 21,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 22,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png'},
  { id: 23,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 24,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  { id: 25,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'},
  { id: 26,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 27,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 28,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png'},
  { id: 29,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'},
  { id: 30,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg'},
  { id: 31,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 32,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'},
  { id: 33,description: 'Bạn có thể thêm các thông tin khác tại đây Bạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đâyBạn có thể thêm các thông tin khác tại đây',url: 'https://www.techsmith.com/blog/wp-content/uploads/2022/03/resize-image.png'},
  
  // Thêm các ảnh khác vào đây
];

const Gallery = () => {
    const theme = useTheme()
    const [open,setOpen] = useState(false)

    const [openModal,setOpenModal] = useState(false)
    const [currentId,setCurrentId] = useState(null)
    const [page, setPage] = useState(1);
    const itemsPerPage = 20; // Change this according to your needs

    // Your data array
    const data = [...images];

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get the current page's data
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };
  return (
        <Container 
            maxWidth={'xl'} 
        >
            <Typography sx={{mb:3}} variant='h4' fontWeight={700} >{'Thư viện ảnh'}</Typography>
            <Button 
                variant="contained" 
                sx={{float:'right', m:2}} 
                onClick={()=>{
                    setOpenModal(true)
                    // setAdd(true)
                }} 
                startIcon={<Iconify icon="eva:plus-fill" />}
            >
                Add new
            </Button>
            <Modal
                open={openModal}
                onClose={()=>{setOpenModal(false)}}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                    <ModalAdd setOpenModal={setOpenModal}/>
            </Modal>
            <Grid container spacing={2}>
                {currentPageData.map((image, index) => (
                    <Grid key={index} item xs={6} sm={6} md={4} lg={3}>
                        <Card 
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position:'relative'
                            }}
                            onClick={()=>{
                                setOpen(true)
                                setCurrentId(index)
                            }}
                        >
                                <CardMedia 
                                    component="img"
                                    alt={`Image ${index + 1}`}
                                    height="auto"
                                    image={image.url}
                                    sx={{flex: 1,
                                    objectFit: 'cover'}}
                                />
                            <Box sx={{padding: 2,background: '#00000066',position:'absolute',left:0,right:0,bottom:0}}>
                                <Typography 
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }} 
                                    color={"#ffffff"}
                                    >{image.description}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{width:'100%', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination
                    variant="outlined" 
                    color="primary"
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    boundaryCount={1} 
                    siblingCount={1}
                />
            </Box>
            <Dialog 
                open={open} 
                onClose={()=>{
                    setOpen(false)
                    setCurrentId(null)
                }}
                maxWidth="md"
                fullWidth
                
            >
                <Box sx={{padding: theme.spacing(2), position:'relative'}} className='wrap-image-dialog'>
                    <Box 
                            sx={{
                                textAlign: 'center',
                                width:'100%',
                                overflow:'hidden',
                                height:'700px',
                                display:'flex',
                                alignItems:'center', 
                                justifyContent:'center'
                            }}
                        >
                                <img
                                    src={currentPageData?.[currentId]?.url}
                                    alt="Fullscreen"
                                    style={{
                                        maxWidth: '100%',
                                        // height: 'auto',
                                        maxHeight:'700px',
                                        objectFit: 'contain'
                                    }}
                                />
                        </Box>
                    <Box sx={{padding: theme.spacing(3),background: '#00000066',position:'absolute',left:0,right:0,bottom:0}}>
                        <Typography 
                            color={"#ffffff"}
                            >{currentPageData?.[currentId]?.description}</Typography>
                    </Box>
                    <Box sx={{background: '#fff', borderBottom: '1px solid #0000002e',width: '100%', display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'end', padding:'10px', position:'absolute', right:0, top:0}}>
                        <Button variant="text" color="error">Xoá</Button>
                        <Box onClick={()=>{
                            setOpen(false)
                            setCurrentId(null)
                        }} sx={{display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'center', width:'30px', color:'#000', height:'30px', borderRadius:'50%'}}>
                            <CloseIcon/>
                        </Box>
                    </Box>
                    <Box 
                        className='button-next-image'
                        onClick={()=>{
                            if(currentId - 1 >= 0){
                                setCurrentId(currentId - 1 )
                            }
                        }}
                        sx={{
                            transition: 'all .4s ease-in-out 0s',
                            opacity:'.3', 
                            marginLeft:'10px', 
                            display:'flex',
                            cursor:'pointer', 
                            alignItems:'center',
                            justifyContent:'center',
                            width:'60px', 
                            color:'#fff', 
                            height:'60px', 
                            borderRadius:'50%', 
                            background: '#00000066', 
                            position:'absolute', 
                            left:0, 
                            bottom:'50%'
                        }}
                        >
                        <KeyboardArrowLeftIcon/>
                    </Box>
                    <Box 
                    className='button-next-image'
                    onClick={()=>{
                        if(currentId + 1 <= images.length){
                            setCurrentId(currentId + 1 )
                        }
                    }}
                    sx={{
                        transition: 'all .4s ease-in-out 0s',
                        opacity:'.3', 
                        marginRight:'10px', 
                        display:'flex',
                        cursor:'pointer', 
                        alignItems:'center',
                        justifyContent:'center',
                        width:'60px', 
                        color:'#fff', 
                        height:'60px', 
                        borderRadius:'50%', 
                        background: '#00000066', 
                        position:'absolute', 
                        right:0, 
                        bottom:'50%'
                        }}
                    >
                        <KeyboardArrowRightIcon/>
                    </Box>
                </Box>
            </Dialog>
        </Container>
  );
};

export default Gallery;


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
const ModalAdd = ({setOpenModal}) =>{
    // if(id){
    //     data = data.filter((dt)=> dt.id == id)
    // }
    const [content,setContent] = useState('')
    const [image, setImage] = useState()
    const [imageFile, setImageFile] = useState('')
    // useEffect(()=>{
    //     if(customers?.length > 0){
    //         toDataURL(`http://localhost:3001/read_image/${customers[0].image}`)
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
    //         setImage(add ? '' : `http://localhost:3001/read_image/${customers[0].image}`)
    //         document.getElementById("file-upload-new-customer"+id).value = ''
    //     }
    //     setOpenModal(false)
    // }
    return(
        <Box sx={{ ...style}}>
            <Box>
                <Typography variant="h4" p={2} sx={{display:'inline-block'}}>{'Thêm ảnh mới'}</Typography>
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
                                    Mô tả
                                </Typography>
                                <FormControl required={true} fullWidth={true}>
                                <TextField
                                    required
                                    variant='standard'
                                    // name={"customer_name"}
                                    // onChange={(e)=>{setName(e.target.value)}}
                                    // value={name}
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
                                    id={"file-upload-new-customer"}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e)=>{handleImageUpload(e)}}
                                />

                                <label htmlFor={"file-upload-new-customer"}>
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
                                    alt={content}
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
