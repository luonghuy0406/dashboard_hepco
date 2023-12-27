import { Helmet } from 'react-helmet-async';
import {  Typography, Container, Box,  Button, Divider, TextField, Grid, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCompanyInfo, updateWebinf } from 'src/api';
import Swal from 'sweetalert2';


// ----------------------------------------------------------------------

export default function CompanyInformations() {
    const [companyInfo,setCompanyInfo] = useState(null)
    useEffect(()=>{
        async function fetchData() {
            const companyInfo = await getCompanyInfo()
            let data = companyInfo.result
            setCompanyInfo(data.data)
        }
        fetchData();
        
    },[])
    const handleOnChange = (value,index,lang='')=>{
        const data = [...companyInfo]
        data[index]['data'+lang] = value
        setCompanyInfo(data)
    }
    const handleUpdate = async (data) =>{
       const response = await updateWebinf(data)
       Swal.fire(
            response.result.status,
            response.result.msg,
            response.result.status
        )
    }
    if(!companyInfo)
    {
        return <></>
    }
  return (
    <>
      <Helmet>
        <title> Trang chủ | HEPCO - CÔNG TY CỔ PHẦN MÔI TRƯỜNG VÀ CÔNG TRÌNH ĐÔ THỊ HUẾ </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thông tin công ty
        </Typography>
        <Divider />
        <br/>
        <Box sx={{ minWidth: 800 }}>
        <Box sx={{ width: '100%' }}>
                <Grid container>
                    {
                       companyInfo?.map((info,key)=>{
                            if(info.id == 15){
                                return <></>
                            }
                            return(
                                <Grid item xs={12} spacing={2} container key={'info'+key}>
                                    <Grid item xs={6} p={1} >
                                        <FormControl required={true} fullWidth={true}>
                                            <TextField
                                                InputLabelProps={{ shrink: true }}
                                                required
                                                label={info.name}
                                                value={info.data}
                                                onChange={(e)=>{handleOnChange(e.target.value,key,'')}}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} p={1}>
                                        <FormControl required={true} fullWidth={true}>
                                            <TextField
                                                InputLabelProps={{ shrink: true }}
                                                required
                                                label={info.name_en}
                                                value={info.data_en}
                                                onChange={(e)=>{handleOnChange(e.target.value,key,'_en')}}
                                            />
                                        </FormControl>
                                        <Box
                                            sx={{display: 'flex', justifyContent:'flex-end', marginTop:'10px'}}
                                        >
                                            <Button variant="contained" onClick={()=>{handleUpdate(info)}}>Update</Button>
                                        </Box>
                                    </Grid>
                                    <Divider/>
                                </Grid>
                                
                            )
                        })
                    }
                </Grid>
                
            </Box>
            
        </Box>
      </Container>
    </>
  );
}

