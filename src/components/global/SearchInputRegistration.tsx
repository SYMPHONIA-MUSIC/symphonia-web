import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInputRegistration: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
                fullWidth
                placeholder="Zadej jméno umělce"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiInputBase-input': {
                        padding: '10px 12px',
                    },
                    '& .MuiInputAdornment-root': {
                        marginRight: '8px',
                    },
                }}
            />
        </Box>
    );
};

export default SearchInputRegistration;
