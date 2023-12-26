
import { Box, Card, Grid, Avatar, Typography } from '@mui/material';
import { Link } from "react-router-dom";
// utils
import { fDate } from '../../../utils/formatTime';

import StarsIcon from '@mui/icons-material/Stars';


export default function BlogPostCard({ id,type,post }) {
  const { image, name, cre_date, type_id, key_post } = post
  const categories = {
    '1': {name: 'Hoạt động công ty', value:'1'},
    '2': {name: 'Đảng Đoàn thể', value:'2'},
    '3': {name: 'Pháp luật môi trường', value:'3'},
    '5': {name: 'Thông báo', value:'5'},
    '6': {name: 'Báo cáo', value:'6'},
    '4': {name: 'Tin tức khác', value:'4'},
    '7': {name: 'Dự án đầu tư', value:'7'},
    '8': {name: 'Hợp tác trong nước', value:'8'},
    '9': {name: 'Hợp tác nước ngoài', value:'9'}
}
  return (
    <Grid item xs={12} sm={6} md={3} sx={{position:'relative'}}>
        <Card sx={{borderRadius:'0px', boxShadow:'unset'}}>
            <Link
                to={`/dashboard/${type}/${id}`}
            >
                <Box position='relative'>
                    <Box
                        sx={{
                            width: '100%',
                            height: {
                                xs: '300px',
                                md: '300px',
                                lg: '250px'
                            },
                            // backgroundImage: `linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%), url("http://localhost:3001/read_image/${image}")`,
                            
                            backgroundImage: `linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%), url("http://localhost:3001/read_image/${image}")`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            transition: 'transform .2s linear', // Define the transition outside the &:hover selector
                            '&:hover': {
                                transform: 'scale(1.2)'
                            }
                        }}
                    />
                    <Box
                        position='absolute'
                        bottom={0}
                        sx={{
                            p:2,
                            width:'100%'
                        }}
                    >
                        <Typography 
                            sx={{
                                color: 'white',
                                fontSize:'13px',
                                textDecoration:'none !important'
                            }}
                        >
                            {`${fDate(cre_date)} - ${categories[String(type_id)]?.name}`} 

                        </Typography>
                        <Typography 
                            variant="h6"
                            sx={{
                                color: 'white',
                                textDecoration:'none !important',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', 
                                textTransform: 'uppercase'
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </Card>
        {
            key_post == 1 &&
            <Box
                sx={{
                    position: 'absolute',
                    top: '15px',
                    right: '-10px'
                }}
            >
                <StarsIcon style={{color: '#ffd212'}}/> 
            </Box>
        }
    </Grid>
  );
}
