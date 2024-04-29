import React from 'react';
import { Button } from '@mui/material';

interface CustomBackButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomBackButton: React.FC<CustomBackButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick} style={{ position: 'absolute', top: 10, left: 10, width: '50px', height: '50px', borderRadius: '12px',  }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 50 50">
                <rect width="50" height="50" fill="#292929" rx="12"/>
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="m28.5 32-7-7 7-7"/>
            </svg>
        </Button>
    );
};

export default CustomBackButton;