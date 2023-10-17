import React from 'react'
import {  Typography, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button, Collapse, Stack, Paper, styled, Divider, TextField, makeStyles, Grid, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCompanyInfo, updateWebinf } from 'src/api';

export default function CompanyInfo() {
    const [companyInfoInit,setCompanyInfoInit] = useState([])
    const [companyInfo,setCompanyInfo] = useState([])
    const [open,setOpen] = useState(false)
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
            newData.forEach((data)=>{
                updateWebinf(data)
            })
        }
    }
  return (
    <>
        <Stack direction="row" spacing={2} mb={3}>
            
            <Typography fontWeight={'bold'} variant="h4">Company Infomations</Typography>
            <Button variant="text" onClick={()=>{setOpen(!open)}}>{open ? 'Hide':'Show'}</Button>
        </Stack>
        <Box sx={{ minWidth: 800 }}>
            
            <Collapse in={open}>
            
            <Box sx={{ width: '100%' }}>
                <Typography component="h3" variant="h5" gutterBottom>
                    Head Office
                </Typography>
                <Divider />
                <br/>
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
                                <Grid item md={6} p={1}>
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
                
                <br />
                <Typography component="h3" variant="h5" gutterBottom>
                    Vung Tau Office
                </Typography>
                <Divider />
                <br/>
                <form>
                <Grid container>
                {
                       companyInfo[0] && Object?.keys(companyInfo[1])?.map((key)=>{
                            let label = key
                            return(
                                <Grid key={key} item md={6} p={1}>
                                    <FormControl required={true} fullWidth={true}>
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            label={label}
                                            name={"head_"+key}
                                            error={companyInfo?.[1]?.[key]?.invalid}
                                            helperText={companyInfo?.[1]?.[key]?.msg}
                                            onChange={(e)=>{handleChange(e.target.value,1,key)}}
                                            value={companyInfo?.[1]?.[key]?.value}
                                            defaultValue={companyInfo?.[1]?.[key]?.value}
                                        />
                                    </FormControl>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                </form>
            </Box>
            <Box
                sx={{display: 'flex', justifyContent:'flex-end'}}
            >
                <Button variant="contained" onClick={()=>{handleUpdateWebinf(companyInfo, companyInfoInit)}}>Update</Button>
            </Box>
            </Collapse>
        </Box>
    </>
    
  )
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