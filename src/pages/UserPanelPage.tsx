import React, {useState} from 'react';
import {Box, Theme, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import SidebarUserLeft from "../components/user/navigation/SidebarUserLeft";
import TopBarUser from "../components/user/navigation/TopBarUser";
import SidebarUserRight from "../components/user/navigation/SidebarUserRight";
import MusicPlayer from "../components/user/MusicPlayer";
import MusicInfoComponent from "../components/user/pages/MusicInfoComponent";
import MusicLibraryPage from "../components/music/MusicLibraryPage";
import {MusicPlayerProvider} from "../contexts/MusicPlayerContext";
import {Route, Routes} from "react-router-dom";

const leftWidth = 300;
const rightWidth = 270;

export interface ContentProps {
    theme: Theme;
}

const UserPanelPage: React.FC = () => {
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLeftOpen = () => {
        setOpenLeft(true);
    };

    const handleLeftClose = () => {
        setOpenLeft(false);
    };

    const handleRightOpen = () => {
        setOpenRight(true);
    }

    const handleRightClose = () => {
        setOpenRight(false);
    }

    return (
        <MusicPlayerProvider>
            <MusicPlayer />

            <Box sx={{ display: 'flex' }}>
                <SidebarUserLeft width={leftWidth} open={openLeft} onClose={handleLeftClose} isMobile={isMobile} />
                <Box sx={{ flexGrow: 1, width: `calc(100% - ${leftWidth}px)`, height: '100vh',
                    overflow: 'hidden' }}>
                    <TopBarUser leftWidth={leftWidth} rightWidth={rightWidth} openRight={openRight} isMobile={isMobile} />
                    {/*<Routes>*/}
                    {/*    <Route path="/music/info" element={<MusicInfoComponent />} />*/}
                    {/*</Routes>*/}
                    <MusicLibraryPage />
                </Box>
                {/*<TopBarUser leftWidth={leftWidth} rightWidth={rightWidth} openRight={openRight} isMobile={isMobile} />*/}
                { openRight && (
                    <SidebarUserRight width={rightWidth} open={openRight} />
                )}
            </Box>

            {/*<MusicInfoComponent />*/}
        </MusicPlayerProvider>
    )
}

export default UserPanelPage;