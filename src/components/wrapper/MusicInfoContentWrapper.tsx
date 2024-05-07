import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";

interface ContentWrapperProps {
    children: React.ReactNode;
}

const MusicInfoContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            flexGrow: 1,
            height: '100%',
            width: 'calc(100% - 170px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
    }}>
    {children}
    </Box>
);
};

export default MusicInfoContentWrapper;