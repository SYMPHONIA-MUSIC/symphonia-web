import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
    },
}));

export default StyledListItem;
