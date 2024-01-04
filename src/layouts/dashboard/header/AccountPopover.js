import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import Swal from 'sweetalert2';
import { updateUser } from 'src/api';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const logout  = ()=>{
    setOpen(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    // Redirect to the dashboard page
    navigate('/', { replace: true });
  }
  const handleChangePass = () => {
    setOpen(null)
    Swal.fire({
      title: "Nhập mật khẩu mới",
      input: "text",
      inputAutoFocus: true,
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      showLoaderOnConfirm: true,
      preConfirm: async (pw) => {
        try {
          const response = await updateUser(pw)
          return response;
        } catch (error) {
          Swal.showValidationMessage(`
            Update lỗi: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
          Swal.fire({
            icon: `${result.value.result.status}`,
            title: `${result.value.result.status}`,
            text: `Tự động logout sau 5s, hãy đăng nhập lại`,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
              logout()
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              logout()
            }
          });
      }
    });
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        
        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
        <MenuItem onClick={handleChangePass} sx={{ m: 1 }}>
          Đổi mật khẩu
        </MenuItem>
      </Popover>
    </>
  );
}
