import React from 'react';
import { Box, Checkbox, ListItemSecondaryAction, ListItemText, Typography, Button } from '@mui/material';
import StyledList from "../StyledList";
import StyledListItem from "../StyledListItem";
import StyledListItemAvatar from "../StyledListItemAvatar";
import GradientButton from "../button/GradientButton";

interface StepThreeProps {
    artists: { id: string; name: string; picture: string }[];
    selectedArtists: string[];
    handleSelectArtist: (artistId: string) => void;
    onNext: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
                                                 artists,
                                                 selectedArtists,
                                                 handleSelectArtist,
                                                 onNext
                                             }) => {
    const toggleArtistSelection = (artistId: string) => {
        handleSelectArtist(artistId);
    };

    return (
        <>
            <StyledList>
                {artists.map((artist) => (
                    <StyledListItem key={artist.id} onClick={() => toggleArtistSelection(artist.id)}>
                        <StyledListItemAvatar>
                            <img src={artist.picture} alt={artist.name} />
                        </StyledListItemAvatar>
                        <ListItemText primary={artist.name} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                checked={selectedArtists.includes(artist.id)}
                                onClick={(e) => e.stopPropagation()} // Prevents the event from bubbling up when checkbox itself is clicked
                            />
                        </ListItemSecondaryAction>
                    </StyledListItem>
                ))}
            </StyledList>
            <GradientButton variant="contained" sx={{ mt: 2 }} onClick={onNext}>
                Pokračovat
            </GradientButton>
        </>
    );
};

export default StepThree;