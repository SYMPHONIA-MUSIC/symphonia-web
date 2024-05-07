import React from "react";
import {Box, Typography} from "@mui/material";

const NewsContent: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3, pt: 8 }}>
            <Typography paragraph>
                NEWS PANEL
            </Typography>
        </Box>
    );
};

export default NewsContent;