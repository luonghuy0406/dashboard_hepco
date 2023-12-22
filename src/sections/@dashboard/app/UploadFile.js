import { Typography, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
// import { replaceBanner } from 'src/api';
import Swal from 'sweetalert2';

const UploadFile = (props) => {
  const handleFileChange = async (event) => {
    // const data = await replaceBanner(props.id,event.target.files[0])
    // Swal.fire(
    //   data.results.status,
    //   data.results.msg,
    //   data.results.status
    // )
    // props.setUpdate(!props.update)
  };
  
  return (
    <div>
      <input
        accept="image/*"
        id={"file-upload-"+props.id}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <label htmlFor={"file-upload-"+props.id}>
        <Button variant="text" color="primary" component="span">
          Replace image
        </Button>
      </label>
    </div>
  );
};

export default UploadFile;