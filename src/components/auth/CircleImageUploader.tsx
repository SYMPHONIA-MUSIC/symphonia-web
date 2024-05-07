import React, {useEffect, useRef, useState} from 'react';
import {IconButton, Box, Typography} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {styled, useTheme} from '@mui/material/styles';
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    image: File | null;
    onChange: (file: File | null) => void;
}

const CircleButton = styled(IconButton)({
    backgroundColor: '#FFC0CB',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#FFB6C1',
    },
    width: 100,
    height: 100,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 1,
});

const ImagePreview = styled('img')({
    width: '100%',
    height: '100%',
    borderRadius: '50%'
});

const CircleImageUploader: React.FC<Props> = ({ image, onChange }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme()
    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onload = (e) => setPreviewImage(e.target?.result as string);
            reader.readAsDataURL(image);
        }
    }, [image]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            onChange(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = () => {
        onChange(null);
        setPreviewImage(null)
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
            <CircleButton onClick={handleButtonClick}>
                {previewImage ? (
                    <ImagePreview src={previewImage} alt="Profile image" />
                ) : (
                    <AddPhotoAlternateIcon fontSize="large" />
                )}
            </CircleButton>
            <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                hidden
                onChange={handleImageChange}
            />
            {previewImage && (
                <Box display="flex" alignItems="center">
                    <Typography onClick={handleRemoveImage} style={{ cursor: 'pointer', marginLeft: 8, color: theme.palette.error.main }}>
                        Click to remove the image
                    </Typography>
                    <IconButton onClick={handleRemoveImage} style={{ cursor: 'pointer', color: theme.palette.error.main }}>
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default CircleImageUploader;