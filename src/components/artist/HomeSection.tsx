import React from 'react';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";

const HomeSection: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography paragraph>
                Welcome to your artist dashboard. Here you can manage all your artistic works, profile, and settings.
            </Typography>
        </Box>
    );
};

export default HomeSection;