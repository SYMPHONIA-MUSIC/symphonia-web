import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Sidebar from "../components/artist/Sidebar";
import MainContent from "../components/artist/MainContent";
import NavBar from "../components/artist/Navbar";
import {useTheme} from "@mui/material/styles";
import {Theme, useMediaQuery} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import MusicViewComponent from "../components/artist/MusicViewComponent";
import NewsContent from "../components/artist/NewsContent";
import AccountContent from "../components/artist/AccountContent";
import ContentWrapper from "../components/artist/ContentWrapper";
import ReleaseComponent from "../components/artist/ReleaseComponent";

const drawerWidth = 280;

export interface ContentProps {
    theme: Theme;
}

const ArtistPanelPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar width={drawerWidth} open={open} onClose={handleDrawerClose} isMobile={isMobile} />
            <Box sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}px)`, height: '100vh',
                overflow: 'hidden' }}>
                <NavBar drawerWidth={drawerWidth} isMobile={isMobile} onDrawerOpen={handleDrawerOpen} />
                <ContentWrapper>
                    <Routes>
                        <Route path="" element={<MainContent />} />
                        <Route path="music" element={<MusicViewComponent />} />
                        <Route path="music/release" element={<ReleaseComponent />} />
                        <Route path="news" element={<NewsContent />} />
                        <Route path="account" element={<AccountContent theme={theme} />} />
                    </Routes>
                </ContentWrapper>
            </Box>
        </Box>
    );
};

export default ArtistPanelPage;
