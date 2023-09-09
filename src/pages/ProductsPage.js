import { Helmet } from 'react-helmet-async';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { subDays, subHours } from 'date-fns';
// import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';

import Iconify from '../components/iconify';
import { ProductSort, ProductsTable, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

import PRODUCTS from '../_mock/products';

const now = new Date();

const useProducts = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(PRODUCTS, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useProductIds = (products) => {
  return useMemo(
    () => {
      return products.map((product) => product.id);
    },
    [products]
  );
};
export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const products = useProducts(page, rowsPerPage);
  const productsIds = useProductIds(products);
  const productsSelection = useSelection(productsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | MEKONG MARINE SUPPLY CO., LTD </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
              Products
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New product
          </Button>
        </Stack>
        <Stack spacing={3} mb={5}>
          <ProductFilterSidebar products={PRODUCTS}/>
        </Stack>
        <ProductsTable
            count={PRODUCTS.length}
            items={products}
            onDeselectAll={productsSelection.handleDeselectAll}
            onDeselectOne={productsSelection.handleDeselectOne}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onSelectAll={productsSelection.handleSelectAll}
            onSelectOne={productsSelection.handleSelectOne}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={productsSelection.selected}
          />
      </Container>
    </>
  );
}


function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
const useSelection = (items = []) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [items]);

  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item) => {
    setSelected((prevState) => [...prevState, item]);
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, []);

  const handleDeselectOne = useCallback((item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, []);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected
  };
};