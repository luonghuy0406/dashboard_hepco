
import { Autocomplete, Card, TextField } from '@mui/material';

const categorys = ['line 1','line 2','line 3','line 4','line 5']

export default function ProductSearch() {
    return (
        <Card sx={{ p: 2, display: 'flex'}}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={categorys}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                <TextField
                {...params}
                    variant="outlined" 
                    label="Category"
                    // placeholder="Filter by category"
                />
                )}
                sx={{ width: '30%', px: 2 }}
            />
            <TextField
            variant="outlined" 
            label="Search product"
            fullWidth
            placeholder="Search product by name"
            sx={{ width: '70%' }}
            />
        </Card>
)};

