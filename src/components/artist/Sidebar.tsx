import React from 'react';
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {useActiveMenuItem} from "../../hooks/useActiveMenuItem";
import {menuItems} from "../../types/menuItems";
import MenuItemComponent from "./MenuItem";

interface SidebarProps {
    width: number;
    open: boolean;
    onClose: () => void;
    isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ width, open, onClose, isMobile }) => {
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
                <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="/logo/artist-logo.svg" alt="Logo" style={{width: '175px'}}/>
                </ListItem>
                {menuItems.map((item, index) => (
                    <MenuItemComponent key={index} {...item} active={item.path === activePath} theme={theme} />
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
