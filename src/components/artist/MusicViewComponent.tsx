import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Rating
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Comment} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import GradientButton from "../button/GradientButton";
import MusicService, {MusicInfo} from "../../logic/domain/MusicService";
import EditMusicPopup, {EditOption} from "./EditMusicPopup";
import {useMusic} from "../../contexts/MusicPlayerContext";


const MusicViewComponent: React.FC = () => {

    const navigate = useNavigate();
    const [musics, setMusics] = useState<MusicInfo[]>([]);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [editingMusicId, setEditingMusicId] = useState<string | null>(null);

    const fetchSongs = async () => {
        try {
            const musicInfo = await MusicService.getAllMusic();
            setMusics(musicInfo.musicList);
        } catch (error) {
            console.error('Failed to fetch songs:', error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleEditClick = (musicId: string): void => {
        setEditingMusicId(musicId);
        setPopupOpen(true);
    };

    const handleClosePopup = (): void => {
        setPopupOpen(false);
        setEditingMusicId(null);
    };

    const handleUpdateSubmit = async (musicId: string, type: EditOption, data: { title?: string; newPhoto?: File }): Promise<void> => {
        if (!musicId) return;

        try {
            if (type === EditOption.Title && data.title) {
                await MusicService.updateMusicTitle({ musicId, title: data.title });
                console.log('Title updated successfully');
            } else if (type === EditOption.Photo && data.newPhoto) {
                const songInfoFind = musics.find(music => music.id === musicId)

                if (songInfoFind !== undefined) {
                    const oldHash = extractHashFromPhotoUrl(songInfoFind.photo);
                    const formData = new FormData();
                    formData.append('file', data.newPhoto);
                    formData.append('oldHash', oldHash);
                    formData.append('musicId', musicId);
                    await MusicService.updateMusicPhoto(musicId, oldHash, data.newPhoto);
                    console.log('Photo updated successfully');
                } else {
                    console.log("Failed to update song details, song not found:");
                }
            }
            setPopupOpen(false)
            fetchSongs()
        } catch (error) {
            console.error("Failed to update song details:", error);
        }
    };

    const extractHashFromPhotoUrl = (url: string): string => {
        const hash = url.substring(url.lastIndexOf('/') + 1);
        return hash;
    };

    const handleDeleteClick = async (musicId: string): Promise<void> => {
        try {
            await MusicService.deleteMusic(musicId);
            console.log(`Music with ID ${musicId} deleted successfully.`);
            fetchSongs()
        } catch (error) {
            console.error("Failed to delete music:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, pt: 8 }}>
            <Typography paragraph>
                Moje hudba
            </Typography>
            <GradientButton variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => {navigate('/artist/panel/music/release')}}>
                Zveřejnění nové skladby
            </GradientButton>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="songs table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Foto</TableCell>
                            <TableCell>Název</TableCell>
                            <TableCell>Zobrazení</TableCell>
                            <TableCell>Hodnocení</TableCell>
                            <TableCell>Komentáře</TableCell>
                            <TableCell>Akce</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {musics.map((song) => (
                            <TableRow key={song.id}>
                                <TableCell>
                                    <img src={song.photo} alt={song.title} style={{ width: '50px', height: '50px' }} />
                                </TableCell>
                                <TableCell>{song.title}</TableCell>
                                <TableCell>{song.countOfListen}</TableCell>
                                <TableCell>
                                    <Rating name="read-only" value={0} max={5} readOnly />
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="comments">
                                        <Comment />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" onClick={() => handleEditClick(song.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteClick(song.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditMusicPopup open={popupOpen} onClose={handleClosePopup} musicId={editingMusicId} handleSubmit={handleUpdateSubmit} />
        </Box>
    );
};

export default MusicViewComponent;
