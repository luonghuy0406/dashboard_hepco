import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Box, Table, TableHead, TableRow, TableCell, CardMedia, TableBody, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from 'src/sections/@dashboard/app/Banner';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  
  return (
    <>
      <Helmet>
        <title> Home | MEKONG MARINE SUPPLY CO., LTD </title>
      </Helmet>

      <Container >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Home
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card 
              sx={{
                py: 5,
                px:3,
                boxShadow: 0
              }}
            >
              <Banner/>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card 
              sx={{
                py: 5,
                px:3,
                boxShadow: 0
              }}
            >
              <Typography variant="h4">About us</Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card 
              sx={{
                py: 5,
                px:3,
                boxShadow: 0
              }}
            >
              <Typography variant="h4">Company infomations</Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card 
              sx={{
                py: 5,
                px:3,
                boxShadow: 0
              }}
            >
              <Typography variant="h4">Partner</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
