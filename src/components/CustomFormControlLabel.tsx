import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    backdropFilter: 'blur(10px)',
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1, 0),
    '& .MuiFormControlLabel-label': {
        marginRight: 'auto',
    },
}));

export default CustomFormControlLabel;
