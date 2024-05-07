import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomNotificationButton = () => {
    const theme = useTheme();
    const [hasNotification, setHasNotification] = useState(true); // Simulates notification existence

    return (
        <Button
            style={{
                // position: 'relative',
                // top: 10,
                // right: 10,
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                padding: 0,
                background: 'none',
            }}
            disableRipple
        >
            <div style={{ position: 'relative',width: '53.2px',
                height: '53.2px',  }}>
                {hasNotification && (
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: theme.palette.secondary.main,
                    }} />
                )}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="none"
                    viewBox="0 0 50 50"
                    style={{
                        cursor: 'pointer',
                        transition: 'border-color 0.3s ease',
                        border: '2px solid transparent',
                        borderRadius: '12px',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = theme.palette.primary.main;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onClick={() => {
                        setHasNotification(false); // Hide notification dot on click
                    }}
                >
                    <rect width="50" height="50" fill={theme.palette.background.alternate} rx="12" />
                    <path fill="#fff" d="m32.34 27.49-1-1.66c-.21-.37-.4-1.07-.4-1.48v-2.53a5.91 5.91 0 0 0-3.37-5.33A2.926 2.926 0 0 0 24.99 15c-1.09 0-2.07.59-2.59 1.52-1.95.97-3.3 2.98-3.3 5.3v2.53c0 .41-.19 1.11-.4 1.47l-1.01 1.67c-.4.67-.49 1.41-.24 2.09.24.67.81 1.19 1.55 1.44 1.94.66 3.98.98 6.02.98 2.04 0 4.08-.32 6.02-.97.7-.23 1.24-.76 1.5-1.45s.19-1.45-.2-2.09Zm-4.51 5.52A3.014 3.014 0 0 1 25 35c-.79 0-1.57-.32-2.12-.89-.32-.3-.56-.7-.7-1.11.13.02.26.03.4.05.23.03.47.06.71.08.57.05 1.15.08 1.73.08.57 0 1.14-.03 1.7-.08.21-.02.42-.03.62-.06l.49-.06Z"/>
                </svg>
            </div>
        </Button>
    );
};

export default CustomNotificationButton;
