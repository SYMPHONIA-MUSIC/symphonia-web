import React from 'react';
import StyledTextField from "../global/StyledTextField";
import GradientButton from "../button/GradientButton";

interface StepOneProps {
    username: string;
    setUsername: (username: string) => void;
    checkUsernameAvailability: () => Promise<void>;
}

const StepOne: React.FC<StepOneProps> = ({ username, setUsername, checkUsernameAvailability }) => {
    return (
        <>
            <StyledTextField
                label="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                margin="normal"
                fullWidth
            />
            <GradientButton variant="contained" onClick={checkUsernameAvailability}>
                Další krok
            </GradientButton>
        </>
    );
};

export default StepOne;
