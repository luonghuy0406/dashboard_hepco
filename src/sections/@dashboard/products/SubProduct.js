import React, {useEffect, useState} from 'react';
import { Modal } from '@material-ui/core';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Collapse,
  IconButton,
  CardMedia,
  TextField,
  Button,
  Divider,
  Grid
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditorComponent from './EditorComponent';
import Swal from 'sweetalert2';
import { deleteProduct, getSubProducts } from 'src/api';

import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RowSubProduct from './RowSubProduct';

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

export default function SubProduct({row, setUpdate, update, handleDeleteProduct, subList}){
    return (
      <Card>
          <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell align="center">
                      <></>
                    </TableCell>
                    <TableCell align="center" >Product name</TableCell>
                    <TableCell align="center" >Product cover</TableCell>
                    <TableCell align="center" >Product description VI</TableCell>
                    <TableCell align="center" >Product description EN</TableCell>
                    <TableCell align="center" >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subList.map((sub) => {
                    return (
                      <RowSubProduct key={sub.id_sub} row={sub}  setUpdate={setUpdate} update={update}/>
                    )}
                  )}
                </TableBody>
              </Table>
          </Box>
        </Card>
    )
  }