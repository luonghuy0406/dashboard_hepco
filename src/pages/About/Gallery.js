import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia,Container, useTheme, Typography, Box, Dialog, DialogContent, Pagination, Button, Stack,
    Modal,
    TextField,
    IconButton,
    FormHelperText,
    Tabs,
    Tab,
    CardContent} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Iconify from 'src/components/iconify/Iconify';
import { addAlbum, addListImages, deleteAlbum, deleteImage, getListAlbums, getListImages, updateAlbum, updateImage } from 'src/api';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { formatDateTime } from 'src/functions';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Gallery = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newtab) => {
        setTab(newtab);
    };
    return (
            <Container 
                maxWidth={'xl'} 
            >
                <Typography sx={{mb:3}} variant='h4' fontWeight={700} >{'Thư viện ảnh'}</Typography>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={"Toàn bộ ảnh"} {...a11yProps(0)} />
                        <Tab label={"Album ảnh"} {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tab} index={0}>
                        <AllPhotos tab={tab}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        <AllAlbums tab={tab}/>
                    </CustomTabPanel>
                </Box>
            </Container>
    );
}

export default Gallery;




const AllPhotos = ({id_album}) => {
    const [update, setUpdate] = useState(false)
    const [open,setOpen] = useState(false)
    const [images,setImages] = useState([])
    const [currentImage,setCurrentImage] = useState(null)
    const [page, setPage] = useState(1);
    const itemsPerPage = 20; 
    const [totalPages,setTotalPages] = useState(0)
    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(()=>{
        async function fetchData() {
            const data = await getListImages(itemsPerPage,page,id_album || "0")
            if(data.result){
                setImages(data.result.data)
                setTotalPages(Math.ceil(data.result.num_image / itemsPerPage))
            }
        }
        fetchData()
    },[update, page])

    const handleAddListImages  = async (imageFile)=>{
        if(imageFile?.length >15){
            Swal.fire(
                'warning',
                'Cảnh báo',
                'Chỉ được phép tải lên tối đa 15 hình'
            )
        }else{
            const response = await addListImages(imageFile, id_album || "1")
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            if(response.result.status == 'success'){
                setUpdate(!update)
            }
        }
    }
  return (
        <Container 
            maxWidth={'xl'} 
        >

            <Box>
                <input
                    accept="image/*"
                    id={"file-upload-list-image-new"}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e)=>{handleAddListImages(e.target.files)}}
                    multiple
                />
                <label 
                    htmlFor={"file-upload-list-image-new"}
                    style={{
                        display: "flex",
                        alignItems: "end",
                        flexDirection: "column",
                        paddingBottom: "25px"
                    }}
                >
                    <Button 
                        component="span"
                        variant="contained" 
                        sx={{float:'right', m:2}} 
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Thêm ảnh mới
                    </Button>
                    <FormHelperText color="error" sx={{float:"right"}}>Tải lên tối đa 15 hình trong 1 lần</FormHelperText>
                </label>

            </Box>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid key={index} item xs={6} sm={6} md={4} lg={3}>
                        <Card 
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position:'relative',
                                maxHeight: "300px"
                            }}
                        >
                            <IconButton
                                aria-label="delete" 
                                sx={{
                                    position: "absolute", 
                                    right:"0", 
                                    background: "#0000004d", 
                                    color: "#fff",
                                    "&:hover":{
                                        background: "#00000080"
                                    }
                                }}
                                onClick={()=>{
                                    setOpen(true)
                                    setCurrentImage(image)
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <CardMedia 
                                component="img"
                                alt={image.des}
                                height="auto"
                                image={`${process.env.REACT_APP_HOST}/read_image/${image.link}`}
                                sx={{flex: 1,objectFit: 'cover', minHeight:"200px"}}
                            />
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
            {
                currentImage &&
                <EditImageDialog currentImage={currentImage} open={open} setOpen={setOpen} setCurrentImage={setCurrentImage} setUpdate={setUpdate} update={update}/>
            }
        </Container>
  );
}

const EditImageDialog = ({currentImage, open, setOpen, setCurrentImage, setUpdate, update}) =>{
    const theme = useTheme()
    const [des,setDes] = useState(currentImage.des)
    const [des_en,setDes_en] = useState(currentImage.des_en)

    const handleEditImage = async (id,des,des_en) =>{
        const response = await updateImage(id,des,des_en)
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
    const handleCancel = () => {
        setOpen(false)
        setCurrentImage(null)
    }
    const handleDeleteImage = async (id)=>{
        Swal.fire({
            text: `Bạn có chắc chắn muốn xoá nó không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteImage(id)
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
          })
        
    }
    return(
        <Dialog 
            open={open} 
            onClose={()=>{
                setOpen(false)
                setCurrentImage(null)
            }}
            maxWidth="md"
            fullWidth
            
        >
            <Box sx={{background: '#fff', borderBottom: '1px solid #0000002e',width: '100%', display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'end', padding:'10px'}}>
                <Box onClick={()=>{
                    handleCancel()
                }} sx={{display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'center', width:'30px', color:'#000', height:'30px', borderRadius:'50%'}}>
                    <CloseIcon/>
                </Box>
            </Box>
            <Box sx={{padding: theme.spacing(2), position:'relative'}} className='wrap-image-dialog'>
                <Box 
                    sx={{
                        textAlign: 'center',
                        width:'100%',
                        overflow:'hidden',
                        display:'flex',
                        alignItems:'center', 
                        justifyContent:'center'
                    }}
                >
                        <img
                            src={`${process.env.REACT_APP_HOST}/read_image/${currentImage.link}`}
                            alt={currentImage.des}
                            style={{
                                maxWidth: '100%',
                                maxHeight:'300px',
                                objectFit: 'contain'
                            }}
                        />
                </Box>
                <Box sx={{padding: theme.spacing(3)}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Mô tả"
                                multiline
                                row={4}
                                fullWidth
                                value={des}
                                onChange={(e)=>{setDes(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mô tả (EN)"
                                multiline
                                row={4}
                                fullWidth
                                value={des_en}
                                onChange={(e)=>{setDes_en(e.target.value)}}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{padding:"20px", background: '#fff', borderBottom: '1px solid #0000002e',width: '100%', display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'end'}}>
                <Button variant="text" color="error" onClick={()=>{handleDeleteImage(currentImage.id_image)}}>Xoá</Button>
                <Button variant="contained" color="primary" onClick={()=>{handleEditImage(currentImage.id_image,des,des_en)}}>Lưu</Button>
                
            </Box>
        </Dialog>
    )
}


const AllAlbums = ({tab}) => {
    const [update, setUpdate] = useState(false)
    const [images,setImages] = useState([])
    const [open, setOpen] = useState(false)
    const [add, setAdd] = useState(false)
    const [page, setPage] = useState(1);
    const itemsPerPage = 20; 
    const [totalPages,setTotalPages] = useState(0)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(()=>{
        async function fetchData() {
            const data = await getListAlbums(itemsPerPage,page,0) 
            if(data.result){
                setImages(data.result.data)
                setTotalPages(Math.ceil(data.result.num_album / itemsPerPage))
            }
        }
        fetchData()
    },[update, page])
    if(currentAlbum){
        return(
            <>
                <AlbumDetail currentAlbum={currentAlbum} setCurrentAlbum={setCurrentAlbum} setOpen={setOpen} setAdd={setAdd} update={update} setUpdate={setUpdate}/> 
                <AlbumDialog add={add} currentAlbum={currentAlbum} open={open} setOpen={setOpen} setCurrentAlbum={setCurrentAlbum} setUpdate={setUpdate} update={update}/>
            </>
        )
    }
  return (
        <Container 
            maxWidth={'xl'} 
        >
            <Box>
                <Button 
                    component="span"
                    variant="contained" 
                    sx={{float:'right', m:2}} 
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={()=>{
                        setAdd(true)
                        setOpen(true)
                    }}
                >
                    Thêm album mới
                </Button>
            </Box>
            <Grid container spacing={2}>
                {images?.map((image, index) => {
                    if(image.id_album == 1 || image.id_album == 2){
                        return <></>
                    }
                    return(
                        <Grid key={index} item xs={6} sm={6} md={4} lg={3}>
                            <Card 
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position:'relative',
                                    maxHeight: "300px"
                                }}
                                onClick={()=>{setCurrentAlbum(image)}}
                            >
                                <CardMedia 
                                    component="img"
                                    alt={image.des}
                                    height="auto"
                                    image={`${process.env.REACT_APP_HOST}/read_image/${image.avatar}`}
                                    sx={{flex: 1,objectFit: 'cover', minHeight:"200px"}}
                                />
                                <CardContent>
                                    <Typography variant='h7' fontWeight={700}>{ image?.name}</Typography>
                                    <Typography >{`${image.num_image} ảnh`}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
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
            <AlbumDialog add={add} currentAlbum={currentAlbum} open={open} setOpen={setOpen} setCurrentAlbum={setCurrentAlbum} setUpdate={setUpdate} update={update}/>
        </Container>
  );
}

const AlbumDetail = ({currentAlbum, setCurrentAlbum, setOpen, setAdd, update, setUpdate})=>{
    const theme = useTheme()
    const handleDeleteAlbum = async (id)=>{
        Swal.fire({
            text: `Bạn có chắc chắn muốn xoá nó không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteAlbum(id)
                Swal.fire(
                    response.result.status,
                    response.result.msg,
                    response.result.status
                )
                if(response.result.status == 'success'){
                    setCurrentAlbum(null)
                    setUpdate(!update)
                }
            }
          })
        
    }
    return(
        <Container 
            maxWidth={'xl'} 
        >
            <Box sx={{padding:"20px", borderBottom: '1px solid #0000002e',width: '100%', display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'space-between'}}>
                <Box>
                    <Button variant="contained" color="primary" onClick={()=>{setCurrentAlbum(null)}}>Quay lại</Button>
                </Box>
                <Box>
                    <Button variant="text" color="error" onClick={()=>{handleDeleteAlbum(currentAlbum.id_album)}}>Xoá album</Button>
                    <Button 
                        variant="contained" 
                        sx={{marginLeft:"10px"}} 
                        color="primary" 
                        onClick={()=>{
                            setOpen(true)
                            setAdd(false)
                        }}
                    >Sửa album</Button>
                </Box>
            </Box>
            <Typography  sx={{marginTop:theme.spacing(4)}} variant='h5' textAlign={"center"} fontWeight={700} >{currentAlbum?.name}</Typography>
            <Typography sx={{marginBottom:theme.spacing(4)}} textAlign={"center"} fontWeight={600} fontSize={'13px'}>{`${formatDateTime(currentAlbum.cre_date, '%d-%m-%Y')} - ${currentAlbum?.num_image} ảnh`}</Typography>
            <Typography sx={{marginBottom:theme.spacing(4), padding:theme.spacing(4)}} >{currentAlbum?.des}</Typography>
            <AllPhotos id_album={currentAlbum.id_album}/>
        </Container>
    )
}
const AlbumDialog = ({add, currentAlbum, open, setOpen, setCurrentAlbum, setUpdate, update}) =>{
    const theme = useTheme()
    const [des,setDes] = useState(currentAlbum?.des || ' ')
    const [des_en,setDes_en] = useState(currentAlbum?.des_en || ' ')
    const [name,setName] = useState(currentAlbum?.name || ' ')
    const [name_en,setName_en] = useState(currentAlbum?.name_en || ' ')

    const handleClick = async (id,name,name_en,des,des_en) =>{
        if(add){
            const response = await addAlbum(name,name_en,des,des_en)
            Swal.fire(
                response.result.status,
                response.result.msg,
                response.result.status
            )
            if(response.result.status == 'success'){
                setUpdate(!update)
                handleCancel()
            }
        }else{
            const response = await updateAlbum(id,name,name_en,des,des_en)
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
        setOpen(false)
    }
    return(
        <Dialog 
            open={open} 
            onClose={()=>{
                setOpen(false)
                setCurrentAlbum(null)
            }}
            maxWidth="md"
            fullWidth
            
        >
            <Box sx={{background: '#fff', borderBottom: '1px solid #0000002e',width: '100%', display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'end', padding:'10px'}}>
                <Box onClick={()=>{
                    handleCancel()
                }} sx={{display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'center', width:'30px', color:'#000', height:'30px', borderRadius:'50%'}}>
                    <CloseIcon/>
                </Box>
            </Box>
            <Box sx={{padding: theme.spacing(2), position:'relative'}} className='wrap-image-dialog'>
                <Box sx={{padding: theme.spacing(3)}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Tên album"
                                multiline
                                row={4}
                                fullWidth
                                value={name}
                                onChange={(e)=>{setName(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tên album (EN)"
                                multiline
                                row={4}
                                fullWidth
                                value={name_en}
                                onChange={(e)=>{setName_en(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mô tả"
                                multiline
                                row={4}
                                fullWidth
                                value={des}
                                onChange={(e)=>{setDes(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mô tả (EN)"
                                multiline
                                row={4}
                                fullWidth
                                value={des_en}
                                onChange={(e)=>{setDes_en(e.target.value)}}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{padding:"20px", background: '#fff', borderBottom: '1px solid #0000002e',width: '100%', display:'flex',cursor:'pointer', alignItems:'center',justifyContent:'end'}}>
                <Button variant="contained" color="primary" onClick={()=>{handleClick(currentAlbum?.id_album,name,name_en,des,des_en)}}>Lưu</Button>
            </Box>
        </Dialog>
    )
}