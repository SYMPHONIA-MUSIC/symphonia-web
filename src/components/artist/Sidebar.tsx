// Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Sidebar: React.FC = () => {
    return (
        <Drawer variant="permanent">
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MusicNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Artists" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
