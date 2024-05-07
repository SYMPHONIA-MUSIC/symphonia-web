import { Checkbox } from '@mui/material';
import { styled } from '@mui/system';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.grey[400],
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));

export default CustomCheckbox;
