import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Artist Panel
                </Typography>
                <div>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </div>
                <div>
                    <SearchIcon />
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
