import React from 'react';
import { styled } from '@mui/material/styles';
import {Box, Theme} from "@mui/material";

interface LogoProps {
    src: string;
    alt: string;
    theme: Theme
    isMobile?: boolean;
}

const LogoBackgroundStyled = styled('img')(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(10)
}));

const LogoBackground: React.FC<LogoProps> = ({ src, alt, theme, isMobile }) => {
    return (
        <>
        {isMobile ? (
                <LogoBackgroundStyled src="/logo/symphonia-logo.svg" alt="Logo" />
            ) : (
                <Box position="absolute" top={theme.spacing(2)} right={theme.spacing(2)}>
                    <LogoBackgroundStyled src="/logo/symphonia-logo.svg" alt="Logo" theme={theme} />
                </Box>
        )}
        </>
    )
};

export default LogoBackground;