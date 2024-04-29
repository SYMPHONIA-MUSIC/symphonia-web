import React from 'react';
import { styled } from "@mui/material/styles";

const StyledBackground = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        width: 'calc(100% + 20px)',
        height: 'calc(100% + 20px)',
        backgroundImage: 'url(/background/password.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
    }
}));

const Background: React.FC = () => {
    return <StyledBackground />;
}

export default Background;
