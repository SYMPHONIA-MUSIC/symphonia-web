export interface PasswordValidationResult {
    strength: number;
    label: string;
    conditions: {
        length: boolean;
        number: boolean;
        specialChar: boolean;
    };
}


interface Labels {
    [key: number]: string;
}

export const evaluatePassword = (password: string): PasswordValidationResult => {
    const lengthRequirement = password.length >= 8;
    const numberRequirement = /\d/.test(password);
    const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let strength = 0;

    if (lengthRequirement) strength += 33;
    if (numberRequirement) strength += 33;
    if (specialCharRequirement) strength += 34;

    const labels: Labels = {
        0: "Velmi slabé heslo",
        33: "Slabé heslo",
        66: "Střední heslo",
        100: "Silné heslo"
    };

    return {
        strength,
        label: labels[strength] || "Velmi slabé heslo",
        conditions: {
            length: lengthRequirement,
            number: numberRequirement,
            specialChar: specialCharRequirement
        }
    };
};