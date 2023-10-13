import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Collapse,
  IconButton,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Divider,
  Grid
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { fDate } from '../../../utils/formatTime';
import EditorComponent from './EditorComponent';
import Swal from 'sweetalert2';
import { deleteProduct } from 'src/api';

export default function ProductsTable(props){
  const {
    items = [],
    productGroup,
    setUpdate,
    update
  } = props;
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <></>
                </TableCell>
                <TableCell>Product name</TableCell>
                <TableCell>Product line</TableCell>
                <TableCell>Product cover</TableCell>
                <TableCell>Product description VI</TableCell>
                <TableCell>Product description EN</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => {
                return (
                  <Row key={row.id} row={row} group={productGroup[row.id_group]} setUpdate={setUpdate} update={update}/>
                )}
              )}
            </TableBody>
          </Table>
      </Box>
    </Card>
  );
};

function Row({row, group, setUpdate, update}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ borderLeft: (open ? "2px solid #6366f1" : "unset") }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
          </IconButton>
        </TableCell>
        <TableCell >
          {row.name}
        </TableCell>
        <TableCell >
          {group}
        </TableCell>
        <TableCell>
          <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={`${process.env.REACT_APP_API_HOST}/read_image/${row.image}`}
              alt={row.name}
            />
        </TableCell>
        <TableCell>
          <div 
            style={{
              'overflow': 'hidden',
              'display': '-webkit-box',
              '-webkit-line-clamp': '4', /* number of lines to show */
              'line-clamp': '4', 
              '-webkit-box-orient': 'vertical'
          }}
            className='ck-content'
            dangerouslySetInnerHTML={{__html:row.des}}
          />
          </TableCell>
        <TableCell>
          <div 
            className='ck-content'
            style={{
              'overflow': 'hidden',
              'display': '-webkit-box',
              '-webkit-line-clamp': '4', /* number of lines to show */
              'line-clamp': '4', 
              '-webkit-box-orient': 'vertical'
          }}
            dangerouslySetInnerHTML={{__html:row.des_en}}
          />
        </TableCell>
        <TableCell>
          {fDate(row.edit_date ? row.edit_date : row.cre_date)}
        </TableCell>
      </TableRow>
      <TableRow style={{ borderLeft: (open ? "2px solid #6366f1" : "unset") }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <EditProduct row={row} setOpen={setOpen} setUpdate={setUpdate} update={update}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const EditProduct = ({row, setOpen, setUpdate, update})=>{
  const [name,setName] = useState(row.name)
  const [image,setImage] = useState(`${process.env.REACT_APP_API_HOST}/read_image/${row.image}`)
  const [des,setDes] = useState(row.des)
  const [des_en,setDesEN] = useState(row.des_en)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file))
    
  };
  const handleUpdateProduct = () =>{

  }
  const handleDeleteProduct = (row) =>{
    Swal.fire({
      text: `Are you sure you want to delete product ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(row.id_product)
        setOpen(false)
        setUpdate(!update)
      }
    })
  }
  const handleCancel = () =>{
    setName(row.name)
    setImage(`${process.env.REACT_APP_API_HOST}/read_image/${row.image}`)
    setDes(row.des)
    setDesEN(row.des_en)
    setOpen(false)
  }
  return (
          <Box sx={{ margin: 3}}>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="h6" gutterBottom component="div">
                  Edit product
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 2},
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <h3>Product name</h3>
                  <TextField defaultValue={name} variant="standard"  fullWidth/>
                  <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                      spacing={2}
                      sx={{width:'100%'}}
                  >
                      <h3>Product Cover</h3>
                      <div>
                          <input
                              accept="image/*"
                              id={"file-upload-product"+row.id}
                              type="file"
                              style={{ display: 'none' }}
                              onChange={(e)=>{handleImageUpload(e)}}
                          />

                          <label htmlFor={"file-upload-product"+row.id}>
                              <Button variant="text" color="primary" component="span">
                                  Replace image
                              </Button>
                          </label>
                      </div>
                  </Stack>
                  <Stack  mb={5} sx={{alignItems:"center"}}>
                      <Box
                          sx={{display: 'flex', alignItems:'center', flexDirection:'column'}}
                      >
                          
                          <CardMedia
                              component="img"
                              sx={{ width: 200, height: 200, textAlign: "center" }}
                              image={`${image}`}
                              alt="about 1"
                          />
                      </Box>
                  </Stack>
                  <h3>Product description VI</h3>

                  <EditorComponent des={des} setDes={setDes}/>
                  <h3>Product description EN</h3>

                  <EditorComponent des={des_en} setDes={setDesEN}/>

                </Box>
              </Grid>
            </Grid>
            <Divider/>
            <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="space-between">
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleUpdateProduct}>Update</Button>
                <Button variant="text" style={{color:"gray"}} onClick={handleCancel}>Cancel</Button>
              </Stack>
              <Button variant="text" color="error" onClick={()=>{handleDeleteProduct(row)}}>Delete product</Button>
            </Stack>
          </Box>
  )
}