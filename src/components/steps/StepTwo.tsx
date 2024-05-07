import React from 'react';
import { Typography } from '@mui/material';
import CircleImageUploader from "../auth/CircleImageUploader";
import GradientButton from "../button/GradientButton";

interface StepTwoProps {
    image: File | null;
    setImage: (file: File | null) => void;
    onNext: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ image, setImage, onNext }) => {
    return (
        <>
            <CircleImageUploader
                image={image}
                onChange={setImage}
            />
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}>
                V tuto chvíli si můžeš vybrat svůj profilový obrázek, pokud to v tuto chvíli nechceš udělat, nevadí, můžeš ho změnit v nastavení
            </Typography>
            <GradientButton variant="contained" onClick={onNext}>
                Další krok
            </GradientButton>
        </>
    );
};

export default StepTwo;
