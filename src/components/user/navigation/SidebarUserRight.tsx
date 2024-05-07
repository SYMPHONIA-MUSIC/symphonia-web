import React from 'react';
import { Drawer, Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";

interface SidebarUserRightProps {
    width: number;
    open: boolean;
}

const SidebarUserRight: React.FC<SidebarUserRightProps> = ({ width, open }) => {
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            variant="permanent"
            open={open}
            sx={{
                width: 100,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                    backgroundColor: theme.palette.background.alternate,
                    zIndex: theme.zIndex.appBar - 1,
                    display: open ? 'block' : 'none',
                }
            }}
        >
            <Box sx={{ padding: theme.spacing(2) }}>
                {/* Содержимое SidebarUserRight */}
            </Box>
        </Drawer>
    );
};

export default SidebarUserRight;
