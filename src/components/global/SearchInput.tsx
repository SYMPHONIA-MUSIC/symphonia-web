import React, { useState } from 'react';
import { Box, InputBase, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';  // Импорт иконки поиска
import { useTheme } from '@mui/material/styles';

const SearchInput: React.FC = () => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.length > 1) {
            setResults(["Result 1", "Result 2", "Result 3"].filter(item => item.toLowerCase().includes(query.toLowerCase())));
        } else {
            setResults([]);
        }
    };

    return (
        <Box sx={{ width: 400, backgroundColor: theme.palette.background.alternate, padding: '6px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', height: '50px' }}>
            <InputBase
                sx={{
                    width: '100%',
                    color: 'white',
                    '&::placeholder': {
                        color: theme.palette.text.primary
                    }
                }}
                placeholder="Vyhledávání hudby, umělců, alb,..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                startAdornment={(
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                )}
            />
            {results.length > 0 && (
                <List sx={{ width: '100%', maxHeight: 300, bgcolor: 'background.paper', position: 'absolute', overflow: 'auto' }}>
                    {results.map((result, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={result} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SearchInput;
