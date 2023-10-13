import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {  Box, Button, Container, Stack, Typography } from '@mui/material';

import Iconify from '../components/iconify';
import {  ProductsTable, ProductFilterSidebar } from '../sections/@dashboard/products';

import { getListProducts } from 'src/api';
import { Link } from 'react-router-dom';

const productGroup = {
  '1': 'Chocking Compound',
  '2': 'Auxiliary Machinery',
  '3': 'Viega Pipe & Fittings',
  '4': 'Viton/FKM rubber packing sheet'
}


export default function ProductsPage() {
  const [productList, setProductList] = useState([])
  const [productListTemp, setProductListTemp] = useState([])
  const [update,setUpdate] = useState(false)
  useEffect(()=>{
    async function fetchData() {
        const productLists = await getListProducts()
        if(productLists.results){
          setProductList(productLists.results)
          setProductListTemp(productLists.results)
        }
    }
    fetchData();
    
},[update])

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | MEKONG MARINE SUPPLY CO., LTD </title>
      </Helmet>

      <Container maxWidth={'xl'}>
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Link to="/dashboard/products/add">
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  New product
                </Button>
            </Link>
          </Stack>
          <Stack spacing={3} mb={5}>
            <ProductFilterSidebar products={productList} setProductListTemp={setProductListTemp}/>
          </Stack>
        </Box>
        <ProductsTable
            items={productListTemp}
            productGroup={productGroup}
            setUpdate={setUpdate}
            update={update}
          />
      </Container>
    </>
  );
}

