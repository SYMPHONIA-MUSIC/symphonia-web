import React, {useState} from 'react';
import {AppBar, Avatar, Box, Button, IconButton, Popover, Toolbar, Typography} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import {useTheme} from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';

interface NavBarProps {
    drawerWidth: number;
    isMobile: boolean;
    onDrawerOpen: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ drawerWidth, isMobile, onDrawerOpen }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Здесь реализуйте логику выхода из аккаунта
        console.log("Выход из аккаунта");
        handleProfileMenuClose();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
                ml: isMobile ? 0 : `${drawerWidth}px`,
                backgroundColor: theme.palette.background.alternate }}
            elevation={0}
        >
            <Toolbar>

                {isMobile && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onDrawerOpen}
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <div style={{ marginLeft: 'auto' }}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <Avatar src="/mocks/stein27.jpg" alt="User" />
                        <ArrowDropDownIcon />
                    </IconButton>
                    <Popover
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                        sx={{ padding: '16px'}}
                    >
                        <Box display="flex" alignItems="center" sx={{ padding: '8px', backgroundColor: theme.palette.background.alternate }}>
                            <Button onClick={handleLogout} sx={{ padding: '8px', color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
                                <LogoutIcon sx={{ marginRight: '8px' }} />
                                <Typography variant="body2">Odhlásit se z účtu</Typography>
                            </Button>
                        </Box>
                    </Popover>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;