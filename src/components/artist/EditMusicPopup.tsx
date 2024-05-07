import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import {useTheme} from "@mui/material/styles";

export enum EditOption {
    Title = 'title',
    Photo = 'photo'
}

export interface EditMusicPopupProps {
    open: boolean;
    onClose: () => void;
    musicId: string | null;
    handleSubmit: (musicId: string, type: EditOption, data: { title?: string; newPhoto?: File }) => void;
}

const EditMusicPopup: React.FC<EditMusicPopupProps> = ({ open, onClose, musicId, handleSubmit }) => {
    const theme = useTheme();
    const [title, setTitle] = useState<string>('');
    const [newPhoto, setNewPhoto] = useState<File | undefined>(undefined);
    const [choice, setChoice] = useState<EditOption>(EditOption.Title);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChoice(event.target.value as EditOption);
        setTitle('');
        setNewPhoto(undefined);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPhoto(event.target.files && event.target.files[0] ? event.target.files[0] : undefined);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFormSubmit = () => {
        if (musicId) {
            const data = choice === EditOption.Title ? { title } : { newPhoto };
            handleSubmit(musicId, choice, data);

            setTitle('');
            setNewPhoto(undefined);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}
                PaperProps={{
                    style: {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
        >
            <DialogTitle>Update Song Details</DialogTitle>
            <DialogContent>
                <RadioGroup row value={choice} onChange={handleRadioChange}>
                    <FormControlLabel value="title" control={<Radio />} label="Change Title" />
                    <FormControlLabel value="photo" control={<Radio />} label="Change Photo" />
                </RadioGroup>

                {choice === 'title' ? (
                    <TextField
                        margin="dense"
                        id="name"
                        label="New Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={handleTitleChange}
                    />
                ) : (
                    <TextField
                        type="file"
                        onChange={handleFileChange}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleFormSubmit} disabled={choice === 'title' ? !title : !newPhoto}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditMusicPopup;
