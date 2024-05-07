import React from 'react';
import CustomFormControlLabel from "../CustomFormControlLabel";
import CustomCheckbox from "../CustomCheckbox";
import GradientButton from "../button/GradientButton";

interface StepZeroProps {
    marketingChecked: boolean;
    handleMarketingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    shareDataChecked: boolean;
    handleShareDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
}

const StepZero: React.FC<StepZeroProps> = ({
                                               marketingChecked,
                                               handleMarketingChange,
                                               shareDataChecked,
                                               handleShareDataChange,
                                               onNext
                                           }) => {
    return (
        <>
            <CustomFormControlLabel
                control={<CustomCheckbox checked={marketingChecked} onChange={handleMarketingChange} />}
                label="Nechci dostávat marketingové zprávy od společnosti Symphonia"
                labelPlacement="start"
            />
            <CustomFormControlLabel
                control={<CustomCheckbox checked={shareDataChecked} onChange={handleShareDataChange} />}
                label="Sdílet mé registrační údaje s poskytovateli obsahu společnosti Symphonia pro marketingové účely"
                labelPlacement="start"
            />
            <GradientButton fullWidth onClick={onNext}>
                Další krok
            </GradientButton>
        </>
    );
};

export default StepZero;
