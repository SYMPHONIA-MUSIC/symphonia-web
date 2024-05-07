import React from 'react';
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {useActiveMenuItem} from "../../../hooks/useActiveMenuItem";
import {mainMenuItems, mineMusic} from "../../../types/menuUserItems";
import MenuItemComponent from "../../artist/MenuItem";

interface SidebarUserLeftProps {
    width: number;
    open: boolean;
    onClose: () => void;
    isMobile: boolean;
}

const Sidebar: React.FC<SidebarUserLeftProps> = ({ width, open, onClose, isMobile }) => {
    const theme = useTheme();
    const activePath = useActiveMenuItem();

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={open}
            onClose={onClose}
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box', backgroundColor: theme.palette.background.alternate },
            }}
        >
            <List sx={{
                '& .MuiListItem-root': {
                    color: theme.palette.text.primary,
                },
                '& .MuiListItemIcon-root': {
                    color: theme.palette.text.primary,
                },
            }}>
                <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
                    <Box>
                        <img src="/logo/symphonia-logo.svg" alt="Logo" style={{width: '140px', paddingTop: '5px'}}/>
                    </Box>
                </ListItem>
                {mainMenuItems.map((item, index) => (
                    <MenuItemComponent key={index} {...item} active={item.path === activePath} theme={theme} />
                ))}
                <ListItem>
                    <Typography variant="h6" sx={{ padding: '10px 0' }}>MOJE HUDBA</Typography>
                </ListItem>
                {mineMusic.map((item, index) => (
                    <MenuItemComponent key={index} {...item} active={item.path === activePath} theme={theme} />
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
