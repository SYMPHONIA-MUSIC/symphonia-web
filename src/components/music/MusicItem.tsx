import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Tooltip, Box, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTheme } from "@mui/material/styles";
import {PauseCircle} from "@mui/icons-material";
import {formatTime} from "../user/MusicPlayer";
import {CurrentMusicInfo, useMusic} from "../../contexts/MusicPlayerContext";

interface MusicItemProps {
    music: MusicShortUserInfo;
    position: number;
    onPlay: (id: string) => void;
    onLike: (id: string) => void;
    onOpenInfo: (id: string) => void;
}

export interface MusicShortUserInfo {
    id: string;
    title: string;
    artistId: string;
    artistName: string;
    photo: string;
    countOfListen: number;
    durationInSeconds: number;
    totalCriticRating: number;
}

const MusicItem: React.FC<MusicItemProps> = ({
                                                 music,
                                                 position,
                                                 onPlay,
                                                 onLike,
                                                 onOpenInfo
                                             }) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const { musicPlayerContext, playNewMusic, stopPlaying, startPlaying, nextMusic, prevMusic  } = useMusic()


    const handlePlayNewMusic = () => {
        playNewMusic({
            musicId: music.id,
            title: music.title,
            photo: music.photo,
            durationInSeconds: music.durationInSeconds,
            artistName: music.artistName,
            artistId: music.artistId
        }, [], []);
    };


    const handleRowClick = () => {
        console.log(`Row clicked for track: ${music.title}`);
    };

    return (
        <TableRow
            onClick={handleRowClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                '&:hover': {
                    backgroundColor: 'rgba(128, 128, 128, 0.5)',
                },
            }}
        >
            <TableCell component="th" scope="row" style={{ width: '5%', position: 'relative', alignItems: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                    {isHovered ? (
                        music.id === musicPlayerContext.currentMusic?.musicId ? (
                            musicPlayerContext.isPlaying ? (
                                <IconButton onClick={stopPlaying} size="small" sx={{ position: 'absolute', left: 0, transform: 'translateY(-50%)' }}>
                                    <PauseCircle fontSize="small" />
                                </IconButton>
                                ) : (
                                <IconButton onClick={startPlaying} size="small" sx={{ position: 'absolute', left: 0, transform: 'translateY(-50%)' }}>
                                    <PlayCircleOutlineIcon fontSize="small" />
                                </IconButton>
                            )
                        ) : (
                            <IconButton onClick={handlePlayNewMusic}
                                        size="small" sx={{ position: 'absolute', left: 0, transform: 'translateY(-50%)' }}>
                                <PlayCircleOutlineIcon fontSize="small" />
                            </IconButton>
                        )
                    ) : (
                        music.id === musicPlayerContext.currentMusic?.musicId ? (
                            <IconButton size="small" sx={{ position: 'absolute', left: 0, transform: 'translateY(-50%)' }}>
                                <PlayCircleOutlineIcon fontSize="small" />
                            </IconButton>
                            ) : (
                            <Typography variant="body2" sx={{ marginLeft: isHovered ? 32 : 0 }}>
                                {position}
                            </Typography>
                        )
                    )}
                </Box>
            </TableCell>
            <TableCell align="left" style={{ width: '25%' }}>
                <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src={music.photo}
                        alt={music.title}
                        sx={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 3,
                        }}
                    />
                    <Box sx={{ flexGrow: 1, ml: 1 }}>
                        <Typography variant="subtitle1">{music.title}</Typography>
                        <Typography variant="caption">{music.artistName}</Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="left" style={{ width: '20%' }}>{music.totalCriticRating}</TableCell>
            <TableCell align="left" style={{ width: '20%' }}>{music.countOfListen.toLocaleString()}</TableCell>
            <TableCell align="left" style={{ width: '10%' }}>{formatTime(music.durationInSeconds)}</TableCell>
            <TableCell align="left" style={{ width: '20%' }}>
                <Tooltip title="Like" sx={{ color: theme.palette.text.primary }}>
                    <IconButton onClick={() => onLike(music.id)}>
                        <FavoriteBorderIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="More Info" sx={{ color: theme.palette.text.primary }}>
                    <IconButton onClick={() => onOpenInfo(music.id)}>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default MusicItem;
