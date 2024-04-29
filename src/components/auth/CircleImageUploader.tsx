import React, {useRef, useState} from 'react';
import { IconButton, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';

interface Props {
    onChange: (file: File) => void;
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

const CircleImageUploader: React.FC<Props> = ({ onChange }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            onChange(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box>
            <CircleButton onClick={handleButtonClick}>
                {previewImage ? (
                    <ImagePreview src={previewImage} alt="Author" />
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
        </Box>
    );
};

export default CircleImageUploader;
