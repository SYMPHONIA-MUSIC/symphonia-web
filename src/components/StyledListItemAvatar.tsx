import { ListItemAvatar } from '@mui/material';
import { styled } from '@mui/system';

const StyledListItemAvatar = styled(ListItemAvatar)({
    '& img': {
        width: '50px',
        height: '50px',
        borderRadius: '10%',
        objectFit: 'cover',
    },
    marginRight: '20px'
});

export default StyledListItemAvatar;
