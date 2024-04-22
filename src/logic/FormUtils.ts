export function validatePassword(password: string): boolean {
    return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

export function checkPasswordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
}