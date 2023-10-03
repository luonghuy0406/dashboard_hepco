import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import setAuthToken from 'src/setAuthToken';

// ----------------------------------------------------------------------
const login = (id_user, pw) => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({ id_user, pw });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

return fetch("http://localhost:3001/account/login", requestOptions)
  .then(response => response.text())
  .then(result => result)
  .catch(error => console.log('error', error));
};

export default function LoginForm() {
  const navigate = useNavigate();

  const  [userid,setUserId] = useState('')
  const  [pw,setPw] = useState('')
  const [error,setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(userid, pw);
      const result = JSON.parse(data)
      if(result.status){
        const token = JSON.parse(data).token
        if(token){
          localStorage.setItem('token', token);
          // Set the token in axios headers
          setAuthToken(token);
          // Redirect to the dashboard page
          navigate('/', { replace: true });
        }
        setError('')
      }else{
        setError(result.results)
      }
      
    } catch (error) {
      console.log(error);
      // Handle login error
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        <Typography>{error}</Typography>
        <TextField name="email" label="Email address" onChange={(e)=>{setUserId(e.target.value)}}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e)=>{setPw(e.target.value)}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </>
  );
}
