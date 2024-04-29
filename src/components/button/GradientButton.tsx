import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientButton = styled((props: ButtonProps) => <Button {...props} />)({
    background: 'linear-gradient(90deg, #855B9A 0%, #507F9E 100%)',
    border: 0,
    borderRadius: '20px',
    color: 'white',
    height: 48,
    padding: '0 30px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    fontSize: 25,
    '&:hover': {
        backgroundColor: '#855B9A',
        boxShadow: 'none',
        transform: 'scale(1.05)',
    },
});


export default GradientButton;
