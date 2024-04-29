import React from 'react';
import { TextField, TextFieldProps, useTheme } from '@mui/material';


const StyledTextField: React.FC<TextFieldProps> = (props) => {
    const theme = useTheme();

    return (
        <TextField
            {...props}
            InputLabelProps={{
                style: { color: theme.palette.text.primary },
            }}
            sx={{
                '& label.Mui-focused': {
                    color: theme.palette.primary.main,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: theme.palette.primary.main,
                },
                '& .MuiOutlinedInput-root': {
                    transition: 'border-color 0.3s ease',
                    '& fieldset': {
                        borderColor: theme.palette.text.primary,
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '3px',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '3px',
                    },
                    '& input': {
                        color: theme.palette.text.primary,
                        '&:hover': {
                            color: theme.palette.primary.main,
                        },
                        transition: 'color 0.3s ease',
                    },
                },
            }}
        />
    );
};

export default StyledTextField;