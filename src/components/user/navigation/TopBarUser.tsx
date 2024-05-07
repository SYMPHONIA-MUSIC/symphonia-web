import React, { useState } from 'react';
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Popover, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import {FiberManualRecord, Settings, VerifiedUser} from "@mui/icons-material";
import CustomNotificationButton from "../../global/CustomNotificationButton";
import CustomBackButton from "../../global/CustomBackButton";
import SearchInput from "../../global/SearchInput";
import LogoutIcon from "@mui/icons-material/Logout";


interface TopBarUserProps {
    leftWidth: number;
    rightWidth: number;
    openRight: boolean
    isMobile: boolean;
}

const TopBarUser: React.FC<TopBarUserProps> = ({ leftWidth, rightWidth, openRight, isMobile }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const marginRightCalc = openRight ? `calc(${rightWidth}px / 8)` : 0;

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log("Logged out");
        handleProfileMenuClose();
    };


    const controlContainerStyle = {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: openRight ? `calc(${rightWidth}px - ${marginRightCalc} )` : 0,
        paddingLeft: openRight ? `${rightWidth / 2}px` : 0,
    };

    return (
        <AppBar position="fixed" sx={{
            width: isMobile ? '100%' : `calc(100% - ${leftWidth}px)`,
            ml: isMobile ? 0 : `${leftWidth}px`,
            backgroundColor: 'transparent',
            mt: 1
        }}
                elevation={0}>
            <Toolbar>
                <CustomBackButton onClick={() => {}}/>

                <Box sx={controlContainerStyle}>
                    <SearchInput />
                    <CustomNotificationButton />
                </Box>

                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    disableRipple={true}
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        marginRight: openRight ? marginRightCalc : 0
                    }}
                >
                    <Avatar src="/mocks/stein27.jpg" alt="User" sx={{ mr: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2, }}>
                        <Typography variant="caption" display="block" gutterBottom sx={{ fontWeight: 'bold', marginRight: '4px' }}>
                            Alul___
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row',  alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                Kritik
                            </Typography>
                            <VerifiedUser fontSize="small" />
                        </Box>
                    </Box>
                    <KeyboardArrowDownIcon />
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
                    sx={{ padding: '16px' }}
                >
                    <Box display="flex" alignItems="center" sx={{ padding: '8px', backgroundColor: theme.palette.background.alternate }}>
                        <Button onClick={handleLogout} sx={{ padding: '8px', color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
                            <LogoutIcon sx={{ marginRight: '8px' }} />
                            <Typography variant="body2">Odhlásit se z účtu</Typography>
                        </Button>
                    </Box>
                </Popover>
            </Toolbar>
        </AppBar>
    );
};

export default TopBarUser;
