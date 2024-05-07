import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

interface StyledListItemGenreProps {
    backgroundImage: string;
}

const StyledListItemGenre = styled(ListItem)<StyledListItemGenreProps>(({ theme, backgroundImage }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
    },
    '& .MuiListItemText-primary': {
        fontSize: '1.25rem', // Increase the font size
        fontWeight: 'bold'
    }
}));

export default StyledListItemGenre;
