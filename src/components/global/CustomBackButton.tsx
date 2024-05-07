import React from 'react';
import { Button } from '@mui/material';
import {useTheme} from "@mui/material/styles";

interface CustomBackButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomBackButton: React.FC<CustomBackButtonProps> = ({ onClick }) => {
    const theme = useTheme()

    return (
        <Button
            onClick={onClick}
            style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                padding: 0,
                background: 'none',
            }}
            disableRipple
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="none"
                viewBox="0 0 50 50"
                style={{
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease', // Добавляем плавный переход для цвета границы
                    border: '2px solid transparent',
                    borderRadius: '12px',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = theme.palette.primary.main
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                }}
                onClick={(e) => {
                    e.currentTarget.style.borderColor = theme.palette.secondary.main;
                }}
            >
                <rect width="50" height="50" fill={theme.palette.background.alternate} rx="12"/>
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="m28.5 32-7-7 7-7"/>
            </svg>
        </Button>
    );
};

export default CustomBackButton;
