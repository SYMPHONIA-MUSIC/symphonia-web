// components/MainContent.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const MainContent: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3, pt: 8 }}>
            <Typography paragraph>
                MAIN PAGE PANEL
            </Typography>
        </Box>
    );
};

export default MainContent;
