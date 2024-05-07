import React, {useEffect, useState} from "react";
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Stack } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import GradientButton from "../button/GradientButton";
import CustomBackButton from "../global/CustomBackButton";
import musicService, {CreateNewMusicDTO} from "../../logic/domain/MusicService";
import {useNavigate} from "react-router-dom";

const ReleaseComponent: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedMusic, setSelectedMusic] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadLanguages() {
            try {
                const langs = await musicService.getLanguages();
                setLanguages(langs);
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        }

        async function loadGenres() {
            try {
                const gens = await musicService.getMusicGenres();
                setGenres(gens);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        }

        loadLanguages();
        loadGenres();
    }, []);

    const handleSubmit = async () => {
        if (selectedMusic && selectedFile) {
            const formData: CreateNewMusicDTO = {
                title: title,
                albumId: null,
                genre: genre,
                language: language
            };
            const response = await musicService.createMusic(formData, selectedMusic, selectedFile);
            if (response.isSuccess) {
                console.log(response.message, response);
            } else {
                console.log(response.message, response);
            }
            navigate('/artist/panel/music/');
        } else {
            alert('Please select both music and photo files.');
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {'audio/*': []},
        onDrop: (acceptedFiles) => {
            setSelectedMusic(acceptedFiles[0]);
        }
    });

    const handleDeletePhoto = () => {
        setSelectedFile(null);
    };

    const handleDeleteMusic = () => {
        setSelectedMusic(null);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', p: 2 }}>
                <CustomBackButton onClick={() => {}} />
                <Typography variant="h6" gutterBottom>
                    Release New Music
                </Typography>
            </Box>
            <Box component="form" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', m: 1 }}>
                <Stack spacing={2} sx={{ width: '70%' }}>
                    <Button variant="contained" component="label">
                        Upload Photo
                        <input type="file" hidden accept="image/*" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
                    </Button>
                    <TextField id="title" label="Title" variant="outlined" fullWidth value={title} onChange={handleTitleChange} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {selectedFile && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img src={URL.createObjectURL(selectedFile)} alt="Music Cover" style={{ width: '50px', height: '50px' }} />
                                <Button onClick={handleDeletePhoto} sx={{ ml: 1 }}>Delete Photo</Button>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <FormControl variant="outlined" sx={{ width: '45%', color: 'white' }}>
                            <InputLabel id="language-label" sx={{ color: 'white' }}>Language</InputLabel>
                            <Select
                                labelId="language-label"
                                id="language-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                label="Language"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: '100px',
                                            overflow: 'auto',
                                            backgroundColor: 'black',
                                            color: 'white',
                                        },
                                    },
                                }}
                            >
                                {languages.map(lang => (
                                    <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ width: '45%' }}>
                            <InputLabel id="genre-label" sx={{ color: 'white' }}>Genre</InputLabel>
                            <Select
                                labelId="genre-label"
                                id="genre-select"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                label="Genre"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: '100px',
                                            overflow: 'auto',
                                            backgroundColor: 'black',
                                            color: 'white',
                                        },
                                    },
                                }}
                            >
                                {genres.map(genre => (
                                    <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box {...getRootProps()} sx={{ border: '1px dashed', padding: '20px', textAlign: 'center', mt: 2 }}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the music file here...</p> :
                                <p>Drag 'n' drop some music here, or click to select music</p>
                        }
                        {selectedMusic && (
                            <>
                                <Typography sx={{ mt: 2 }}>Music File: {selectedMusic.name}</Typography>
                                <Button onClick={handleDeleteMusic} variant="outlined" color="secondary" sx={{ mt: 1 }}>Delete Music</Button>
                            </>
                        )}
                    </Box>
                    <GradientButton onClick={handleSubmit} variant="contained" sx={{ alignSelf: 'center' }}>
                        Zveřejnit
                    </GradientButton>
                </Stack>
            </Box>
        </Box>
    );
};

export default ReleaseComponent;
