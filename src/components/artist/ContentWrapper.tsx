import React from 'react';
import {Box, SxProps, Theme} from '@mui/material';
import { useTheme } from "@mui/material/styles";

interface ContentWrapperProps {
    children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            flexGrow: 1,
            p: 3,
            pt: 8,
            height: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {children}
        </Box>
    );
};

export default ContentWrapper;