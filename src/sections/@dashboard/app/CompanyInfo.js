import React from 'react'
import {  Typography, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button, Collapse, Stack, Paper, styled, Divider, TextField, makeStyles, Grid, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCompanyInfo } from 'src/api';

export default function CompanyInfo() {
    const [companyInfo,setCompanyInfo] = useState([])
    const [update,setUpdate] = useState(false)
    const [open,setOpen] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            const companyInfo = await getCompanyInfo()
            if(companyInfo.results){
                setCompanyInfo(companyInfo.results)
            }
        }
        fetchData();
        
    },[update])
    function handleChange(value,id,name){
        let infor = {...companyInfo}
        infor[id][name] = value
        setCompanyInfo(infor)
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
                <form>
                    <Grid container>
                        <Grid item md={6} p={1}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label="Address EN"
                                    name={"head_address_en"}
                                    // error
                                    // helperText="Incorrect entry."
                                    onChange={(e)=>{handleChange(e.target.value,0,'adress_en')}}
                                    value={companyInfo?.[0]?.adress_en}
                                    defaultValue={companyInfo?.[0]?.adress_en}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={6} p={1}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    name={"head_address"}
                                    label="Address VI"
                                    value={companyInfo?.[0]?.adress}
                                    onChange={(e)=>{handleChange(e.target.value,0,'adress')}}
                                    // onChange={handleChange}
                                    // value={props.family}
                                />
                            </FormControl>
                        </Grid>
                        
                        <Grid item md={6} p={1}>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    name={"head_phone"}
                                    label="Phone number"
                                    value={companyInfo?.[0]?.phone_num}
                                    onChange={(e)=>{handleChange(e.target.value,0,'phone_num')}}
                                    // onChange={handleChange}
                                    // value={props.generation}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={6} p={1}>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label="Email"
                                    name="head_email"
                                    value={companyInfo?.[0]?.email}
                                    onChange={(e)=>{handleChange(e.target.value,0,'email')}}
                                    // onChange={handleChange}
                                    // value={props.generation}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} p={1}>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label="Facebook"
                                    name="head_fb_link"
                                    value={companyInfo?.[0]?.link1}
                                    onChange={(e)=>{handleChange(e.target.value,0,'link1')}}
                                    // onChange={handleChange}
                                    // value={props.generation}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} p={1}>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label="Youtube"
                                    name="head_yt_link"
                                    value={companyInfo?.[0]?.link2}                                
                                    onChange={(e)=>{handleChange(e.target.value,0,'link2')}}
                                    // onChange={handleChange}
                                    // value={props.generation}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} p={1}>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label="Linkedin"
                                    name="head_lk_link"
                                    value={companyInfo?.[0]?.link3}
                                    onChange={(e)=>{handleChange(e.target.value,0,'link3')}}
                                    // onChange={handleChange}
                                    // value={props.generation}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
                <br />
                <Typography component="h3" variant="h5" gutterBottom>
                    Vung Tau Office
                </Typography>
                <Divider />
                <br/>
                <form>
                    <Grid container>
                        <Grid item md={6} p={1}>
                            <FormControl required={true} fullWidth={true}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    label="Address EN"
                                    value={companyInfo?.[1]?.adress_en}
                                    onChange={(e)=>{handleChange(e.target.value,1,'adress_en')}}
                                    // onChange={handleChange}
                                    // value={props.form_title ? props.form_title : props.family}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={6} p={1}>
                            <FormControl required={true} fullWidth={true}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                label="Address VI"
                                value={companyInfo?.[1]?.adress}
                                onChange={(e)=>{handleChange(e.target.value,1,'adress')}}
                                // onChange={handleChange}
                                // value={props.family}
                            />
                            </FormControl>
                        </Grid>
                        
                        <Grid item md={6} p={1}>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                required
                                label="Phone number"
                                value={companyInfo?.[1]?.phone_num}
                                onChange={(e)=>{handleChange(e.target.value,1,'phone_num')}}
                                // onChange={handleChange}
                                // value={props.generation}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box
                sx={{display: 'flex', justifyContent:'flex-end'}}
            >
                <Button variant="contained">Update</Button>
            </Box>
            </Collapse>
        </Box>
    </>
    
  )
}
