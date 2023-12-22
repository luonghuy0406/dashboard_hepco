import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { login } from 'src/api';


export default function LoginForm() {
  const navigate = useNavigate();

  const  [userid,setUserId] = useState('')
  const  [pw,setPw] = useState('')
  const [error,setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(userid,pw)
      if(result.results){
        setError(result.results)
      }else{
        navigate('/', { replace: true });
        setError('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        <TextField error={error.length > 0} helperText={error} name="email" label="Tên đăng nhập" onChange={(e)=>{setUserId(e.target.value)}}/>

        <TextField
          error={error.length > 0} helperText={error}
          name="password"
          label="Mật khẩu"
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
        Đăng nhập
      </LoadingButton>
    </>
  );
}
