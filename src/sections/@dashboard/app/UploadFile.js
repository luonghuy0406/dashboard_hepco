import { Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { replaceBanner } from 'src/api';

const UploadFile = (props) => {
  const handleFileChange = async (event) => {
    const data = await replaceBanner(props.id,event.target.files[0])
    if(data.results){
      props.setUpdate(!props.update)
    }

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
        <Button variant="contained" color="primary" component="span">
          Replace image
        </Button>
      </label>
    </div>
  );
};

export default UploadFile;