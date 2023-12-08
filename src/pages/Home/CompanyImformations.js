import { Helmet } from 'react-helmet-async';
import {  Typography, Container, Box,  Button, Divider, TextField, Grid, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCompanyInfo, updateWebinf } from 'src/api';
import Swal from 'sweetalert2';


// ----------------------------------------------------------------------

export default function CompanyInformations() {
    const [companyInfoInit,setCompanyInfoInit] = useState([])
    const [companyInfo,setCompanyInfo] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const companyInfo = await getCompanyInfo()
            let tempData = companyInfo.results
            setCompanyInfoInit(companyInfo.results)
                const info = tempData.map((office,index)=>{
                const newOffice = {...office}
                let convertedObject = {};
                delete newOffice.id
                if(index == 1){
                    delete newOffice.email
                    delete newOffice.link1
                    delete newOffice.link2
                    delete newOffice.link3
                }
                Object.keys(newOffice).forEach(key => {
                    convertedObject[key] = {
                        value: newOffice[key],
                        invalid: false,
                        msg: ""
                    };
                });
                return convertedObject
            })
            setCompanyInfo(info)
        }
        fetchData();
        
    },[])

    function handleChange(value,id,name){
        let infor = [...companyInfo]
        infor[id][name].value = value
        if(value.length == 0){
            infor[id][name].invalid = true
            infor[id][name].msg = `${name} cannot be empty`
        }else{
            if(name == 'phone_num'){
                infor[id][name].value = value.replace(/\s/g, '')
                infor[id][name].invalid = !isValidPhoneNumber(infor[id][name].value)
                if(!infor[id][name].invalid){
                    infor[id][name].msg = ``
                }else{
                    infor[id][name].msg = `Invalid phone number`
                }
            }else if(name == 'email'){
                infor[id][name].value = value.replace(/\s/g, '')
                infor[id][name].invalid = !isValidEmail(infor[id][name].value)
                if(!infor[id][name].invalid){
                    infor[id][name].msg = ``
                }else{
                    infor[id][name].msg = `Invalid phone email address`
                }
            }else if(name.indexOf('link')>-1){
                infor[id][name].value = value.replace(/\s/g, '')
                infor[id][name].invalid = !isValidWebsiteLink(infor[id][name].value)
                if(!infor[id][name].invalid){
                    infor[id][name].msg = ``
                }else{
                    infor[id][name].msg = `Invalid website link`
                }
            }else{
                infor[id][name].invalid = false
                infor[id][name].msg = ``
            }
        }
        setCompanyInfo(infor)
    }
    async function handleUpdateWebinf(companyInfo, companyInfoInit){
        if(validateData(companyInfo)){
            const newData = companyInfoInit.map((office,index)=>{
                const newKey = {}
                Object.keys(office).forEach((key)=>{
                    newKey[key] = key == 'id' && index == 0 ? 'head_office' :  key == 'id' && index == 1 ? 'vt_office': companyInfo[index]?.[key]?.value || null
                    
                })
                return newKey
            })
            const response= await updateWebinf(newData[0])
            Swal.fire(
                response.results.status,
                response.results.msg,
                response.results.status
            )
            updateWebinf(newData[1])
        }
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
                       companyInfo[0] && Object?.keys(companyInfo[0])?.map((key)=>{
                            let label = key
                            switch (key) {
                                case 'link1':
                                    label = 'Facebook'
                                    break;
                                case 'link2':
                                    label = 'Youtube'
                                    break;
                                case 'link3':
                                    label = 'Linkedin'
                                    break;
                            
                                default:
                                    label = key
                                    break;
                            }
                            return(
                                <Grid item md={6} p={1} key={key}>
                                    <FormControl required={true} fullWidth={true}>
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            label={label}
                                            name={"head_"+key}
                                            error={companyInfo?.[0]?.[key]?.invalid}
                                            helperText={companyInfo?.[0]?.[key]?.msg}
                                            onChange={(e)=>{handleChange(e.target.value,0,key)}}
                                            value={companyInfo?.[0]?.[key]?.value}
                                            defaultValue={companyInfo?.[0]?.[key]?.value}
                                        />
                                    </FormControl>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                
            </Box>
            <Box
                sx={{display: 'flex', justifyContent:'flex-end'}}
            >
                <Button variant="contained" onClick={()=>{handleUpdateWebinf(companyInfo, companyInfoInit)}}>Update</Button>
            </Box>
        </Box>
      </Container>
    </>
  );
}



const validateData = (data) => {
    let check = true
    data.forEach((dt)=>{
        Object.keys(dt).forEach(key => {
            if(dt[key].invalid ){
                check = false
            }
        });
   })
   return check
};

const isValidPhoneNumber = (number) => {
    return /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/.test(number);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidWebsiteLink = (websiteLink) => {
  const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return websiteRegex.test(websiteLink);
};