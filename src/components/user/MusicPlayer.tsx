import React, {useState, useEffect, useRef} from 'react';
import { AppBar, Toolbar, IconButton, Typography, Slider, Box, Stack, LinearProgress } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {Favorite} from "@mui/icons-material";
import Hls from "hls.js";
import {useMusic} from "../../contexts/MusicPlayerContext";
import MusicStreamingService from "../../logic/domain/MusicStreamingService";

export const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const MusicPlayer: React.FC = () => {
    const { musicPlayerContext, playNewMusic, stopPlaying, startPlaying, nextMusic, prevMusic  } = useMusic()

    const [currentTime, setCurrentTime] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [volume, setVolume] = useState<number>(70);

    const handleVolumeChange = (event: Event, newValue: number | number[]): void => {
        const newVolume = typeof newValue === 'number' ? newValue / 100 : 0.7;
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume * 100);
    };


    useEffect(() => {
        async function fetchAndPlay() {
            console.log("Fetching and playing...");
            const audio = audioRef.current;
            if (!audio) return;

            if (musicPlayerContext.currentMusic) {
                const url = await MusicStreamingService.getSafeUrlToMusic(musicPlayerContext.currentMusic.musicId);
                if (url === null) {
                    console.log("URL is null");
                    return;
                }
                console.log("URL:", url);

                let queryParams = new URLSearchParams(url.split('?')[1]);
                let hls: Hls;

                if (audio && Hls.isSupported()) {
                    console.log("Creating new Hls instance...  with url" + url);
                    const hls = new Hls({
                        maxBufferSize: 0,
                        maxBufferLength: 30,
                        liveSyncDurationCount: 3,
                        xhrSetup: (xhr, url) => {
                            const originalParams = queryParams.toString();
                            if (!url.includes('?')) {
                                url += `?${originalParams}`;
                            } else {
                                url += `&${originalParams}`;
                            }
                            xhr.open('GET', url, true);
                        }
                    });
                    hls.loadSource(url);
                    hls.attachMedia(audio);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log("Manifest parsed");
                        if (musicPlayerContext.isPlaying) {
                            audio.play().catch(err => console.error('Playback failed:', err));
                            console.log("Audio started playing " + musicPlayerContext.isPlaying + " " + url);
                        }
                    });
                }

                return () => {
                    if (hls) {
                        hls.destroy();
                        console.log("Hls instance destroyed");
                    }
                    stopPlaying();
                    audio.pause();
                    audio.src = '';
                    console.log("Audio stopped and source cleared");
                };

            } else {
                stopPlaying();
                audio.pause();
                audio.src = '';
                console.log("No current music, stopped and source cleared");
            }
        }

        fetchAndPlay();
    }, [musicPlayerContext.currentMusic]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (musicPlayerContext.isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [musicPlayerContext.isPlaying]);


    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            if (audio) {
                setCurrentTime(audio.currentTime);
            }
        };

        audio?.addEventListener('timeupdate', updateProgress);
        return () => audio?.removeEventListener('timeupdate', updateProgress);
    }, []);

    const togglePlayPause = () => {
        if (musicPlayerContext.isPlaying) {
            stopPlaying();
        } else {
            startPlaying();
        }
    }

    const handleSliderChange = (event: Event, newValue: number | number[]): void => {
        if (typeof newValue === 'number' && audioRef.current) {
            audioRef.current.currentTime = newValue;
            setCurrentTime(newValue);
            if (!musicPlayerContext.isPlaying) {
                audioRef.current.play();
            }
        }
    };

    return (
        <>
            {musicPlayerContext.currentMusic && (
                <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0, zIndex: 1400, backgroundColor: 'black'}}>
                    <audio ref={audioRef} style={{display: 'none'}}/>
                    <LinearProgress variant="determinate" value={(currentTime / musicPlayerContext.currentMusic.durationInSeconds) * 100}/>
                    <Slider
                        value={currentTime}
                        min={0}
                        step={1}
                        max={musicPlayerContext.currentMusic.durationInSeconds}
                        onChange={handleSliderChange}
                        aria-label="time-indicator"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            color: 'transparent',
                            '& .MuiSlider-thumb': {
                                height: '2px',
                                width: '2px',
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                            '& .MuiSlider-track': {
                                height: '2px',
                                backgroundColor: 'transparent',
                            },
                        }}
                    />
                    <Toolbar sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <img src={musicPlayerContext.currentMusic.photo} alt="Album photo" style={{width: 40, height: 40, marginRight: 8}}/>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography variant="subtitle1" noWrap>
                                    {musicPlayerContext.currentMusic.title}
                                </Typography>
                                <Typography variant="caption" noWrap>
                                    {musicPlayerContext.currentMusic.artistName}
                                </Typography>
                            </Box>
                            <IconButton aria-label="add to favorites" color="inherit">
                                <Favorite/>
                            </IconButton>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton aria-label="previous song" color="inherit">
                                <SkipPreviousIcon/>
                            </IconButton>
                            <IconButton onClick={togglePlayPause} aria-label="play/pause" color="inherit">
                                {musicPlayerContext.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                            <IconButton aria-label="next song" color="inherit">
                                <SkipNextIcon/>
                            </IconButton>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" sx={{marginRight: 1}}>
                                {formatTime(currentTime)} / {formatTime(musicPlayerContext.currentMusic.durationInSeconds)}
                            </Typography>

                            <VolumeUpIcon/>
                            <Slider
                                value={volume}
                                onChange={handleVolumeChange}
                                aria-label="Volume"
                                sx={{ width: 100 }}
                            />
                        </Stack>
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
}

export default MusicPlayer;