import { List } from '@mui/material';
import { styled } from '@mui/system';

const StyledList = styled(List)(({ theme }) => ({
    width: '480px',
    maxHeight: '200px',
    overflow: 'auto',
    direction: 'rtl',
    '&::-webkit-scrollbar': {
        width: '0.2em',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
    },
    '& .MuiListItem-root': {
        direction: 'ltr',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            color: theme.palette.text.secondary,
        },
    },
}));

export default StyledList;
