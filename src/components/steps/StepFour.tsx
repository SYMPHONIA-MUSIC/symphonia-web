import React from 'react';
import {Typography, Checkbox, ListItemSecondaryAction, Button, ListItemText} from '@mui/material';
import StyledList from "../StyledList";
import StyledListItemGenre from "../StyledListItemGenre";
import GradientButton from "../button/GradientButton";

interface StepFourProps {
    genres: { name: string; backgroundImage: string }[];
    selectedGenres: string[];
    handleSelectGenre: (genreName: string) => void;
    onNext: () => void;
    isButtonDisabled: boolean;
}

const StepFour: React.FC<StepFourProps> = ({
                                               genres,
                                               selectedGenres,
                                               handleSelectGenre,
                                               onNext,
                                               isButtonDisabled
                                           }) => {
    return (
        <>
            <StyledList>
                {genres.map((genre, index) => (
                    <StyledListItemGenre key={index} backgroundImage={genre.backgroundImage} onClick={() => handleSelectGenre(genre.name)}>
                        <ListItemText primary={genre.name} sx={{
                            color: 'text.primary',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        }} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                checked={selectedGenres.includes(genre.name)}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleSelectGenre(genre.name);
                                }}
                            />
                        </ListItemSecondaryAction>
                    </StyledListItemGenre>
                ))}
            </StyledList>
            <GradientButton variant="contained" sx={{ mt: 2 }} onClick={onNext} disabled={isButtonDisabled}>
                Dokončit registraci
            </GradientButton>
        </>
    );
};

export default StepFour;
