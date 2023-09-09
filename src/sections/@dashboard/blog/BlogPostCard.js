import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import { Link } from "react-router-dom";
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{borderRadius:'0px', boxShadow:'unset'}}>
      <Link
        to={"/dashboard/news/id1"}
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
                    backgroundImage: 'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%), url(https://newtecons.vn/wp-content/uploads/2023/08/MNP_0905-scaled.jpg)',
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
                        06 Tháng 08, 2023
                    </Typography>
                    <Typography 
                        variant="h6"
                        sx={{
                            color: 'white',
                            textDecoration:'none !important',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                        }}
                    >
                        NEWTECONS TỔ CHỨC CHUỖI HOẠT ĐỘNG CHÀO MỪNG NGÀY TRUYỀN THỐNG 2023
                    </Typography>
            </Box>
        </Box>
      </Link>
    </Card>
    </Grid>
  );
}
