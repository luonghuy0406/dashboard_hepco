import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Collapse,
  IconButton,
  CardMedia,
  CardContent,
  TextField,
  Button,
  Divider
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditorComponent from './EditorComponent';

export default function ProductsTable(props){
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <></>
                </TableCell>
                <TableCell component="th" scope="row">Product name</TableCell>
                <TableCell>Product image</TableCell>
                <TableCell>Product description</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ borderLeft: (open ? "2px solid #6366f1" : "unset") }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 100 }}
              image={row.images.main}
              alt={row.name}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="label">
                {row.name}
              </Typography>
            </CardContent>
          </Box>
        </TableCell>
        <TableCell>
          image
        </TableCell>
        <TableCell>
          {row.description}
        </TableCell>
        <TableCell>
          {row.createdAt}
        </TableCell>
      </TableRow>
      <TableRow style={{ borderLeft: (open ? "2px solid #6366f1" : "unset") }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3}}>
              <Typography variant="h6" gutterBottom component="div">
                Basic details
              </Typography>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 2},
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Product Name" variant="outlined" defaultValue={row.name}/>
                <EditorComponent/>
              </Box>
              <Divider/>
              <Stack sx={{ m: 2 }} spacing={2} direction="row" justifyContent="space-between">
                <Stack spacing={2} direction="row">
                  <Button variant="contained">Update</Button>
                  <Button variant="text" style={{color:"gray"}}>Cancel</Button>
                </Stack>
                <Button variant="text" color="error">Delete product</Button>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}