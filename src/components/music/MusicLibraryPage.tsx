import React, {useEffect, useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import MusicList from './MusicList';
import ContentWrapper from "../artist/ContentWrapper";
import {MusicShortUserInfo} from "./MusicItem";

const MusicLibraryPage: React.FC = () => {
    const [dataToShow, setDataToShow] = useState<MusicShortUserInfo[]>([]);

    async function fetchAllUserMusic(): Promise<MusicShortUserInfo[]> {
        const response = await fetch('http://localhost:8080/api/music/user/all-music');
        if (!response.ok) {
            throw new Error('Failed to fetch music data');
        }
        const data = await response.json();
        return data.musicList;
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const musicData = await fetchAllUserMusic();
                setDataToShow(musicData);
            } catch (error) {
                console.error('Error fetching music data:', error);
            }
        };

        getData();
    }, []);

    return (
        <ContentWrapper>
            <Box sx={{ p: 3 }}>
                <MusicList dataToShow={dataToShow} />
            </Box>
        </ContentWrapper>
    );
};

export default MusicLibraryPage;
